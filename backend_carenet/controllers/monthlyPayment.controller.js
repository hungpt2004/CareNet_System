const MonthlyPayment = require("../models/monthlyPayment.model");
const CertificatePurchase = require("../models/certificatePurchase.model");
const Certificate = require("../models/certificate.model");
const Organization = require("../models/organization.model");
const Event = require("../models/event.model");
const asyncHandler = require("../middleware/asyncHandler");
const socketIO = require("../socket");

// Tính doanh thu theo tháng
exports.calculateMonthlyRevenue = async (req, res) => {
  const currentUser = req.user.user;

  try {
    let { month, year } = req.query;

    // Chuyển sang số nguyên
    month = parseInt(month);
    year = parseInt(year);

    // Kiểm tra đầu vào hợp lệ
    if (
      !month ||
      !year ||
      isNaN(month) ||
      isNaN(year) ||
      month < 1 ||
      month > 12
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "Invalid month or year. Month must be from 1 to 12 and year must be a valid number.",
      });
    }

    // Tính ngày đầu và cuối của tháng
    const startDate = new Date(year, month - 1, 1); // Tháng trong JS bắt đầu từ 0
    const endDate = new Date(year, month, 0); // Ngày cuối cùng của tháng
    endDate.setHours(23, 59, 59, 999); // Bao trùm toàn bộ ngày cuối

    const currentOrganization = await Organization.findById(
      currentUser.organizationId
    );

    const currentEvents = await Event.find({
      organizationId: currentOrganization._id,
    });

    const currentEventIds = currentEvents.map((event) => event._id);

    // Tìm tất cả chứng chỉ do tổ chức tạo
    const certificates = await Certificate.find({
      eventId: { $in: currentEventIds },
    });

    const certificateIds = certificates.map((cert) => cert._id);

    // Tìm tất cả giao dịch đã thanh toán trong tháng
    const certificatePurchases = await CertificatePurchase.find({
      certificateId: { $in: certificateIds },
      paymentStatus: "paid",
      paidAt: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    // Tính tổng doanh thu
    const totalRevenue = certificatePurchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    console.log(`Doanh thu tổng ${month}/${year}: ${totalRevenue}`);

    // Cập nhật hoặc tạo bản ghi doanh thu theo tháng
    const monthlyPayment = await MonthlyPayment.findOneAndUpdate(
      {
        organization: currentUser.organizationId,
        month,
        year,
      },
      {
        amount: totalRevenue,
        status: "NOT PAID",
        paymentDate: new Date(),
      },
      { upsert: true, new: true }
    );

    // Emit socket event để cập nhật realtime
    const io = socketIO.getIO();
    io.to(currentUser.organizationId.toString()).emit("revenueUpdated", {
      type: "revenue_updated",
      data: {
        monthlyPayment,
        totalRevenue,
        certificateCount: certificatePurchases.length,
        month,
        year,
      },
      timestamp: new Date(),
    });

    // Trả về kết quả
    return res.status(200).json({
      status: "success",
      data: {
        monthlyPayment,
        totalRevenue,
        certificateCount: certificatePurchases.length,
        certificateDetails: certificatePurchases.map((purchase) => ({
          certificateId: purchase.certificateId,
          amount: purchase.amount,
          paidAt: purchase.paidAt,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Tính doanh thu cả 12 tháng trong năm
exports.calculateAllMonthsRevenue = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  console.log("---- MONTHLY PAYMENT CONTROLLER -----");

  try {
    let { year } = req.query; // Mặc định là năm

    // Chuyển sang số nguyên và validate
    year = parseInt(year);
    if (
      !year ||
      isNaN(year) ||
      year < 2020 ||
      year > new Date().getFullYear()
    ) {
      return res.status(400).json({
        status: "fail",
        message:
          "Invalid year. Year must be a valid number between 2020 and current year.",
      });
    }

    console.log(`Năm đang tính doanh thu: ${year}`);

    const currentOrganization = await Organization.findById(
      currentUser.organizationId
    );
    const currentEvents = await Event.find({
      organizationId: currentOrganization._id,
    });
    const currentEventIds = currentEvents.map((event) => event._id);

    // Tìm tất cả chứng chỉ do tổ chức tạo
    const certificates = await Certificate.find({
      eventId: { $in: currentEventIds },
    });

    const certificateIds = certificates.map((cert) => cert._id);

    // Tính doanh thu cho từng tháng
    const monthlyRevenuePromises = Array.from(
      { length: 12 },
      async (_, index) => {
        const month = index + 1;

        // Tính ngày đầu và cuối của tháng
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        endDate.setHours(23, 59, 59, 999);

        // Tìm tất cả giao dịch đã thanh toán trong tháng
        const certificatePurchases = await CertificatePurchase.find({
          certificateId: { $in: certificateIds },
          paymentStatus: "paid",
          paidAt: {
            $gte: startDate,
            $lte: endDate,
          },
        }).populate("certificateId");

        // Tính tổng doanh thu tháng
        const monthlyRevenue = certificatePurchases.reduce(
          (sum, purchase) => sum + purchase.amount,
          0
        );

        console.log(`Doanh thu tháng ${month}/${year}: ${monthlyRevenue}`);

        return {
          month,
          monthName: month,
          revenue: monthlyRevenue,
          certificateCount: certificatePurchases.length,
          certificateDetails: certificatePurchases,
          startDate,
          endDate,
        };
      }
    );

    // Chờ tất cả promise hoàn thành
    const monthlyRevenueResults = await Promise.all(monthlyRevenuePromises);

    // ✅ Cập nhật hoặc tạo bản ghi cho TẤT CẢ các tháng (kể cả revenue = 0)
    const updatePromises = monthlyRevenueResults.map(async (monthData) => {
      // ✅ Bỏ điều kiện revenue > 0, xử lý tất cả các tháng
      return await MonthlyPayment.findOneAndUpdate(
        {
          organization: currentUser.organizationId,
          month: monthData.month,
          year,
        },
        {
          amount: monthData.revenue, // ✅ Có thể là 0
          status: monthData.revenue > 0 ? "NOT PAID" : "NO REVENUE", // ✅ Status khác nhau cho revenue = 0
        },
        { upsert: true, new: true }
      );
    });

    const updatedPayments = await Promise.all(updatePromises);
    // ✅ Không filter null nữa vì tất cả đều được xử lý
    const validPayments = updatedPayments;

    // Tính tổng doanh thu cả năm
    const totalYearlyRevenue = monthlyRevenueResults.reduce(
      (sum, month) => sum + month.revenue,
      0
    );
    const totalCertificates = monthlyRevenueResults.reduce(
      (sum, month) => sum + month.certificateCount,
      0
    );

    // Tìm tháng có doanh thu cao nhất
    const highestRevenueMonth = monthlyRevenueResults.reduce((max, month) =>
      month.revenue > max.revenue ? month : max
    );

    // Tháng có nhiều certificate bán nhất
    const mostCertificatesMonth = monthlyRevenueResults.reduce((max, month) =>
      month.certificateCount > max.certificateCount ? month : max
    );


    return res.status(200).json({
      status: "success",
      message: `Tính toán doanh thu cả năm ${year} thành công`,
      data: {
        year,
        organizationData: currentOrganization,
        totalYearlyRevenue,
        totalCertificates,
        monthlyBreakdown: monthlyRevenueResults,
        updatedPayments: validPayments,
        sub_data: {
          monthsWithRevenue: monthlyRevenueResults.filter((m) => m.revenue > 0)
            .length,
          monthsWithoutRevenue: monthlyRevenueResults.filter(
            (m) => m.revenue === 0
          ).length,
          averageMonthlyRevenue: totalYearlyRevenue / 12,
          highestRevenueMonth: {
            month: highestRevenueMonth.month,
            monthName: highestRevenueMonth.monthName,
            revenue: highestRevenueMonth.revenue,
            certificateCount: highestRevenueMonth.certificateCount,
          },
          mostCertificatesMonth: {
            month: mostCertificatesMonth.month,
            monthName: mostCertificatesMonth.monthName,
            revenue: mostCertificatesMonth.revenue,
            certificateCount: mostCertificatesMonth.certificateCount,
          },
          averagePricePerCertificate:
            totalCertificates > 0 ? totalYearlyRevenue / totalCertificates : 0,
          // ✅ Thêm thống kê chi tiết
          revenueDistribution: {
            monthsWithRevenue: monthlyRevenueResults.filter(
              (m) => m.revenue > 0
            ),
            monthsWithoutRevenue: monthlyRevenueResults.filter(
              (m) => m.revenue === 0
            ),
            totalMonthsProcessed: 12,
          },
        },
      },
    });
  } catch (error) {
    console.error("Calculate all months revenue error:", error);
    return res.status(500).json({
      status: "fail",
      message: "Không thể tính toán doanh thu cả năm",
      error: error.message,
    });
  }
});

// Lấy doanh thu theo tháng hoặc năm
exports.getRevenue = async (req, res) => {
  const currentUser = req.user.user;

  try {
    const { month, year } = req.query;

    // Lấy tất cả chứng chỉ của các sự kiện do organization tạo
    const currentOrganization = await Organization.findById(
      currentUser.organizationId
    );
    const currentEvents = await Event.find({
      organizationId: currentOrganization._id,
    });
    const currentEventIds = currentEvents.map((event) => event._id);
    const certificates = await Certificate.find({
      eventId: { $in: currentEventIds },
    });
    const certificateIds = certificates.map((cert) => cert._id);

    // Nếu có cả tháng và năm, trả về dữ liệu của tháng đó
    if (month && year) {
      const monthlyPayment = await MonthlyPayment.findOne({
        organization: currentUser.organizationId,
        month: parseInt(month),
        year: parseInt(year),
      });

      // Tính số lượng chứng chỉ bán được trong tháng
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      endDate.setHours(23, 59, 59, 999);

      const certificateCount = await CertificatePurchase.countDocuments({
        certificateId: { $in: certificateIds },
        paymentStatus: "paid",
        paidAt: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      return res.status(200).json({
        status: "success",
        data: {
          monthlyPayment,
          certificateCount,
          month: parseInt(month),
          year: parseInt(year),
        },
      });
    }

    // Nếu chỉ có năm, trả về dữ liệu của cả năm
    if (year) {
      // Lấy dữ liệu doanh thu của tất cả các tháng trong năm
      const monthlyPayments = await MonthlyPayment.find({
        organization: currentUser.organizationId,
        year: parseInt(year),
      }).sort({ month: 1 });

      // Tạo mảng dữ liệu cho biểu đồ
      const chartData = Array.from({ length: 12 }, (_, i) => {
        const monthData = monthlyPayments.find(
          (payment) => payment.month === i + 1
        );
        return {
          month: i + 1,
          monthName: new Date(2000, i).toLocaleString("default", {
            month: "short",
          }),
          revenue: monthData ? monthData.amount : 0,
          status: monthData ? monthData.status : "PENDING",
        };
      });

      const eventCount = await Event.find({
        organizationId: currentUser.organizationId,
        adminStatus: "approved",
      });

      // Tính tổng doanh thu năm
      const totalYearlyRevenue = chartData.reduce(
        (sum, month) => sum + month.revenue,
        0
      );

      // Lấy chi tiết số lượng chứng chỉ bán được theo tháng
      const monthlyCertificateCounts = await Promise.all(
        chartData.map(async (monthData) => {
          const startDate = new Date(year, monthData.month - 1, 1);
          const endDate = new Date(year, monthData.month, 0);
          endDate.setHours(23, 59, 59, 999);

          const count = await CertificatePurchase.countDocuments({
            certificateId: { $in: certificateIds },
            paymentStatus: "paid",
            paidAt: {
              $gte: startDate,
              $lte: endDate,
            },
          });

          return {
            ...monthData,
            certificateCount: count,
          };
        })
      );

      return res.status(200).json({
        status: "success",
        data: {
          chartData: monthlyCertificateCounts,
          totalYearlyRevenue,
          monthlyPayments,
          totalEvent: eventCount.length,
        },
      });
    }

    return res.status(400).json({
      status: "fail",
      message: "Year is required",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
};

// Tính số tiền cần hoàn
exports.calculateRefundAmount = asyncHandler(async (req, res) => {
  const { organizationId, month, year } = req.body;

  try {
    let query = {
      organization: organizationId,
      status: "NOT PAID",
    };

    let periodType = "";
    let totalRefundAmount = 0;
    let paymentsData = [];

    // ✅ Nếu có cả month và year - tính theo tháng cụ thể
    if (month && year) {
      query.month = month;
      query.year = year;
      periodType = "monthly";

      const monthlyPayment = await MonthlyPayment.findOne(query).populate(
        "organization"
      );

      if (!monthlyPayment) {
        return res.status(404).json({
          status: "fail",
          message: `Không tìm thấy yêu cầu thanh toán tháng ${month}/${year} từ tổ chức`,
        });
      }

      totalRefundAmount = (monthlyPayment.amount * 10) / 100;
      paymentsData = [monthlyPayment];
    }
    // ✅ Nếu chỉ có year - tính theo năm
    else if (year && !month) {
      query.year = year;
      periodType = "yearly";

      const yearlyPayments = await MonthlyPayment.find(query).populate(
        "organization"
      );

      if (!yearlyPayments || yearlyPayments.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: `Không tìm thấy yêu cầu thanh toán năm ${year} từ tổ chức`,
        });
      }

      // Tính tổng tiền hoàn trả cho cả năm
      totalRefundAmount = yearlyPayments.reduce((total, payment) => {
        return total + (payment.amount * 10) / 100;
      }, 0);

      paymentsData = yearlyPayments;
    }
    // ✅ Nếu chỉ có month mà không có year - lỗi
    else if (month && !year) {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp năm khi tính theo tháng",
      });
    }
    // ✅ Nếu không có gì - lỗi
    else {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp ít nhất năm hoặc tháng và năm",
      });
    }

    return res.status(200).json({
      status: "success",
      message: `Tính toán số tiền hoàn trả ${
        periodType === "monthly" ? "tháng" : "năm"
      } thành công`,
      data: {
        organizationId,
        periodType,
        period: periodType === "monthly" ? `${month}/${year}` : `${year}`,
        totalRefundAmount,
        numberOfPayments: paymentsData.length,
        paymentsDetails: paymentsData,
        refundPercentage: 10,
      },
    });
  } catch (error) {
    console.error("Calculate refund error:", error);
    return res.status(500).json({
      status: "fail",
      message: "Tính toán số tiền hoàn trả thất bại",
      error: error.message,
    });
  }
});

// Tính doanh thu tổng hợp cho nhiều năm
exports.calculateMultiYearRevenue = asyncHandler(async (req, res) => {
  const currentUser = req.user.user;

  try {
    let { startYear, endYear } = req.query;

    // Validate input
    startYear = parseInt(startYear);
    endYear = parseInt(endYear);

    if (!startYear || !endYear || isNaN(startYear) || isNaN(endYear)) {
      return res.status(400).json({
        status: "fail",
        message:
          "Start year and end year are required and must be valid numbers",
      });
    }

    if (startYear > endYear) {
      return res.status(400).json({
        status: "fail",
        message: "Start year must be less than or equal to end year",
      });
    }

    const currentYear = new Date().getFullYear();
    if (endYear > currentYear) {
      return res.status(400).json({
        status: "fail",
        message: `End year cannot be greater than current year (${currentYear})`,
      });
    }

    const currentOrganization = await Organization.findById(
      currentUser.organizationId
    );
    const currentEvents = await Event.find({
      organizationId: currentOrganization._id,
    });
    const currentEventIds = currentEvents.map((event) => event._id);

    const certificates = await Certificate.find({
      eventId: { $in: currentEventIds },
    });
    const certificateIds = certificates.map((cert) => cert._id);

    // Tính doanh thu cho từng năm
    const yearlyRevenuePromises = [];
    for (let year = startYear; year <= endYear; year++) {
      const yearPromise = Array.from({ length: 12 }, async (_, index) => {
        const month = index + 1;
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        endDate.setHours(23, 59, 59, 999);

        const certificatePurchases = await CertificatePurchase.find({
          certificateId: { $in: certificateIds },
          paymentStatus: "paid",
          paidAt: {
            $gte: startDate,
            $lte: endDate,
          },
        }).populate("certificateId");

        const monthlyRevenue = certificatePurchases.reduce(
          (sum, purchase) => sum + purchase.amount,
          0
        );

        // Update database if revenue > 0
        if (monthlyRevenue > 0) {
          await MonthlyPayment.findOneAndUpdate(
            {
              organization: currentUser.organizationId,
              month,
              year,
            },
            {
              amount: monthlyRevenue,
              status: "NOT PAID",
              paymentDate: new Date(),
            },
            { upsert: true }
          );
        }

        return {
          year,
          month,
          monthName: new Date(2000, month - 1).toLocaleString("vi-VN", {
            month: "long",
          }),
          revenue: monthlyRevenue,
          certificateCount: certificatePurchases.length,
          certificateDetails: certificatePurchases.map((purchase) => ({
            certificateId: purchase.certificateId._id,
            certificateName: purchase.certificateId.eventName,
            amount: purchase.amount,
            paidAt: purchase.paidAt,
          })),
        };
      });

      yearlyRevenuePromises.push(Promise.all(yearPromise));
    }

    const allYearsData = await Promise.all(yearlyRevenuePromises);

    // Organize data by year
    const yearlyBreakdown = allYearsData.map((yearData, index) => {
      const year = startYear + index;
      const totalYearRevenue = yearData.reduce(
        (sum, month) => sum + month.revenue,
        0
      );
      const totalYearCertificates = yearData.reduce(
        (sum, month) => sum + month.certificateCount,
        0
      );

      const highestRevenueMonth = yearData.reduce((max, month) =>
        month.revenue > max.revenue ? month : max
      );

      return {
        year,
        totalRevenue: totalYearRevenue,
        totalCertificates: totalYearCertificates,
        monthlyData: yearData,
        averageMonthlyRevenue: totalYearRevenue / 12,
        highestRevenueMonth: {
          month: highestRevenueMonth.month,
          monthName: highestRevenueMonth.monthName,
          revenue: highestRevenueMonth.revenue,
          certificateCount: highestRevenueMonth.certificateCount,
        },
        monthsWithRevenue: yearData.filter((m) => m.revenue > 0).length,
      };
    });

    const grandTotal = yearlyBreakdown.reduce(
      (sum, year) => sum + year.totalRevenue,
      0
    );
    const totalCertificates = yearlyBreakdown.reduce(
      (sum, year) => sum + year.totalCertificates,
      0
    );

    return res.status(200).json({
      status: "success",
      message: `Tính toán doanh thu từ ${startYear} đến ${endYear} thành công`,
      data: {
        period: `${startYear}-${endYear}`,
        organizationId: currentUser.organizationId,
        organizationName: currentOrganization.name,
        grandTotalRevenue: grandTotal,
        totalCertificates,
        yearlyBreakdown,
        summary: {
          numberOfYears: endYear - startYear + 1,
          averageYearlyRevenue: grandTotal / (endYear - startYear + 1),
          averagePricePerCertificate:
            totalCertificates > 0 ? grandTotal / totalCertificates : 0,
          bestYear: yearlyBreakdown.reduce((max, year) =>
            year.totalRevenue > max.totalRevenue ? year : max
          ),
          mostProductiveYear: yearlyBreakdown.reduce((max, year) =>
            year.totalCertificates > max.totalCertificates ? year : max
          ),
        },
      },
    });
  } catch (error) {
    console.error("Calculate multi-year revenue error:", error);
    return res.status(500).json({
      status: "fail",
      message: "Không thể tính toán doanh thu nhiều năm",
      error: error.message,
    });
  }
});

// Lay so tien phai hoan cho tung to chuc theo nam
exports.getMonthlyPaymentByOrganizationId = asyncHandler(async (req, res) => {
  const { organizationId, month, year } = req.query;

  console.log(
    `Organization ID: ${organizationId}, Month: ${month}, Year: ${year}`
  );

  if (!organizationId) {
    return res.status(400).json({
      status: "fail",
      message: "Thiếu organizationId",
    });
  }

  try {
    let query = { organization: organizationId };

    // Nếu có cả month và year: lấy 1 bản ghi tháng đó
    if (month && year) {
      query.month = parseInt(month);
      query.year = parseInt(year);

      const monthlyPayment = await MonthlyPayment.findOne(query).populate(
        "organization"
      );
      if (!monthlyPayment) {
        return res.status(404).json({
          status: "fail",
          message: `Không tìm thấy dữ liệu thanh toán tháng ${month}/${year} cho tổ chức`,
        });
      }

      console.log(" ---- MONTHLY PAYMENT CONTROLLER ---- ");
      console.log(
        `Hoàn tiền cho tổ chức ${organizationId} tháng ${month}/${year}:`,
        monthlyPayment
      );

      return res.status(200).json({
        status: "success",
        data: monthlyPayment,
      });
    }

    // Nếu chỉ có year: lấy tất cả các tháng của năm đó
    if (year && !month) {
      query.year = parseInt(year);
      const monthlyPayments = await MonthlyPayment.find(query)
        .sort({ month: 1 })
        .populate("organization");
      if (!monthlyPayments || monthlyPayments.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: `Không tìm thấy dữ liệu thanh toán năm ${year} cho tổ chức`,
        });
      }

      console.log(" ---- MONTHLY PAYMENT CONTROLLER ---- ");
      console.log(
        `Hoàn tiền cho tổ chức ${organizationId} năm ${year}:`,
        monthlyPayments
      );

      return res.status(200).json({
        status: "success",
        data: monthlyPayments,
      });
    }

    if (!month && !year) {
      const monthlyPayments = await MonthlyPayment.find({
        organization: organizationId,
      })
        .sort({ month: 1 })
        .populate("organization");

      return res.status(200).json({
        status: "success",
        data: monthlyPayments,
      });
    }

    // Nếu chỉ có month mà không có year: lỗi
    if (month && !year) {
      return res.status(400).json({
        status: "fail",
        message: "Vui lòng cung cấp năm khi tìm theo tháng",
      });
    }

    // Nếu không có gì: lỗi
    return res.status(400).json({
      status: "fail",
      message:
        "Vui lòng cung cấp organizationId và ít nhất năm hoặc tháng và năm",
    });
  } catch (error) {
    console.error("getMonthlyPaymentByOrganizationId lỗi:", error);
    return res.status(500).json({
      status: "fail",
      message: "Không thể lấy dữ liệu thanh toán",
      error: error.message,
    });
  }
});

// Hàm trả tiền refund
exports.refundPayment = asyncHandler(async (req, res) => {
  const { organizationId, month, year } = req.body;

  console.log(
    `Refund payment for organization ${organizationId} for month ${month}/${year}`
  );

  try {
    // Tìm yêu cầu thanh toán chưa được hoàn
    const currentMonthlyPayment = await MonthlyPayment.findOne({
      organization: organizationId,
      month: month,
      year: year,
      status: "NOT PAID",
    }).populate("organization");

    if (!currentMonthlyPayment) {
      return res.status(404).json({
        status: "fail",
        message: "Không tìm thấy yêu cầu thanh toán từ tổ chức",
      });
    }

    // Cập nhật trạng thái thanh toán
    await MonthlyPayment.findByIdAndUpdate(currentMonthlyPayment._id, {
      $set: { status: "PAID" },
    });

    // Emit socket event cho real-time update
    const io = socketIO.getIO();
    io.to(organizationId.toString()).emit("paymentRefunded", {
      type: "payment_refunded",
      data: {
        monthlyPayment: currentMonthlyPayment,
        month,
        year,
      },
      timestamp: new Date(),
    });

    return res.status(200).json({
      status: "success",
      message: "Hoàn tiền thành công",
      data: currentMonthlyPayment,
    });
  } catch (error) {
    console.error("Refund payment error:", error);
    return res.status(500).json({
      status: "fail",
      message: "Hoàn tiền thất bại",
      error: error.message,
    });
  }
});
