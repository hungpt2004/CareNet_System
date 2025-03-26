"use client"

import { useState } from "react"
import { Card, Table, Button, Badge, Form, InputGroup, Row, Col, Dropdown, Modal, Image } from "react-bootstrap"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Calendar,
  MessageSquare,
  ThumbsUp,
  Share2,
  Star,
  MapPin,
} from "lucide-react"

// Sử dụng màu sắc từ AppColors.module.css
const customStyles = {
  primaryColor: "#118b50", // --color-primary
  accentColor: "#5db996", // --color-accent
  accentLightColor: "#e3f0af", // --color-accent-light
  backgroundColor: "#f6f4ef", // --color-background
}

const AdminVolunteerPosts = () => {
  // Dữ liệu mẫu về bài đăng từ tổ chức tình nguyện
  const [posts, setPosts] = useState([
    {
      id: "POST-1001",
      title: "Chiến dịch trồng cây xanh tại Cần Giờ",
      organization: "Hội Bảo vệ Môi trường Xanh",
      organizationLogo: "https://via.placeholder.com/40",
      category: "Môi trường",
      publishDate: "2023-11-20T08:30:00",
      status: "published",
      likes: 145,
      shares: 78,
      comments: 32,
      featured: true,
      content: `<p>Hội Bảo vệ Môi trường Xanh trân trọng thông báo về chiến dịch trồng cây xanh tại Khu dự trữ sinh quyển rừng ngập mặn Cần Giờ vào ngày 25/11/2023.</p>
      <p>Đây là hoạt động nằm trong khuôn khổ dự án "Vì một Việt Nam xanh" nhằm góp phần bảo vệ môi trường, chống biến đổi khí hậu và phục hồi hệ sinh thái rừng ngập mặn.</p>
      <p>Chúng tôi mong muốn kêu gọi 200 tình nguyện viên tham gia hoạt động ý nghĩa này. Các bạn sẽ được tham gia trồng cây, tìm hiểu về hệ sinh thái rừng ngập mặn và cùng nhau tham gia các hoạt động gắn kết.</p>`,
      eventDate: "2023-11-25T07:00:00",
      eventLocation: "Khu dự trữ sinh quyển Cần Giờ, TP. Hồ Chí Minh",
      image: "https://via.placeholder.com/800x400",
      moderationNotes: "",
    },
    {
      id: "POST-1002",
      title: "Chương trình tặng sách cho trẻ em vùng cao",
      organization: "Tình nguyện vì Trẻ em",
      organizationLogo: "https://via.placeholder.com/40",
      category: "Giáo dục",
      publishDate: "2023-11-18T10:15:00",
      status: "published",
      likes: 210,
      shares: 120,
      comments: 45,
      featured: false,
      content: `<p>Tổ chức Tình nguyện vì Trẻ em phát động chương trình "Mang tri thức đến vùng cao" với mục tiêu quyên góp 5000 đầu sách cho các em học sinh tại các trường học vùng cao của tỉnh Lào Cai.</p>
      <p>Chúng tôi kêu gọi mọi người cùng chung tay đóng góp sách giáo khoa, sách tham khảo, truyện thiếu nhi và các loại sách bổ ích khác để giúp các em có thêm nguồn tài liệu học tập.</p>
      <p>Ngoài ra, chúng tôi cũng tổ chức chuyến đi tình nguyện để trực tiếp trao tặng sách và tổ chức các hoạt động vui chơi, giáo dục cho các em nhỏ.</p>`,
      eventDate: "2023-12-10T08:00:00",
      eventLocation: "Các trường học tại huyện Sa Pa và Bắc Hà, tỉnh Lào Cai",
      image: "https://via.placeholder.com/800x400",
      moderationNotes: "",
    },
    {
      id: "POST-1003",
      title: "Khám bệnh miễn phí cho người dân tại Quảng Nam",
      organization: "Hỗ trợ Y tế Cộng đồng",
      organizationLogo: "https://via.placeholder.com/40",
      category: "Y tế",
      publishDate: "2023-11-15T09:45:00",
      status: "pending",
      likes: 0,
      shares: 0,
      comments: 0,
      featured: false,
      content: `<p>Tổ chức Hỗ trợ Y tế Cộng đồng sẽ tổ chức chương trình khám bệnh miễn phí cho người dân tại huyện Nam Trà My, tỉnh Quảng Nam từ ngày 01/12 đến 03/12/2023.</p>
      <p>Chương trình dự kiến sẽ khám và phát thuốc miễn phí cho khoảng 500 người dân có hoàn cảnh khó khăn, người già, trẻ em và các đối tượng chính sách.</p>
      <p>Các bác sĩ tình nguyện sẽ thực hiện khám tổng quát, khám chuyên khoa và tư vấn sức khỏe cho người dân. Đồng thời, chúng tôi cũng tổ chức các buổi tuyên truyền về vệ sinh, phòng chống dịch bệnh và chăm sóc sức khỏe cộng đồng.</p>`,
      eventDate: "2023-12-01T08:00:00",
      eventLocation: "Trạm y tế xã Trà Mai, huyện Nam Trà My, tỉnh Quảng Nam",
      image: "https://via.placeholder.com/800x400",
      moderationNotes: "Cần xác minh thông tin về đội ngũ y tế tham gia và giấy phép tổ chức khám chữa bệnh",
    },
    {
      id: "POST-1004",
      title: "Chương trình thăm hỏi và tặng quà cho người cao tuổi",
      organization: "Hỗ trợ Người cao tuổi",
      organizationLogo: "https://via.placeholder.com/40",
      category: "Xã hội",
      publishDate: "2023-11-10T14:20:00",
      status: "rejected",
      likes: 0,
      shares: 0,
      comments: 0,
      featured: false,
      content: `<p>Nhân dịp Tết Nguyên đán sắp tới, tổ chức Hỗ trợ Người cao tuổi tổ chức chương trình thăm hỏi và tặng quà cho các cụ già neo đơn, có hoàn cảnh khó khăn tại thành phố Cần Thơ.</p>
      <p>Chúng tôi dự kiến sẽ thăm hỏi và tặng quà cho 100 cụ già với tổng giá trị quà tặng khoảng 50 triệu đồng. Mỗi phần quà bao gồm nhu yếu phẩm, thuốc men và tiền mặt.</p>
      <p>Rất mong nhận được sự ủng hộ và đồng hành của quý vị để chương trình được thành công tốt đẹp, mang lại niềm vui và sự ấm áp cho các cụ già trong dịp Tết đến xuân về.</p>`,
      eventDate: "2024-01-25T08:30:00",
      eventLocation: "Các phường thuộc quận Ninh Kiều và Cái Răng, TP. Cần Thơ",
      image: "https://via.placeholder.com/800x400",
      moderationNotes:
        "Bài đăng chứa thông tin gây hiểu lầm về quy mô và nguồn tài trợ. Cần làm rõ nguồn gốc kinh phí và danh sách người được hỗ trợ.",
    },
    {
      id: "POST-1005",
      title: "Chiến dịch giải cứu động vật hoang dã",
      organization: "Bảo vệ Động vật Hoang dã",
      organizationLogo: "https://via.placeholder.com/40",
      category: "Động vật",
      publishDate: "2023-11-05T11:30:00",
      status: "published",
      likes: 320,
      shares: 180,
      comments: 65,
      featured: true,
      content: `<p>Tổ chức Bảo vệ Động vật Hoang dã phối hợp cùng Chi cục Kiểm lâm tỉnh Nghệ An tổ chức chiến dịch giải cứu và tái thả động vật hoang dã về môi trường tự nhiên.</p>
      <p>Chiến dịch sẽ tập trung vào việc giải cứu các loài động vật hoang dã bị buôn bán trái phép, nuôi nhốt trái phép tại các hộ gia đình, nhà hàng và cơ sở kinh doanh.</p>
      <p>Chúng tôi kêu gọi người dân tích cực tham gia bảo vệ động vật hoang dã bằng cách không mua bán, tiêu thụ các sản phẩm từ động vật hoang dã và thông báo cho cơ quan chức năng khi phát hiện các hành vi vi phạm.</p>`,
      eventDate: "2023-11-30T07:30:00",
      eventLocation: "Vườn Quốc gia Pù Mát, tỉnh Nghệ An",
      image: "https://via.placeholder.com/800x400",
      moderationNotes: "",
    },
  ])

  // State cho filter và search
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // State cho modal chi tiết
  const [showModal, setShowModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  // Lấy danh sách các danh mục duy nhất
  const categories = [...new Set(posts.map((post) => post.category))]

  // Lọc bài đăng dựa trên tìm kiếm và bộ lọc
  const filteredPosts = posts.filter((post) => {
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Lọc theo danh mục
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter

    // Lọc theo trạng thái
    const matchesStatus = statusFilter === "all" || post.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Lấy badge trạng thái
  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return <Badge bg="success">Đã đăng</Badge>
      case "pending":
        return <Badge bg="warning">Chờ duyệt</Badge>
      case "rejected":
        return <Badge bg="danger">Từ chối</Badge>
      case "draft":
        return <Badge bg="secondary">Bản nháp</Badge>
      default:
        return (
          <Badge bg="light" text="dark">
            Không xác định
          </Badge>
        )
    }
  }

  // Xem chi tiết bài đăng
  const viewPostDetails = (post) => {
    setSelectedPost(post)
    setShowModal(true)
  }

  // Phê duyệt bài đăng
  const approvePost = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          status: "published",
          publishDate: new Date().toISOString(),
          moderationNotes: "",
        }
      }
      return post
    })
    setPosts(updatedPosts)

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({
        ...selectedPost,
        status: "published",
        publishDate: new Date().toISOString(),
        moderationNotes: "",
      })
    }
  }

  // Từ chối bài đăng
  const rejectPost = (postId, reason = "Nội dung không phù hợp với tiêu chuẩn cộng đồng") => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          status: "rejected",
          moderationNotes: reason,
        }
      }
      return post
    })
    setPosts(updatedPosts)

    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({
        ...selectedPost,
        status: "rejected",
        moderationNotes: reason,
      })
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Quản lý bài đăng tình nguyện</h2>
        <div>
          <Button
            variant="outline-success"
            className="me-2"
            onClick={() => {
              const pendingPosts = posts.filter((post) => post.status === "pending")
              if (pendingPosts.length > 0) {
                pendingPosts.forEach((post) => approvePost(post.id))
                alert(`Đã phê duyệt ${pendingPosts.length} bài đăng đang chờ duyệt`)
              } else {
                alert("Không có bài đăng nào đang chờ duyệt")
              }
            }}
          >
            <CheckCircle size={18} className="me-2" />
            Duyệt tất cả
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
          >
            <MessageSquare size={18} className="me-2" />
            Tạo thông báo
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="mb-3">
            <Col md={6} lg={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <Search size={18} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tiêu đề, tổ chức, ID..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select
                className="w-auto"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">Tất cả danh mục</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>

              <Form.Select className="w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Tất cả trạng thái</option>
                <option value="published">Đã đăng</option>
                <option value="pending">Chờ duyệt</option>
                <option value="rejected">Từ chối</option>
                <option value="draft">Bản nháp</option>
              </Form.Select>

              <Button variant="outline-secondary">
                <Filter size={18} className="me-2" />
                Lọc nâng cao
              </Button>

              <Button variant="outline-secondary">
                <Download size={18} className="me-2" />
                Xuất dữ liệu
              </Button>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>ID</th>
                  <th>Tiêu đề</th>
                  <th>Tổ chức</th>
                  <th>Danh mục</th>
                  <th>Ngày đăng</th>
                  <th>Tương tác</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          {post.featured && (
                            <Badge bg="warning" className="me-2">
                              Nổi bật
                            </Badge>
                          )}
                          <div className="fw-medium">{post.title}</div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <img
                            src={post.organizationLogo || "/placeholder.svg"}
                            alt={post.organization}
                            className="rounded-circle me-2"
                            width="30"
                            height="30"
                          />
                          <span>{post.organization}</span>
                        </div>
                      </td>
                      <td>{post.category}</td>
                      <td>{formatDate(post.publishDate)}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <span className="d-flex align-items-center">
                            <ThumbsUp size={14} className="me-1 text-primary" />
                            {post.likes}
                          </span>
                          <span className="d-flex align-items-center">
                            <MessageSquare size={14} className="me-1 text-info" />
                            {post.comments}
                          </span>
                          <span className="d-flex align-items-center">
                            <Share2 size={14} className="me-1 text-success" />
                            {post.shares}
                          </span>
                        </div>
                      </td>
                      <td>{getStatusBadge(post.status)}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <Button variant="light" size="sm" className="border-0" onClick={() => viewPostDetails(post)}>
                            <Eye size={18} />
                          </Button>

                          {post.status === "pending" && (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                className="border-0"
                                onClick={() => approvePost(post.id)}
                              >
                                <CheckCircle size={18} />
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                className="border-0"
                                onClick={() => rejectPost(post.id)}
                              >
                                <XCircle size={18} />
                              </Button>
                            </>
                          )}

                          <Dropdown align="end">
                            <Dropdown.Toggle variant="light" size="sm" className="border-0">
                              <MoreHorizontal size={18} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item href="#edit">
                                <Edit size={16} className="me-2" />
                                Chỉnh sửa
                              </Dropdown.Item>
                              {post.status === "published" && (
                                <Dropdown.Item href="#feature" className="text-warning">
                                  <Star size={16} className="me-2" />
                                  {post.featured ? "Bỏ nổi bật" : "Đánh dấu nổi bật"}
                                </Dropdown.Item>
                              )}
                              <Dropdown.Divider />
                              <Dropdown.Item href="#delete" className="text-danger">
                                <Trash2 size={16} className="me-2" />
                                Xóa
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <p className="mb-0 text-muted">Không tìm thấy bài đăng nào phù hợp với điều kiện tìm kiếm</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-muted">
                Hiển thị {filteredPosts.length} / {posts.length} bài đăng
              </span>
            </div>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" size="sm" disabled>
                Trước
              </Button>
              <Button
                variant="primary"
                size="sm"
                style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
              >
                1
              </Button>
              <Button variant="outline-secondary" size="sm" disabled>
                Tiếp
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Modal Chi tiết bài đăng */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" backdrop="static">
        {selectedPost && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  Chi tiết bài đăng
                  <div className="ms-2">{getStatusBadge(selectedPost.status)}</div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      src={selectedPost.organizationLogo || "/placeholder.svg"}
                      alt={selectedPost.organization}
                      className="rounded-circle me-2"
                      width="40"
                      height="40"
                    />
                    <div>
                      <h5 className="mb-0">{selectedPost.organization}</h5>
                      <small className="text-muted">
                        <Calendar size={14} className="me-1" />
                        Đăng lúc: {formatDate(selectedPost.publishDate)}
                      </small>
                    </div>
                  </div>
                  <Badge
                    bg={selectedPost.featured ? "warning" : "light"}
                    text={selectedPost.featured ? "dark" : "dark"}
                  >
                    {selectedPost.featured ? "Bài đăng nổi bật" : "Bài đăng thường"}
                  </Badge>
                </div>

                <h4 className="mb-3">{selectedPost.title}</h4>

                <div className="mb-3">
                  <Image
                    src={selectedPost.image || "/placeholder.svg"}
                    alt={selectedPost.title}
                    fluid
                    className="rounded mb-3"
                  />
                </div>

                <div className="post-content mb-4" dangerouslySetInnerHTML={{ __html: selectedPost.content }}></div>

                <div className="bg-light p-3 rounded mb-3">
                  <h6 className="mb-2">Thông tin sự kiện:</h6>
                  <div className="d-flex align-items-center mb-2">
                    <Calendar size={16} className="me-2 text-muted" />
                    <span>Ngày diễn ra: {formatDate(selectedPost.eventDate)}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <MapPin size={16} className="me-2 text-muted" />
                    <span>Địa điểm: {selectedPost.eventLocation}</span>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex gap-3">
                    <span className="d-flex align-items-center">
                      <ThumbsUp size={16} className="me-1 text-primary" />
                      {selectedPost.likes} lượt thích
                    </span>
                    <span className="d-flex align-items-center">
                      <MessageSquare size={16} className="me-1 text-info" />
                      {selectedPost.comments} bình luận
                    </span>
                    <span className="d-flex align-items-center">
                      <Share2 size={16} className="me-1 text-success" />
                      {selectedPost.shares} lượt chia sẻ
                    </span>
                  </div>
                  <Badge bg="secondary">ID: {selectedPost.id}</Badge>
                </div>

                {selectedPost.status === "rejected" && selectedPost.moderationNotes && (
                  <div className="alert alert-danger">
                    <h6 className="alert-heading">Lý do từ chối:</h6>
                    <p className="mb-0">{selectedPost.moderationNotes}</p>
                  </div>
                )}

                {selectedPost.status === "pending" && (
                  <div className="alert alert-warning">
                    <h6 className="alert-heading">Ghi chú kiểm duyệt:</h6>
                    <p className="mb-0">{selectedPost.moderationNotes || "Không có ghi chú kiểm duyệt."}</p>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              {selectedPost.status === "pending" && (
                <>
                  <Button
                    variant="success"
                    onClick={() => {
                      approvePost(selectedPost.id)
                      setShowModal(false)
                    }}
                  >
                    <CheckCircle size={16} className="me-2" />
                    Phê duyệt
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      const reason = prompt(
                        "Nhập lý do từ chối bài đăng:",
                        "Nội dung không phù hợp với tiêu chuẩn cộng đồng",
                      )
                      if (reason !== null) {
                        rejectPost(selectedPost.id, reason)
                        setShowModal(false)
                      }
                    }}
                  >
                    <XCircle size={16} className="me-2" />
                    Từ chối
                  </Button>
                </>
              )}
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
              <Button
                variant="primary"
                style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
              >
                <Edit size={16} className="me-2" />
                Chỉnh sửa
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  )
}

export default AdminVolunteerPosts

