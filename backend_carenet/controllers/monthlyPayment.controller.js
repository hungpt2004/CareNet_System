const MonthlyPayment = require('../models/monthlyPayment.model');
const CertificatePurchase = require('../models/certificatePurchase.model');
const Certificate = require('../models/certificate.model');
const Organization = require('../models/organization.model');
const Event = require('../models/event.model');
const socketIO = require('../socket');

// Tính doanh thu theo tháng
exports.calculateMonthlyRevenue = async (req, res) => {
    const currentUser = req.user.user;

    try {
        let { month, year } = req.query;

        // Chuyển sang số nguyên
        month = parseInt(month);
        year = parseInt(year);

        // Kiểm tra đầu vào hợp lệ
        if (!month || !year || isNaN(month) || isNaN(year) || month < 1 || month > 12) {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid month or year. Month must be from 1 to 12 and year must be a valid number.'
            });
        }

        // Tính ngày đầu và cuối của tháng
        const startDate = new Date(year, month - 1, 1); // Tháng trong JS bắt đầu từ 0
        const endDate = new Date(year, month, 0);       // Ngày cuối cùng của tháng
        endDate.setHours(23, 59, 59, 999);              // Bao trùm toàn bộ ngày cuối

        const currentOrganization = await Organization.findById(currentUser.organizationId);

        console.log(currentOrganization);

        const currentEvents = await Event.find({organizationId: currentOrganization._id});

        console.log(currentEvents);

        const currentEventIds = currentEvents.map(event => event._id);

        console.log(currentEventIds);

        // Tìm tất cả chứng chỉ do tổ chức tạo
        const certificates = await Certificate.find({
            eventId: { $in: currentEventIds }
        });

        console.log(certificates);

        const certificateIds = certificates.map(cert => cert._id);

        // Tìm tất cả giao dịch đã thanh toán trong tháng
        const certificatePurchases = await CertificatePurchase.find({
            certificateId: { $in: certificateIds },
            paymentStatus: 'paid',
            paidAt: {
                $gte: startDate,
                $lte: endDate
            }
        });

        // Tính tổng doanh thu
        const totalRevenue = certificatePurchases.reduce((sum, purchase) => sum + purchase.amount, 0);

        console.log(totalRevenue);

        // Cập nhật hoặc tạo bản ghi doanh thu theo tháng
        const monthlyPayment = await MonthlyPayment.findOneAndUpdate(
            {
                organization: currentUser.organizationId,
                month,
                year
            },
            {
                amount: totalRevenue,
                status: 'NOT PAID',
                paymentDate: new Date()
            },
            { upsert: true, new: true }
        );

        // Emit socket event để cập nhật realtime
        const io = socketIO.getIO();
        io.to(currentUser.organizationId.toString()).emit('revenueUpdated', {
            type: 'revenue_updated',
            data: {
                monthlyPayment,
                totalRevenue,
                certificateCount: certificatePurchases.length,
                month,
                year
            },
            timestamp: new Date()
        });

        // Trả về kết quả
        return res.status(200).json({
            status: 'success',
            data: {
                monthlyPayment,
                totalRevenue,
                certificateCount: certificatePurchases.length,
                certificateDetails: certificatePurchases.map(purchase => ({
                    certificateId: purchase.certificateId,
                    amount: purchase.amount,
                    paidAt: purchase.paidAt
                }))
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};

// Lấy doanh thu theo tháng hoặc năm
exports.getRevenue = async (req, res) => {
    const currentUser = req.user.user;

    try {
        const { month, year } = req.query;
        
        // Lấy tất cả chứng chỉ của các sự kiện do organization tạo
        const currentOrganization = await Organization.findById(currentUser.organizationId);
        const currentEvents = await Event.find({organizationId: currentOrganization._id});
        const currentEventIds = currentEvents.map(event => event._id);
        const certificates = await Certificate.find({
            eventId: { $in: currentEventIds }
        });
        const certificateIds = certificates.map(cert => cert._id);

        // Nếu có cả tháng và năm, trả về dữ liệu của tháng đó
        if (month && year) {
            const monthlyPayment = await MonthlyPayment.findOne({
                organization: currentUser.organizationId,
                month: parseInt(month),
                year: parseInt(year)
            });

            // Tính số lượng chứng chỉ bán được trong tháng
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            endDate.setHours(23, 59, 59, 999);

            const certificateCount = await CertificatePurchase.countDocuments({
                certificateId: { $in: certificateIds },
                paymentStatus: 'paid',
                paidAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            });

            // Emit socket event khi có người mua chứng chỉ
            const io = socketIO.getIO();
            io.to(currentUser.organizationId.toString()).emit('certificatePurchased', {
                type: 'certificate_purchased',
                data: {
                    monthlyPayment,
                    certificateCount,
                    month: parseInt(month),
                    year: parseInt(year)
                },
                timestamp: new Date()
            });

            return res.status(200).json({
                status: 'success',
                data: {
                    monthlyPayment,
                    certificateCount,
                    month: parseInt(month),
                    year: parseInt(year)
                }
            });
        }
        
        // Nếu chỉ có năm, trả về dữ liệu của cả năm
        if (year) {
            // Lấy dữ liệu doanh thu của tất cả các tháng trong năm
            const monthlyPayments = await MonthlyPayment.find({
                organization: currentUser.organizationId,
                year: parseInt(year)
            }).sort({ month: 1 });

            // Tạo mảng dữ liệu cho biểu đồ
            const chartData = Array.from({ length: 12 }, (_, i) => {
                const monthData = monthlyPayments.find(payment => payment.month === i + 1);
                return {
                    month: i + 1,
                    monthName: new Date(2000, i).toLocaleString('default', { month: 'short' }),
                    revenue: monthData ? monthData.amount : 0,
                    status: monthData ? monthData.status : 'PENDING'
                };
            });

            const eventCount = await Event.find({
                organizationId: currentUser.organizationId,
                adminStatus: 'approved',
            });

            // Tính tổng doanh thu năm
            const totalYearlyRevenue = chartData.reduce((sum, month) => sum + month.revenue, 0);

            // Lấy chi tiết số lượng chứng chỉ bán được theo tháng
            const monthlyCertificateCounts = await Promise.all(
                chartData.map(async (monthData) => {
                    const startDate = new Date(year, monthData.month - 1, 1);
                    const endDate = new Date(year, monthData.month, 0);
                    endDate.setHours(23, 59, 59, 999);

                    const count = await CertificatePurchase.countDocuments({
                        certificateId: { $in: certificateIds },
                        paymentStatus: 'paid',
                        paidAt: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    });

                    return {
                        ...monthData,
                        certificateCount: count
                    };
                })
            );

            return res.status(200).json({
                status: 'success',
                data: {
                    chartData: monthlyCertificateCounts,
                    totalYearlyRevenue,
                    monthlyPayments,
                    totalEvent: eventCount.length
                }
            });
        }

        return res.status(400).json({
            status: 'fail',
            message: 'Year is required'
        });

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
};
