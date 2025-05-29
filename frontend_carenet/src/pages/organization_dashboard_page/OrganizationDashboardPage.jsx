import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Statistic,
  Typography,
  Select,
  Table,
  Button,
  Modal,
  Tag,
  Space,
  Tooltip,
} from "antd";
import {
  TrendingUp,
  DollarSign,
  FileText,
  Calculator,
  Users,
  MapPin,
  Calendar,
  Crown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import axiosInstance from "../../utils/AxiosInstance";
import io from "socket.io-client";
import {
  CustomFailedToast,
  CustomSuccessToast,
  CustomToast,
} from "../../components/toast/CustomToast";
import { formatDateVN } from "../../utils/FormatDateVN";
import { formatFullAddress } from "../../utils/FormatFullAddress";
import OrganizationService from "../../services/organization-service/organization.service";
import { handleUpgradeServiceForOrganization } from "../../services/payment-service/organization.payment";
import styles from "../../css/OrganizationDashboardPage.module.css";

const { Title, Text } = Typography;
const { Option } = Select;
const _orgaService = new OrganizationService();

const OrganizationDashboardPage = () => {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(
    currentDate.getMonth() + 1
  );
  const [revenueData, setRevenueData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonthForCalc, setSelectedMonthForCalc] = useState(
    currentDate.getMonth() + 1
  );
  const [selectedYearForCalc, setSelectedYearForCalc] = useState(
    currentDate.getFullYear()
  );
  const [isCalculating, setIsCalculating] = useState(false);
  const [events, setEvents] = useState([]);
  const [currentOrganization, setCurrentOrganization] = useState(null);
  const [isPro, setIsPro] = useState(false);
  const [isBasic, setIsBasic] = useState(false);

  const fetchOwnedEvent = async () => {
    try {
      const response = await axiosInstance.get(
        "/organization/get-all-owned-event"
      );

      if (response.data.status === "success" && response.data.eventData) {
        setEvents(response.data.eventData);
      }

      console.log("Đã lấy được event");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCurrentOrganization = async () => {
    const { data } = await _orgaService.fetchCurrentOrganization();
    if (data) {
      setCurrentOrganization(data);
    }
  };

  useEffect(() => {
    if (currentOrganization?.levelId.name === "Pro") {
      setIsPro(true);
      setIsBasic(false);
    } else if (currentOrganization?.levelId.name === "basic") {
      setIsBasic(true);
      setIsPro(false);
    } else {
      setIsPro(false);
      setIsBasic(false);
    }
  }, [currentOrganization]);

  useEffect(() => {
    fetchCurrentOrganization();
  }, []);

  // Handle upgrade to Pro
  const handleUpgrade = async () => {
    try {
      const { checkoutUrl } = await handleUpgradeServiceForOrganization();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error upgrading:", error);
      CustomFailedToast("Lỗi khi nâng cấp gói dịch vụ");
    }
  };

  useEffect(() => {
    // Khởi tạo socket connection
    const socket = io(window.location.origin.replace("3000", "5000"), {
      withCredentials: true,
    });

    // Join organization room khi component mount
    const organizationId = localStorage.getItem("organizationId");
    if (organizationId) {
      socket.emit("joinOrganizationRoom", organizationId);
    }

    // Lắng nghe sự kiện cập nhật doanh thu
    socket.on("revenueUpdated", () => {
      CustomSuccessToast("Doanh thu đã được cập nhật!");
      fetchRevenueData();
      fetchMonthlyData();
    });

    // Lắng nghe sự kiện mua chứng chỉ
    socket.on("certificatePurchased", (data) => {
      CustomSuccessToast("Có người mua chứng chỉ mới!");
      // Cập nhật dữ liệu tháng hiện tại
      fetchMonthlyData();
      // Cập nhật dữ liệu năm
      fetchRevenueData();
    });

    // Lắng nghe sự kiện duyệt tham gia
    socket.on("participationApproved", () => {
      CustomSuccessToast("Có người được duyệt tham gia sự kiện!");
      // Cập nhật lại dữ liệu
      fetchRevenueData();
      fetchMonthlyData();
    });

    return () => {
      if (organizationId) {
        socket.emit("leaveOrganizationRoom", organizationId);
      }
      socket.off("revenueUpdated");
      socket.off("certificatePurchased");
      socket.off("participationApproved");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchOwnedEvent();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const response = await axiosInstance.get(`/api/monthly-payment`, {
        params: {
          year: selectedYear,
        },
      });
      setRevenueData(response.data.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      CustomFailedToast("Lỗi khi tải dữ liệu doanh thu");
    }
  };

  const fetchMonthlyData = async () => {
    try {
      const response = await axiosInstance.get(`/api/monthly-payment`, {
        params: {
          month: selectedMonth,
          year: selectedYear,
        },
      });
      setMonthlyData(response.data.data);
    } catch (error) {
      console.error("Error fetching monthly data:", error);
      CustomFailedToast("Lỗi khi tải dữ liệu tháng");
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, [selectedYear]);

  useEffect(() => {
    fetchMonthlyData();
  }, [selectedMonth, selectedYear]);

  const handleCalculate = async () => {
    setIsCalculating(true);
    try {
      await axiosInstance.get(`/api/monthly-payment/calculate`, {
        params: {
          month: selectedMonthForCalc,
          year: selectedYearForCalc,
        },
      });
      CustomSuccessToast(
        `Đã tính kết quả doanh thu tháng ${selectedMonthForCalc}`
      );
      setIsModalVisible(false);
      fetchRevenueData();
      fetchMonthlyData();
    } catch (error) {
      console.error("Error calculating revenue:", error);
      CustomFailedToast("Lỗi khi tính toán doanh thu");
    } finally {
      setIsCalculating(false);
    }
  };

  // Transform data for the chart
  const chartData = revenueData?.chartData || [];

  return (
    <div className={styles.dashboardContainer}>
      {/* Main Dashboard Content */}
      <div
        className={`${styles.mainContent} ${
          isBasic ? styles.mainContentBlurred : ""
        }`}
      >
        <CustomToast />

        {/* Year and Month Selector with Calculate Button */}
        <div className={styles.controlPanel}>
          <div className={styles.selectGroup}>
            <Text className={styles.selectLabel}>Năm:</Text>
            <Select
              value={selectedYear}
              onChange={setSelectedYear}
              style={{ width: 120 }}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <Option key={i} value={new Date().getFullYear() - i}>
                  {new Date().getFullYear() - i}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.selectGroup}>
            <Text className={styles.selectLabel}>Tháng:</Text>
            <Select
              value={selectedMonth}
              onChange={setSelectedMonth}
              style={{ width: 120 }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <Option key={i} value={i + 1}>
                  Tháng {i + 1}
                </Option>
              ))}
            </Select>
          </div>
          <Button
            type="primary"
            icon={<Calculator size={16} />}
            onClick={() => setIsModalVisible(true)}
            className={styles.calculateButton}
          >
            Tính toán doanh thu
          </Button>
        </div>

        {/* Calculate Revenue Modal */}
        <Modal
          title={<div className={styles.modalTitle}>Tính toán doanh thu</div>}
          open={isModalVisible}
          onOk={handleCalculate}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={isCalculating}
          okButtonProps={{ className: styles.calculateButton }}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalSelectGroup}>
              <Text className={styles.modalSelectLabel}>Tháng:</Text>
              <Select
                className={styles.modalSelect}
                value={selectedMonthForCalc}
                onChange={setSelectedMonthForCalc}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <Option key={i} value={i + 1}>
                    Tháng {i + 1}
                  </Option>
                ))}
              </Select>
            </div>
            <div className={styles.modalSelectGroup}>
              <Text className={styles.modalSelectLabel}>Năm:</Text>
              <Select
                className={styles.modalSelect}
                value={selectedYearForCalc}
                onChange={setSelectedYearForCalc}
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <Text className={styles.modalDescription}>
            Chọn tháng và năm để tính toán doanh thu
          </Text>
        </Modal>

        {/* Summary Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className={styles.statsCard}>
              <Statistic
                title={
                  <Text className={styles.statsTitle}>
                    Tổng doanh thu chứng chỉ
                  </Text>
                }
                value={revenueData?.totalYearlyRevenue || 0}
                precision={0}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                prefix={<DollarSign size={20} />}
                suffix="đ"
              />
              <div className={styles.statsSubtext}>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  <TrendingUp size={12} className={styles.statsIcon} />
                  Tăng 12% so với năm trước
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className={styles.statsCard}>
              <Statistic
                title={
                  <Text className={styles.statsTitle}>Doanh thu tháng này</Text>
                }
                value={monthlyData?.monthlyPayment?.amount || 0}
                precision={0}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                prefix={<TrendingUp size={20} />}
                suffix="đ"
              />
              <div className={styles.statsSubtext}>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  <TrendingUp size={12} className={styles.statsIcon} />
                  Tăng 8% so với tháng trước
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className={styles.statsCard}>
              <Statistic
                title={
                  <Text className={styles.statsTitle}>Tổng số sự kiện</Text>
                }
                value={revenueData?.eventCount || 0}
                precision={0}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                prefix={<FileText size={20} />}
              />
              <div className={styles.statsSubtext}>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  <TrendingUp size={12} className={styles.statsIcon} />
                  Tăng 5 sự kiện trong tháng này
                </Text>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card hoverable className={styles.statsCard}>
              <Statistic
                title={
                  <Text className={styles.statsTitle}>
                    Chứng chỉ đã bán tháng này
                  </Text>
                }
                value={monthlyData?.certificateCount || 0}
                precision={0}
                valueStyle={{
                  color: "#3f8600",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
                prefix={<FileText size={20} />}
              />
              <div className={styles.statsSubtext}>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  <TrendingUp size={12} className={styles.statsIcon} />
                  Tăng 15% so với tháng trước
                </Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
          <Col xs={24} lg={12}>
            <Card
              title={
                <Text className={styles.chartTitle}>
                  Biểu đồ doanh thu chứng chỉ theo tháng
                </Text>
              }
              className={styles.chartCard}
              extra={
                <Text className={styles.chartExtra}>Năm {selectedYear}</Text>
              }
            >
              <div className={styles.chartContainer}>
                <ResponsiveContainer>
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="monthName" tick={{ fill: "#666" }} />
                    <YAxis tick={{ fill: "#666" }} />
                    <RechartsTooltip
                      formatter={(value) => [
                        `${value.toLocaleString()}đ`,
                        "Doanh thu",
                      ]}
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "4px",
                        border: "none",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#1a3353"
                      fill="rgba(26, 51, 83, 0.2)"
                      name="Doanh thu"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card
              title={
                <Text className={styles.chartTitle}>
                  Chi tiết doanh thu theo tháng
                </Text>
              }
              className={styles.chartCard}
              extra={
                <Text className={styles.chartExtra}>Năm {selectedYear}</Text>
              }
            >
              <Table
                columns={[
                  {
                    title: "Tháng",
                    dataIndex: "monthName",
                    key: "monthName",
                    render: (text) => <Text strong>{text}</Text>,
                  },
                  {
                    title: "Doanh thu",
                    dataIndex: "revenue",
                    key: "revenue",
                    render: (value) => (
                      <Text style={{ color: "#3f8600", fontWeight: "bold" }}>
                        {value.toLocaleString()}đ
                      </Text>
                    ),
                  },
                  {
                    title: "Số chứng chỉ",
                    dataIndex: "certificateCount",
                    key: "certificateCount",
                    render: (value) => <Text>{value}</Text>,
                  },
                  {
                    title: "Trạng thái",
                    dataIndex: "status",
                    key: "status",
                    render: (status) => (
                      <Tag
                        color={status === "PAID" ? "success" : "error"}
                        style={{ borderRadius: "4px" }}
                      >
                        {status === "PAID" ? "Đã thanh toán" : "Chờ thanh toán"}
                      </Tag>
                    ),
                  },
                ]}
                dataSource={chartData}
                rowKey="month"
                pagination={false}
                style={{ marginTop: "8px" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Additional Information */}
        <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <Text strong style={{ color: "#1a3353" }}>
                  Danh sách sự kiện
                </Text>
              }
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              extra={
                <Button type="link" style={{ color: "#1a3353", padding: 0 }}>
                  Xem tất cả
                </Button>
              }
            >
              <Space
                direction="vertical"
                style={{ width: "100%" }}
                size="middle"
              >
                {events.length > 0 ? (
                  events.map((event) => (
                    <Card
                      key={event._id}
                      hoverable
                      bodyStyle={{ padding: "16px" }}
                      style={{
                        borderRadius: "8px",
                        border: "1px solid #f0f0f0",
                      }}
                    >
                      <Row gutter={16} align="middle">
                        <Col xs={24} sm={4}>
                          {event.images && event.images.length > 0 ? (
                            <img
                              alt={event.title}
                              src={event.images[0] || "/placeholder.svg"}
                              style={{
                                width: "100%",
                                height: 80,
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: 80,
                                background: "#f5f7fa",
                                borderRadius: "8px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <FileText size={24} color="#1a3353" />
                            </div>
                          )}
                        </Col>
                        <Col xs={24} sm={20}>
                          <Space
                            direction="vertical"
                            style={{ width: "100%" }}
                            size="small"
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Title
                                level={5}
                                style={{ margin: 0, color: "#1a3353" }}
                              >
                                {event.title}
                              </Title>
                              <Space>
                                <Tooltip title="Trạng thái sự kiện">
                                  <div
                                    style={{
                                      width: 10,
                                      height: 10,
                                      borderRadius: "50%",
                                      backgroundColor:
                                        event.status === "hiring"
                                          ? "#1890ff"
                                          : event.status === "processing"
                                          ? "#faad14"
                                          : event.status === "completed"
                                          ? "#52c41a"
                                          : "#ff4d4f",
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip title="Trạng thái duyệt">
                                  <div
                                    style={{
                                      width: 10,
                                      height: 10,
                                      borderRadius: "50%",
                                      backgroundColor:
                                        event.adminStatus === "approved"
                                          ? "#52c41a"
                                          : event.adminStatus === "pending"
                                          ? "#faad14"
                                          : "#ff4d4f",
                                    }}
                                  />
                                </Tooltip>
                              </Space>
                            </div>

                            <Text
                              type="secondary"
                              ellipsis={{ rows: 1 }}
                              style={{ fontSize: "13px" }}
                            >
                              {event.description}
                            </Text>

                            <Row gutter={16} style={{ marginTop: "4px" }}>
                              <Col xs={12} sm={6}>
                                <Space>
                                  <Users size={14} color="#666" />
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "12px" }}
                                  >
                                    <Text
                                      strong
                                      style={{
                                        color: "#1a3353",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {event.currentParticipants}
                                    </Text>
                                    /{event.maxParticipants}
                                  </Text>
                                </Space>
                              </Col>
                              <Col xs={12} sm={6}>
                                <Space>
                                  <Calendar size={14} color="#666" />
                                  <Text
                                    type="secondary"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {formatDateVN(event.endAt)}
                                  </Text>
                                </Space>
                              </Col>
                              <Col xs={24} sm={12}>
                                <Space>
                                  <MapPin size={14} color="#666" />
                                  <Text
                                    type="secondary"
                                    ellipsis
                                    style={{
                                      fontSize: "12px",
                                      maxWidth: "100%",
                                    }}
                                  >
                                    {formatFullAddress(event.location) ||
                                      "Chưa có địa chỉ"}
                                  </Text>
                                </Space>
                              </Col>
                            </Row>

                            <Space
                              wrap
                              size={[0, 4]}
                              style={{ marginTop: "8px" }}
                            >
                              {event.category && (
                                <Tag
                                  color="blue"
                                  style={{ margin: 0, borderRadius: "4px" }}
                                >
                                  {event.category}
                                </Tag>
                              )}
                              {event.skillNeeds
                                ?.slice(0, 2)
                                .map((skill, index) => (
                                  <Tag
                                    key={index}
                                    color="green"
                                    style={{ margin: 0, borderRadius: "4px" }}
                                  >
                                    {skill}
                                  </Tag>
                                ))}
                              {event.skillNeeds?.length > 2 && (
                                <Tag style={{ margin: 0, borderRadius: "4px" }}>
                                  +{event.skillNeeds.length - 2}
                                </Tag>
                              )}
                            </Space>
                          </Space>
                        </Col>
                      </Row>
                    </Card>
                  ))
                ) : (
                  <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <FileText
                      size={40}
                      color="#d9d9d9"
                      style={{ marginBottom: "16px" }}
                    />
                    <Text type="secondary">Chưa có sự kiện nào</Text>
                  </div>
                )}
              </Space>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card
              title={
                <Text strong style={{ color: "#1a3353" }}>
                  Thông báo
                </Text>
              }
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
              extra={
                <Button type="link" style={{ color: "#1a3353", padding: 0 }}>
                  Xem tất cả
                </Button>
              }
            >
              <div style={{ height: 300, overflowY: "auto" }}>
                {[
                  {
                    type: "certificate",
                    message: "Có người mua chứng chỉ mới",
                    time: "10 phút trước",
                  },
                  {
                    type: "revenue",
                    message: "Doanh thu đã được cập nhật",
                    time: "2 giờ trước",
                  },
                  {
                    type: "event",
                    message: "Có người được duyệt tham gia sự kiện",
                    time: "5 giờ trước",
                  },
                  {
                    type: "certificate",
                    message: "Có người mua chứng chỉ mới",
                    time: "1 ngày trước",
                  },
                  {
                    type: "revenue",
                    message: "Doanh thu tháng 4 đã được tính toán",
                    time: "2 ngày trước",
                  },
                ].map((notification, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "12px 0",
                      borderBottom: index < 4 ? "1px solid #f0f0f0" : "none",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor:
                          notification.type === "certificate"
                            ? "#1890ff"
                            : notification.type === "revenue"
                            ? "#52c41a"
                            : "#faad14",
                        marginTop: "6px",
                      }}
                    />
                    <div>
                      <Text style={{ display: "block", fontSize: "14px" }}>
                        {notification.message}
                      </Text>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        {notification.time}
                      </Text>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Add a new analytics card */}
            <Card
              title={
                <Text strong style={{ color: "#1a3353" }}>
                  Phân tích chứng chỉ
                </Text>
              }
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                marginTop: "16px",
              }}
            >
              <div>
                {[
                  { name: "Chứng chỉ cơ bản", value: 65, color: "#1890ff" },
                  { name: "Chứng chỉ nâng cao", value: 25, color: "#52c41a" },
                  { name: "Chứng chỉ chuyên sâu", value: 10, color: "#faad14" },
                ].map((item, index) => (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "4px",
                      }}
                    >
                      <Text>{item.name}</Text>
                      <Text strong>{item.value}%</Text>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: "#f0f0f0",
                        borderRadius: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: `${item.value}%`,
                          height: "100%",
                          backgroundColor: item.color,
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Upgrade Overlay for Basic Plan */}
      {isBasic && (
        <div className={styles.upgradeOverlay}>
          <Card className={styles.upgradeModal}>
            <div className={styles.upgradeContent}>
              {/* Crown Icon */}
              <div className={styles.upgradeCrownContainer}>
                <Crown size={40} color="white" />
              </div>

              {/* Title */}
              <Title level={2} className={styles.upgradeTitle}>
                Nâng cấp lên Pro
              </Title>

              {/* Description */}
              <Text className={styles.upgradeDescription}>
                Bạn đang sử dụng gói <strong>Basic</strong>. Nâng cấp lên gói{" "}
                <strong>Pro</strong> để truy cập đầy đủ tính năng dashboard và
                phân tích doanh thu chi tiết.
              </Text>

              {/* Features List */}
              <div className={styles.upgradeFeatures}>
                <Text className={styles.upgradeFeaturesTitle}>
                  Tính năng Pro bao gồm:
                </Text>
                <ul className={styles.upgradeFeaturesList}>
                  <li className={styles.upgradeFeatureItem}>
                    <Text>Dashboard phân tích chi tiết</Text>
                  </li>
                  <li className={styles.upgradeFeatureItem}>
                    <Text>Báo cáo doanh thu theo thời gian thực</Text>
                  </li>
                  <li className={styles.upgradeFeatureItem}>
                    <Text>Biểu đồ và thống kê nâng cao</Text>
                  </li>
                  <li className={styles.upgradeFeatureItem}>
                    <Text>Tính toán doanh thu tự động</Text>
                  </li>
                  <li className={styles.upgradeFeatureItem}>
                    <Text>Thông báo real-time</Text>
                  </li>
                  <li className={styles.upgradeFeatureItem}>
                    <Text>Đăng tuyển không giới hạn</Text>
                  </li>
                </ul>
              </div>

              {/* Price */}
              <div className={styles.upgradePricing}>
                <Text className={styles.upgradePrice}>499.000đ</Text>
                <Text className={styles.upgradePricePeriod}>/tháng</Text>
              </div>

              {/* Buttons */}
              <div className={styles.upgradeButtons}>
                <Button
                  size="large"
                  className={styles.upgradeButtonSecondary}
                  onClick={() => (window.location.href = "/upgrade-pro")}
                >
                  Xem trước
                </Button>
                <Button
                  size="large"
                  icon={<Crown size={16} />}
                  onClick={handleUpgrade}
                  className={styles.upgradeButtonPrimary}
                >
                  Nâng cấp ngay
                </Button>
              </div>

              {/* Close button */}
              <div className={styles.upgradeClose}>
                <Button
                  type="link"
                  onClick={() => window.history.back()}
                  className={styles.upgradeCloseButton}
                >
                  Quay lại
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default OrganizationDashboardPage;
