"use client";

import { useState, useEffect } from "react";
import { Table, Input, Button, Badge, Modal, Space, Select, DatePicker, Row, Col, Alert } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  FilterOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import axios from "../../utils/AxiosInstance";
import moment from "moment";

const customStyles = {
  primaryColor: "#118b50",
  accentColor: "#5db996",
  accentLightColor: "#e3f0af",
  backgroundColor: "#f6f4ef",
  textColor: "#ffffff",
  buttonHover: "#0a6d3a",
};

const AdminVolunteerPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState({ start: "", end: "" });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [showFilterModal, setShowFilterModal] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get("/event/get-all-events", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response (Posts):", JSON.stringify(response.data, null, 2));
      const fetchedPosts = (response.data.data || []).map(event => ({
        key: event._id,
        id: event._id,
        title: event.title || "Chưa có tiêu đề",
        organization: event.organizationId?.name || "Chưa xác định",
        organizationLogo: event.organizationId?.logo || "https://via.placeholder.com/40",
        category: event.category || "Chưa xác định",
        publishDate: event.createdAt || new Date().toISOString(),
        adminStatus: event.adminStatus || "pending",
        status: event.status || "hiring",
        featured: event.featured || false,
        content: event.description || "Chưa có mô tả",
        eventDate: event.startAt || new Date().toISOString(),
        eventLocation: event.location?.fullAddress || "Chưa xác định",
        image: event.images?.[0] || "https://via.placeholder.com/800x400",
        moderationNotes: event.rejectReason || "",
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      let errorMessage = "Lỗi khi tải danh sách bài đăng: ";
      if (error.response) {
        errorMessage += `Server responded with status ${error.response.status}. `;
        if (error.response.status === 404) {
          errorMessage += "API endpoint '/event/get-all-events' not found.";
        } else {
          errorMessage += error.response.data?.message || "Unknown server error.";
        }
      } else if (error.request) {
        errorMessage += "No response received from the server.";
      } else {
        errorMessage += error.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const categories = [...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || post.adminStatus === statusFilter;

    const postDate = new Date(post.publishDate);
    const startDate = dateRangeFilter.start ? new Date(dateRangeFilter.start) : null;
    const endDate = dateRangeFilter.end ? new Date(dateRangeFilter.end) : null;
    const matchesDate =
      (!startDate || postDate >= startDate) &&
      (!endDate || postDate <= endDate);

    return matchesSearch && matchesCategory && matchesStatus && matchesDate;
  });

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterApply = () => {
    setShowFilterModal(false);
    setCurrentPage(1);
  };

  const getAdminStatusBadge = (adminStatus) => {
    switch (adminStatus) {
      case "approved":
        return <Badge status="success" text="Đã đăng" />;
      case "pending":
        return <Badge status="warning" text="Chờ duyệt" />;
      case "rejected":
        return <Badge status="error" text="Từ chối" />;
      default:
        return <Badge status="default" text="Không xác định" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "hiring":
        return <Badge status="processing" text="Đang tuyển" />;
      case "processing":
        return <Badge status="warning" text="Đang xử lý" />;
      case "completed":
        return <Badge status="success" text="Hoàn thành" />;
      case "cancelled":
        return <Badge status="error" text="Đã hủy" />;
      default:
        return <Badge status="default" text="Không xác định" />;
    }
  };

  const viewPostDetails = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const approvePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      await axios.put(`/event/update-status/${postId}`, {
        adminStatus: "approved",
        rejectReason: "",
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchPosts();

      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost({
          ...selectedPost,
          adminStatus: "approved",
          moderationNotes: "",
        });
      }
    } catch (error) {
      console.error("Error approving post:", error);
      setError("Lỗi khi phê duyệt bài đăng: " + (error.response?.data?.message || error.message));
    }
  };

  const rejectPost = async (postId, reason = "Nội dung không phù hợp với tiêu chuẩn cộng đồng") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      await axios.put(`/event/update-status/${postId}`, {
        adminStatus: "rejected",
        rejectReason: reason,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchPosts();

      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost({
          ...selectedPost,
          adminStatus: "rejected",
          moderationNotes: reason,
        });
      }
    } catch (error) {
      console.error("Error rejecting post:", error);
      setError("Lỗi khi từ chối bài đăng: " + (error.response?.data?.message || error.message));
    }
  };

  const exportToCSV = () => {
    const headers = ["Số thứ tự,Tiêu đề,Tổ chức,Danh mục,Ngày đăng,Trạng thái,Trạng thái duyệt"];
    const rows = filteredPosts.map((post, index) => [
      (currentPage - 1) * pageSize + index + 1,
      `"${post.title.replace(/"/g, '""')}"`,
      `"${post.organization.replace(/"/g, '""')}"`,
      post.category,
      formatDate(post.publishDate),
      post.adminStatus,
      post.status,
    ].join(","));

    const csvContent = [...headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "volunteer_posts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(dateString).toLocaleDateString("vi-VN", options);
  };

  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "index",
      key: "index",
      width: 70,
      render: (_, __, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      width: 80,
      render: (text) => <img src={text} alt="Post" style={{ width: 40, height: 40, borderRadius: 4 }} />,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      width: 250,
      whiteSpace: "normal",
      render: (text, record) => (
        <div>
          {record.featured && <Badge status="warning" text="Nổi bật" style={{ marginRight: 8 }} />}
          {text}
        </div>
      ),
    },
    {
      title: "Tổ chức",
      dataIndex: "organization",
      key: "organization",
      width: 200,
      whiteSpace: "normal",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      width: 150,
      whiteSpace: "normal",
    },
    {
      title: "Ngày đăng",
      dataIndex: "publishDate",
      key: "publishDate",
      width: 130,
      render: (text) => formatDate(text),
    },
    {
      title: "Trạng thái",
      dataIndex: "adminStatus",
      key: "adminStatus",
      width: 100,
      render: (text) => getAdminStatusBadge(text),
    },
    {
      title: "Trạng thái duyệt",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (text) => getStatusBadge(text),
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => viewPostDetails(record)} />
          {record.adminStatus === "pending" && (
            <>
              <Button
                icon={<CheckOutlined />}
                type="primary"
                style={{ background: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                onClick={() => approvePost(record.id)}
              />
              <Button
                icon={<CloseOutlined />}
                danger
                onClick={() => rejectPost(record.id)}
              />
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: customStyles.backgroundColor }}>
      {/* Main Content */}
      <div style={{ padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ color: customStyles.primaryColor }}>Quản lý bài đăng tình nguyện</h2>
        </div>

        {error && <Alert message={error} type="error" closable onClose={() => setError(null)} style={{ marginBottom: 16 }} />}

        <div style={{ marginBottom: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Input
            placeholder="Tìm kiếm theo tiêu đề, tổ chức, ID..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: 300 }}
          />
          <Select
            value={categoryFilter}
            onChange={(value) => { setCategoryFilter(value); setCurrentPage(1); }}
            style={{ width: 200 }}
          >
            <Select.Option value="all">Tất cả danh mục</Select.Option>
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
          <Select
            value={statusFilter}
            onChange={(value) => { setStatusFilter(value); setCurrentPage(1); }}
            style={{ width: 200 }}
          >
            <Select.Option value="all">Tất cả trạng thái</Select.Option>
            <Select.Option value="approved">Đã đăng</Select.Option>
            <Select.Option value="pending">Chờ duyệt</Select.Option>
            <Select.Option value="rejected">Từ chối</Select.Option>
          </Select>
          <Button onClick={() => setShowFilterModal(true)}>
            <FilterOutlined /> Lọc nâng cao
          </Button>
          <Button onClick={exportToCSV}>
            <DownloadOutlined /> Xuất dữ liệu
          </Button>
          <Button
            type="primary"
            style={{ background: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
            onClick={async () => {
              const pendingPosts = posts.filter((post) => post.adminStatus === "pending");
              if (pendingPosts.length > 0) {
                for (const post of pendingPosts) {
                  await approvePost(post.id);
                }
                alert(`Đã phê duyệt ${pendingPosts.length} bài đăng đang chờ duyệt`);
              } else {
                alert("Không có bài đăng nào đang chờ duyệt");
              }
            }}
          >
            <CheckOutlined /> Duyệt tất cả
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={paginatedPosts}
          loading={loading}
          pagination={false}
          bordered
          style={{ background: "#fff" }}
          scroll={{ x: 1200 }} // Enable horizontal scrolling to accommodate full text
        />

        <div style={{ marginTop: 16, textAlign: "right" }}>
          <span style={{ marginRight: 16 }}>
            Hiển thị {paginatedPosts.length} / {filteredPosts.length} bài đăng
          </span>
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ marginRight: 8, borderColor: "#d9d9d9" }}
          >
            Trước
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              type={currentPage === page ? "primary" : "default"}
              style={{
                background: currentPage === page ? customStyles.primaryColor : undefined,
                borderColor: currentPage === page ? customStyles.primaryColor : "#d9d9d9",
                color: currentPage === page ? customStyles.textColor : "#000",
                marginRight: 8,
              }}
            >
              {page}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ borderColor: "#d9d9d9" }}
          >
            Tiếp
          </Button>
        </div>
      </div>

      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            Chi tiết bài đăng
            <span style={{ marginLeft: 8 }}>{selectedPost && getAdminStatusBadge(selectedPost.adminStatus)}</span>
          </div>
        }
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={
          <div>
            {selectedPost?.adminStatus === "pending" && (
              <>
                <Button
                  type="primary"
                  onClick={() => {
                    approvePost(selectedPost.id);
                    setShowModal(false);
                  }}
                  style={{ background: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                >
                  <CheckOutlined /> Phê duyệt
                </Button>
                <Button
                  danger
                  onClick={() => {
                    const reason = prompt(
                      "Nhập lý do từ chối bài đăng:",
                      "Nội dung không phù hợp với tiêu chuẩn cộng đồng",
                    );
                    if (reason !== null) {
                      rejectPost(selectedPost.id, reason);
                      setShowModal(false);
                    }
                  }}
                >
                  <CloseOutlined /> Từ chối
                </Button>
              </>
            )}
            <Button onClick={() => setShowModal(false)}>Đóng</Button>
          </div>
        }
        width={800}
      >
        {selectedPost && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div>
                  <h5 style={{ margin: 0 }}>{selectedPost.organization}</h5>
                  <span style={{ color: "#8c8c8c" }}>
                    <CalendarOutlined style={{ marginRight: 4 }} />
                    Đăng lúc: {formatDate(selectedPost.publishDate)}
                  </span>
                </div>
              </div>
              <Badge
                color={selectedPost.featured ? "gold" : "gray"}
                text={selectedPost.featured ? "Bài đăng nổi bật" : "Bài đăng thường"}
              />
            </div>

            <h4 style={{ marginBottom: 16 }}>{selectedPost.title}</h4>

            <div style={{ marginBottom: 16 }}>
              <img
                src={selectedPost.image || "/placeholder.svg"}
                alt={selectedPost.title}
                style={{ width: "80%", maxHeight: "300px", borderRadius: 8 }}
              />
            </div>

            <div style={{ marginBottom: 16 }} dangerouslySetInnerHTML={{ __html: selectedPost.content }} />

            <div style={{ background: "#f5f5f5", padding: 16, borderRadius: 8, marginBottom: 16 }}>
              <h6 style={{ marginBottom: 8 }}>Thông tin sự kiện:</h6>
              <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <CalendarOutlined style={{ marginRight: 8, color: "#8c8c8c" }} />
                <span>Ngày diễn ra: {formatDate(selectedPost.eventDate)}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <EnvironmentOutlined style={{ marginRight: 8, color: "#8c8c8c" }} />
                <span>Địa điểm: {selectedPost.eventLocation.fullAddress}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                <span>Trạng thái duyệt: {getStatusBadge(selectedPost.status)}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <Badge color="gray" text={`ID: ${selectedPost.id}`} />
            </div>

            {selectedPost.adminStatus === "rejected" && selectedPost.moderationNotes && (
              <Alert
                message="Lý do từ chối:"
                description={selectedPost.moderationNotes}
                type="error"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}

            {selectedPost.adminStatus === "pending" && (
              <Alert
                message="Ghi chú kiểm duyệt:"
                description={selectedPost.moderationNotes || "Không có ghi chú kiểm duyệt."}
                type="warning"
                showIcon
                style={{ marginBottom: 16 }}
              />
            )}
          </div>
        )}
      </Modal>

      <Modal
        title="Lọc nâng cao"
        visible={showFilterModal}
        onCancel={() => setShowFilterModal(false)}
        footer={
          <div>
            <Button onClick={() => setShowFilterModal(false)}>Hủy</Button>
            <Button
              type="primary"
              onClick={handleFilterApply}
              style={{ background: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
            >
              Áp dụng
            </Button>
          </div>
        }
      >
        <div>
          <h6>Khoảng thời gian đăng</h6>
          <Row gutter={16}>
            <Col span={12}>
              <DatePicker
                style={{ width: "100%" }}
                value={dateRangeFilter.start ? moment(dateRangeFilter.start) : null}
                onChange={(date, dateString) => setDateRangeFilter({ ...dateRangeFilter, start: dateString })}
              />
            </Col>
            <Col span={12}>
              <DatePicker
                style={{ width: "100%" }}
                value={dateRangeFilter.end ? moment(dateRangeFilter.end) : null}
                onChange={(date, dateString) => setDateRangeFilter({ ...dateRangeFilter, end: dateString })}
              />
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default AdminVolunteerPosts;