"use client"

import { useState, useEffect } from "react"
import { Card, Table, Button, Badge, Form, InputGroup, Row, Col, Dropdown, Modal, Tabs, Tab, Alert, ProgressBar } from "react-bootstrap"
import { Search, Filter, Download, CheckCircle, XCircle, Calendar, Clock, MapPin, Users, ThumbsUp, ThumbsDown, Eye, MoreHorizontal, FileText, Send, Mail, Phone, User, Info, AlertTriangle, CheckSquare, Trash2, MessageSquare } from 'lucide-react'
import { useToast } from "../../components/toast/ToastNotification"

// Sử dụng màu sắc từ AppColors.module.css
const customStyles = {
  primaryColor: "#118b50", // --color-primary
  accentColor: "#5db996", // --color-accent
  accentLightColor: "#e3f0af", // --color-accent-light
  backgroundColor: "#f6f4ef", // --color-background
}

const OrganizationUserRequests = () => {
  // Sử dụng toast
  const { showSuccess, showError, showWarning, showInfo } = useToast()

  // Dữ liệu mẫu về các sự kiện thiện nguyện
  const [events, setEvents] = useState([
    {
      id: "EVT-1001",
      name: "Chiến dịch trồng cây xanh tại Cần Giờ",
      organization: "Hội Bảo vệ Môi trường Xanh",
      date: "2023-11-25T07:00:00",
      location: "Khu dự trữ sinh quyển Cần Giờ, TP. Hồ Chí Minh",
      registeredCount: 200,
      pendingCount: 15,
      approvedCount: 180,
      rejectedCount: 5,
      status: "upcoming",
      description: "Chiến dịch trồng cây xanh nhằm phục hồi hệ sinh thái rừng ngập mặn và nâng cao nhận thức cộng đồng về bảo vệ môi trường.",
      maxParticipants: 250,
      requirements: ["Sức khỏe tốt", "Có thể làm việc ngoài trời", "Mang theo nước uống"],
      skills: ["Trồng cây", "Chăm sóc cây", "Bảo vệ môi trường"]
    },
    {
      id: "EVT-1002",
      name: "Chương trình tặng sách cho trẻ em vùng cao",
      organization: "Tình nguyện vì Trẻ em",
      date: "2023-12-10T08:00:00",
      location: "Các trường học tại huyện Sa Pa và Bắc Hà, tỉnh Lào Cai",
      registeredCount: 120,
      pendingCount: 20,
      approvedCount: 100,
      rejectedCount: 0,
      status: "upcoming",
      description: "Chương trình tặng sách nhằm cung cấp tài liệu học tập cho các em học sinh vùng cao, góp phần nâng cao chất lượng giáo dục.",
      maxParticipants: 150,
      requirements: ["Yêu thích trẻ em", "Kiên nhẫn", "Có thể di chuyển đến vùng cao"],
      skills: ["Giáo dục", "Tiếng dân tộc", "Tổ chức hoạt động"]
    },
    {
      id: "EVT-1003",
      name: "Khám bệnh miễn phí cho người dân tại Quảng Nam",
      organization: "Hỗ trợ Y tế Cộng đồng",
      date: "2023-12-01T08:00:00",
      location: "Trạm y tế xã Trà Mai, huyện Nam Trà My, tỉnh Quảng Nam",
      registeredCount: 50,
      pendingCount: 15,
      approvedCount: 35,
      rejectedCount: 0,
      status: "upcoming",
      description: "Chương trình khám bệnh miễn phí cho người dân có hoàn cảnh khó khăn tại vùng sâu vùng xa của tỉnh Quảng Nam.",
      maxParticipants: 60,
      requirements: ["Kiến thức y tế", "Kỹ năng giao tiếp tốt", "Có thể làm việc trong điều kiện cơ sở vật chất hạn chế"],
      skills: ["Y tế", "Sơ cứu", "Tư vấn sức khỏe"]
    },
    {
      id: "EVT-1004",
      name: "Chương trình thăm hỏi và tặng quà cho người cao tuổi",
      organization: "Hỗ trợ Người cao tuổi",
      date: "2024-01-25T08:30:00",
      location: "Các phường thuộc quận Ninh Kiều và Cái Răng, TP. Cần Thơ",
      registeredCount: 80,
      pendingCount: 20,
      approvedCount: 60,
      rejectedCount: 0,
      status: "upcoming",
      description: "Chương trình thăm hỏi và tặng quà cho người cao tuổi có hoàn cảnh khó khăn nhân dịp Tết Nguyên đán.",
      maxParticipants: 100,
      requirements: ["Tôn trọng người cao tuổi", "Kiên nhẫn", "Kỹ năng giao tiếp tốt"],
      skills: ["Chăm sóc người cao tuổi", "Tâm lý học", "Tổ chức sự kiện"]
    }
  ])

  // Dữ liệu mẫu về các yêu cầu đăng ký
  const [requests, setRequests] = useState([
    // Sự kiện EVT-1001
    {
      id: "REQ-1001",
      eventId: "EVT-1001",
      userId: "USR-1001",
      name: "Nguyễn Văn An",
      email: "an.nguyen@example.com",
      phone: "0901234567",
      age: 28,
      gender: "Nam",
      address: "123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh",
      requestDate: "2023-11-10T10:30:00",
      status: "pending",
      approvedDate: null,
      rejectedDate: null,
      rejectionReason: null,
      notes: "",
      skills: ["Trồng cây", "Sơ cứu cơ bản"],
      experience: "Đã tham gia 3 sự kiện trồng cây trước đây",
      motivation: "Tôi muốn góp phần bảo vệ môi trường và hệ sinh thái rừng ngập mặn.",
      emergencyContact: "Nguyễn Thị Hoa - 0912345678",
      availability: ["Thứ 7", "Chủ nhật"],
      previousEvents: 3
    },
    {
      id: "REQ-1002",
      eventId: "EVT-1001",
      userId: "USR-1002",
      name: "Trần Thị Bình",
      email: "binh.tran@example.com",
      phone: "0912345678",
      age: 35,
      gender: "Nữ",
      address: "456 Lê Văn Lương, Quận 7, TP. Hồ Chí Minh",
      requestDate: "2023-11-11T14:20:00",
      status: "approved",
      approvedDate: "2023-11-12T09:15:00",
      rejectedDate: null,
      rejectionReason: null,
      notes: "Có kinh nghiệm về trồng cây",
      skills: ["Chụp ảnh", "Truyền thông", "Trồng cây"],
      experience: "Làm việc tại công ty cây xanh 5 năm",
      motivation: "Muốn đóng góp chuyên môn vào việc bảo vệ môi trường",
      emergencyContact: "Trần Văn Nam - 0923456789",
      availability: ["Thứ 6", "Thứ 7", "Chủ nhật"],
      previousEvents: 5
    },
    {
      id: "REQ-1003",
      eventId: "EVT-1001",
      userId: "USR-1003",
      name: "Lê Văn Cường",
      email: "cuong.le@example.com",
      phone: "0923456789",
      age: 42,
      gender: "Nam",
      address: "789 Nguyễn Hữu Thọ, Quận 7, TP. Hồ Chí Minh",
      requestDate: "2023-11-12T09:15:00",
      status: "rejected",
      approvedDate: null,
      rejectedDate: "2023-11-13T16:40:00",
      rejectionReason: "Không đáp ứng đủ yêu cầu về thời gian tham gia",
      notes: "",
      skills: ["Lái xe", "Hậu cần"],
      experience: "Chưa có kinh nghiệm trồng cây",
      motivation: "Muốn tham gia hoạt động cộng đồng",
      emergencyContact: "Lê Thị Mai - 0934567890",
      availability: ["Chủ nhật"],
      previousEvents: 0
    },
    {
      id: "REQ-1004",
      eventId: "EVT-1001",
      userId: "USR-1004",
      name: "Phạm Thị Dung",
      email: "dung.pham@example.com",
      phone: "0934567890",
      age: 23,
      gender: "Nữ",
      address: "101 Nguyễn Thị Thập, Quận 7, TP. Hồ Chí Minh",
      requestDate: "2023-11-13T16:40:00",
      status: "pending",
      approvedDate: null,
      rejectedDate: null,
      rejectionReason: null,
      notes: "",
      skills: ["Giáo dục môi trường", "Tiếng Anh"],
      experience: "Sinh viên ngành Môi trường",
      motivation: "Muốn áp dụng kiến thức đã học vào thực tế",
      emergencyContact: "Phạm Văn Hùng - 0945678901",
      availability: ["Thứ 6", "Thứ 7", "Chủ nhật"],
      previousEvents: 1
    },
    // Sự kiện EVT-1002
    {
      id: "REQ-2001",
      eventId: "EVT-1002",
      userId: "USR-2001",
      name: "Lý Thị Hoa",
      email: "hoa.ly@example.com",
      phone: "0956789012",
      age: 27,
      gender: "Nữ",
      address: "303 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh",
      requestDate: "2023-11-20T08:30:00",
      status: "pending",
      approvedDate: null,
      rejectedDate: null,
      rejectionReason: null,
      notes: "",
      skills: ["Giáo dục", "Kể chuyện"],
      experience: "Giáo viên tiểu học 3 năm",
      motivation: "Muốn giúp đỡ trẻ em vùng cao tiếp cận với sách vở",
      emergencyContact: "Lý Văn Minh - 0967890123",
      availability: ["Thứ 7", "Chủ nhật"],
      previousEvents: 2
    },
    {
      id: "REQ-2002",
      eventId: "EVT-1002",
      userId: "USR-2002",
      name: "Vũ Đình Hùng",
      email: "hung.vu@example.com",
      phone: "0967890123",
      age: 45,
      gender: "Nam",
      address: "404 Lê Lợi, Quận 1, TP. Hồ Chí Minh",
      requestDate: "2023-11-21T13:45:00",
      status: "approved",
      approvedDate: "2023-11-22T10:15:00",
      rejectedDate: null,
      rejectionReason: null,
      notes: "Có xe bán tải, có thể hỗ trợ vận chuyển sách",
      skills: ["Lái xe", "Hậu cần", "Sơ cứu"],
      experience: "Đã tham gia nhiều chương trình từ thiện",
      motivation: "Muốn đóng góp công sức cho cộng đồng",
      emergencyContact: "Vũ Thị Hương - 0978901234",
      availability: ["Thứ 6", "Thứ 7", "Chủ nhật"],
      previousEvents: 10
    },
    // Sự kiện EVT-1003
    {
      id: "REQ-3001",
      eventId: "EVT-1003",
      userId: "USR-3001",
      name: "Đỗ Thị Hương",
      email: "huong.do@example.com",
      phone: "0978901234",
      age: 32,
      gender: "Nữ",
      address: "505 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      requestDate: "2023-11-15T09:45:00",
      status: "pending",
      approvedDate: null,
      rejectedDate: null,
      rejectionReason: null,
      notes: "",
      skills: ["Y tá", "Sơ cứu", "Tiêm chủng"],
      experience: "Y tá công tác tại bệnh viện 5 năm",
      motivation: "Muốn giúp đỡ người dân vùng sâu vùng xa tiếp cận dịch vụ y tế",
      emergencyContact: "Đỗ Văn Minh - 0989012345",
      availability: ["Thứ 7", "Chủ nhật"],
      previousEvents: 4
    },
    {
      id: "REQ-3002",
      eventId: "EVT-1003",
      userId: "USR-3002",
      name: "Nguyễn Văn Bình",
      email: "binh.nguyen@example.com",
      phone: "0989012345",
      age: 40,
      gender: "Nam",
      address: "606 Bạch Đằng, Quận Bình Thạnh, TP. Hồ Chí Minh",
      requestDate: "2023-11-16T14:30:00",
      status: "approved",
      approvedDate: "2023-11-17T10:20:00",
      rejectedDate: null,
      rejectionReason: null,
      notes: "Bác sĩ đa khoa",
      skills: ["Bác sĩ", "Khám bệnh", "Tư vấn sức khỏe"],
      experience: "Bác sĩ đa khoa 10 năm kinh nghiệm",
      motivation: "Muốn đem kiến thức y khoa phục vụ cộng đồng",
      emergencyContact: "Nguyễn Thị Lan - 0990123456",
      availability: ["Thứ 7", "Chủ nhật"],
      previousEvents: 8
    }
  ])

  // State cho filter và search
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedEventId, setSelectedEventId] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState(null)

  // State cho modal chi tiết
  const [showModal, setShowModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [rejectionReason, setRejectionReason] = useState("")
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [showBulkActionModal, setShowBulkActionModal] = useState(false)
  const [bulkAction, setBulkAction] = useState("")
  const [selectedRequests, setSelectedRequests] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [messageText, setMessageText] = useState("")

  // Cập nhật sự kiện đã chọn khi selectedEventId thay đổi
  useEffect(() => {
    if (selectedEventId && selectedEventId !== "all") {
      const event = events.find(event => event.id === selectedEventId)
      setSelectedEvent(event)
    } else {
      setSelectedEvent(null)
    }
  }, [selectedEventId, events])

  // Lọc yêu cầu dựa trên sự kiện đã chọn, tìm kiếm và bộ lọc
  const filteredRequests = requests.filter(request => {
    // Lọc theo sự kiện đã chọn
    if (selectedEventId !== "all" && request.eventId !== selectedEventId) {
      return false
    }
    
    // Lọc theo từ khóa tìm kiếm
    const matchesSearch = 
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (request.address && request.address.toLowerCase().includes(searchTerm.toLowerCase()))
    
    // Lọc theo trạng thái
    const matchesStatus = 
      statusFilter === "all" || 
      request.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  // Xử lý thay đổi tìm kiếm
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // Xem chi tiết yêu cầu
  const viewRequestDetails = (request) => {
    setSelectedRequest(request)
    setShowModal(true)
  }

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    return new Date(dateString).toLocaleDateString('vi-VN', options)
  }

  // Lấy badge trạng thái yêu cầu
  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <Badge bg="success">Đã duyệt</Badge>
      case "pending":
        return <Badge bg="warning">Chờ duyệt</Badge>
      case "rejected":
        return <Badge bg="danger">Từ chối</Badge>
      default:
        return <Badge bg="light" text="dark">Không xác định</Badge>
    }
  }

  // Lấy badge trạng thái sự kiện
  const getEventStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return <Badge bg="info">Sắp diễn ra</Badge>
      case "ongoing":
        return <Badge bg="success">Đang diễn ra</Badge>
      case "completed":
        return <Badge bg="secondary">Đã hoàn thành</Badge>
      default:
        return <Badge bg="light" text="dark">Không xác định</Badge>
    }
  }

  // Duyệt yêu cầu
  const approveRequest = (requestId) => {
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        // Cập nhật trạng thái yêu cầu
        return {
          ...request,
          status: "approved",
          approvedDate: new Date().toISOString(),
          rejectedDate: null,
          rejectionReason: null
        }
      }
      return request
    })
    
    setRequests(updatedRequests)
    
    // Cập nhật số lượng trong sự kiện
    const request = requests.find(r => r.id === requestId)
    if (request) {
      const updatedEvents = events.map(event => {
        if (event.id === request.eventId) {
          // Nếu trạng thái trước đó là pending
          if (request.status === "pending") {
            return {
              ...event,
              pendingCount: event.pendingCount - 1,
              approvedCount: event.approvedCount + 1
            }
          }
          // Nếu trạng thái trước đó là rejected
          else if (request.status === "rejected") {
            return {
              ...event,
              rejectedCount: event.rejectedCount - 1,
              approvedCount: event.approvedCount + 1
            }
          }
          return event
        }
        return event
      })
      setEvents(updatedEvents)
    }
    
    showSuccess("Đã duyệt yêu cầu thành công")
    
    // Nếu đang xem chi tiết, cập nhật thông tin
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest({
        ...selectedRequest,
        status: "approved",
        approvedDate: new Date().toISOString(),
        rejectedDate: null,
        rejectionReason: null
      })
    }
  }

  // Từ chối yêu cầu
  const rejectRequest = (requestId, reason) => {
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        // Cập nhật trạng thái yêu cầu
        return {
          ...request,
          status: "rejected",
          approvedDate: null,
          rejectedDate: new Date().toISOString(),
          rejectionReason: reason
        }
      }
      return request
    })
    
    setRequests(updatedRequests)
    
    // Cập nhật số lượng trong sự kiện
    const request = requests.find(r => r.id === requestId)
    if (request) {
      const updatedEvents = events.map(event => {
        if (event.id === request.eventId) {
          // Nếu trạng thái trước đó là pending
          if (request.status === "pending") {
            return {
              ...event,
              pendingCount: event.pendingCount - 1,
              rejectedCount: event.rejectedCount + 1
            }
          }
          // Nếu trạng thái trước đó là approved
          else if (request.status === "approved") {
            return {
              ...event,
              approvedCount: event.approvedCount - 1,
              rejectedCount: event.rejectedCount + 1
            }
          }
          return event
        }
        return event
      })
      setEvents(updatedEvents)
    }
    
    showWarning("Đã từ chối yêu cầu")
    
    // Nếu đang xem chi tiết, cập nhật thông tin
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest({
        ...selectedRequest,
        status: "rejected",
        approvedDate: null,
        rejectedDate: new Date().toISOString(),
        rejectionReason: reason
      })
    }
  }

  // Mở modal từ chối
  const openRejectModal = (request) => {
    setSelectedRequest(request)
    setRejectionReason("")
    setShowRejectModal(true)
  }

  // Xử lý từ chối yêu cầu
  const handleReject = () => {
    if (selectedRequest) {
      rejectRequest(selectedRequest.id, rejectionReason)
      setShowRejectModal(false)
    }
  }

  // Xử lý chọn/bỏ chọn tất cả
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(filteredRequests.map(request => request.id))
    }
    setSelectAll(!selectAll)
  }

  // Xử lý chọn/bỏ chọn một yêu cầu
  const handleSelectRequest = (requestId) => {
    if (selectedRequests.includes(requestId)) {
      setSelectedRequests(selectedRequests.filter(id => id !== requestId))
    } else {
      setSelectedRequests([...selectedRequests, requestId])
    }
  }

  // Mở modal hành động hàng loạt
  const openBulkActionModal = (action) => {
    if (selectedRequests.length === 0) {
      showWarning("Vui lòng chọn ít nhất một yêu cầu")
      return
    }
    
    setBulkAction(action)
    setShowBulkActionModal(true)
  }

  // Xử lý hành động hàng loạt
  const handleBulkAction = () => {
    if (bulkAction === "approve") {
      // Duyệt hàng loạt
      selectedRequests.forEach(requestId => {
        const request = requests.find(r => r.id === requestId)
        if (request && request.status === "pending") {
          approveRequest(requestId)
        }
      })
      showSuccess(`Đã duyệt ${selectedRequests.length} yêu cầu`)
    } else if (bulkAction === "reject") {
      // Từ chối hàng loạt
      selectedRequests.forEach(requestId => {
        const request = requests.find(r => r.id === requestId)
        if (request && request.status === "pending") {
          rejectRequest(requestId, rejectionReason)
        }
      })
      showWarning(`Đã từ chối ${selectedRequests.length} yêu cầu`)
    }
    
    setShowBulkActionModal(false)
    setSelectedRequests([])
    setSelectAll(false)
  }

  // Mở modal gửi tin nhắn
  const openMessageModal = () => {
    if (selectedRequests.length === 0) {
      showWarning("Vui lòng chọn ít nhất một yêu cầu")
      return
    }
    
    setMessageText("")
    setShowMessageModal(true)
  }

  // Xử lý gửi tin nhắn
  const handleSendMessage = () => {
    if (!messageText.trim()) {
      showWarning("Vui lòng nhập nội dung tin nhắn")
      return
    }
    
    // Trong thực tế, đây sẽ là chức năng gửi tin nhắn
    showSuccess(`Đã gửi tin nhắn đến ${selectedRequests.length} người`)
    setShowMessageModal(false)
  }

  // Xuất dữ liệu
  const exportData = () => {
    showSuccess("Đã xuất dữ liệu thành công")
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Quản lý yêu cầu đăng ký sự kiện</h2>
        <div>
          <Button 
            variant="outline-primary" 
            className="me-2"
            onClick={exportData}
          >
            <Download size={18} className="me-2" />
            Xuất dữ liệu
          </Button>
          <Button 
            variant="outline-success" 
            className="me-2"
            onClick={() => openBulkActionModal("approve")}
            disabled={selectedRequests.length === 0}
          >
            <CheckCircle size={18} className="me-2" />
            Duyệt đã chọn
          </Button>
          <Button 
            variant="outline-danger" 
            className="me-2"
            onClick={() => openBulkActionModal("reject")}
            disabled={selectedRequests.length === 0}
          >
            <XCircle size={18} className="me-2" />
            Từ chối đã chọn
          </Button>
          <Button 
            variant="primary" 
            style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
            onClick={openMessageModal}
            disabled={selectedRequests.length === 0}
          >
            <MessageSquare size={18} className="me-2" />
            Gửi tin nhắn
          </Button>
        </div>
      </div>

      {/* Chọn sự kiện */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-3">Chọn sự kiện</h5>
          <Row>
            <Col md={6}>
              <Form.Select 
                value={selectedEventId} 
                onChange={(e) => setSelectedEventId(e.target.value)}
                className="mb-3"
              >
                <option value="all">Tất cả sự kiện</option>
                <optgroup label="Sự kiện sắp diễn ra">
                  {events.filter(event => event.status === "upcoming").map(event => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                  ))}
                </optgroup>
                <optgroup label="Sự kiện đang diễn ra">
                  {events.filter(event => event.status === "ongoing").map(event => (
                    <option key={event.id} value={event.id}>{event.name}</option>
                  ))}
                </optgroup>
              </Form.Select>
            </Col>
          </Row>

          {selectedEvent && (
            <div className="bg-light p-3 rounded">
              <Row>
                <Col md={6}>
                  <div className="mb-2 d-flex align-items-center">
                    <Calendar size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Ngày diễn ra:</strong> {formatDate(selectedEvent.date)}
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <MapPin size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Địa điểm:</strong> {selectedEvent.location}
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-2 d-flex align-items-center">
                    <Users size={18} className="me-2 text-muted" />
                    <div>
                      <strong>Số người đăng ký:</strong> {selectedEvent.registeredCount}/{selectedEvent.maxParticipants}
                    </div>
                  </div>
                  <div className="mb-2 d-flex align-items-center">
                    <div className="d-flex flex-column w-100">
                      <div className="d-flex justify-content-between mb-1">
                        <span>
                          <ThumbsUp size={16} className="me-1 text-success" /> Đã duyệt: {selectedEvent.approvedCount}
                        </span>
                        <span>
                          <Clock size={16} className="me-1 text-warning" /> Chờ duyệt: {selectedEvent.pendingCount}
                        </span>
                        <span>
                          <ThumbsDown size={16} className="me-1 text-danger" /> Từ chối: {selectedEvent.rejectedCount}
                        </span>
                      </div>
                      <ProgressBar className="mt-1">
                        <ProgressBar 
                          variant="success" 
                          now={(selectedEvent.approvedCount / selectedEvent.maxParticipants) * 100} 
                          key={1} 
                        />
                        <ProgressBar 
                          variant="warning" 
                          now={(selectedEvent.pendingCount / selectedEvent.maxParticipants) * 100} 
                          key={2} 
                        />
                        <ProgressBar 
                          variant="danger" 
                          now={(selectedEvent.rejectedCount / selectedEvent.maxParticipants) * 100} 
                          key={3} 
                        />
                      </ProgressBar>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="mt-2 text-end">
                <span className="me-2">{getEventStatusBadge(selectedEvent.status)}</span>
                <span className="text-muted">ID: {selectedEvent.id}</span>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Danh sách yêu cầu */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-3">Danh sách yêu cầu đăng ký</h5>
          <Row className="mb-3">
            <Col md={6} lg={4}>
              <InputGroup>
                <InputGroup.Text className="bg-light">
                  <Search size={18} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Tìm kiếm theo tên, email, số điện thoại..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={8} className="d-flex gap-2 mt-3 mt-md-0">
              <Form.Select 
                className="w-auto" 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ duyệt</option>
                <option value="approved">Đã duyệt</option>
                <option value="rejected">Từ chối</option>
              </Form.Select>

              <Button variant="outline-secondary">
                <Filter size={18} className="me-2" />
                Lọc nâng cao
              </Button>
            </Col>
          </Row>

          <div className="table-responsive">
            <Table hover className="align-middle">
              <thead className="bg-light">
                <tr>
                  <th>
                    <Form.Check 
                      type="checkbox" 
                      checked={selectAll} 
                      onChange={handleSelectAll}
                      label=""
                    />
                  </th>
                  <th>ID</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  {selectedEventId === "all" && <th>Sự kiện</th>}
                  <th>Ngày đăng ký</th>
                  <th>Kỹ năng</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <Form.Check 
                          type="checkbox" 
                          checked={selectedRequests.includes(request.id)} 
                          onChange={() => handleSelectRequest(request.id)}
                          label=""
                        />
                      </td>
                      <td>{request.id}</td>
                      <td className="fw-medium">{request.name}</td>
                      <td>{request.email}</td>
                      <td>{request.phone}</td>
                      {selectedEventId === "all" && (
                        <td>
                          {events.find(event => event.id === request.eventId)?.name || "N/A"}
                        </td>
                      )}
                      <td>{formatDate(request.requestDate)}</td>
                      <td>
                        {request.skills && request.skills.length > 0 ? (
                          <div className="d-flex flex-wrap gap-1">
                            {request.skills.slice(0, 2).map((skill, index) => (
                              <Badge key={index} bg="light" text="dark" className="border">
                                {skill}
                              </Badge>
                            ))}
                            {request.skills.length > 2 && (
                              <Badge bg="light" text="dark" className="border">
                                +{request.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted">Không có</span>
                        )}
                      </td>
                      <td>{getStatusBadge(request.status)}</td>
                      <td>
                        <div className="d-flex gap-1">
                          {request.status === "pending" && (
                            <>
                              <Button 
                                variant="success" 
                                size="sm"
                                onClick={() => approveRequest(request.id)}
                                title="Duyệt yêu cầu"
                              >
                                <CheckCircle size={18} />
                              </Button>
                              <Button 
                                variant="danger" 
                                size="sm"
                                onClick={() => openRejectModal(request)}
                                title="Từ chối yêu cầu"
                              >
                                <XCircle size={18} />
                              </Button>
                            </>
                          )}
                          
                          <Button 
                            variant="light" 
                            size="sm" 
                            className="border-0"
                            onClick={() => viewRequestDetails(request)}
                            title="Xem chi tiết"
                          >
                            <Eye size={18} />
                          </Button>
                          
                          <Dropdown align="end">
                            <Dropdown.Toggle variant="light" size="sm" className="border-0">
                              <MoreHorizontal size={18} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item onClick={() => viewRequestDetails(request)}>
                                <Eye size={16} className="me-2" />
                                Xem chi tiết
                              </Dropdown.Item>
                              {request.status === "pending" && (
                                <>
                                  <Dropdown.Item onClick={() => approveRequest(request.id)}>
                                    <CheckCircle size={16} className="me-2" />
                                    Duyệt yêu cầu
                                  </Dropdown.Item>
                                  <Dropdown.Item onClick={() => openRejectModal(request)}>
                                    <XCircle size={16} className="me-2" />
                                    Từ chối yêu cầu
                                  </Dropdown.Item>
                                </>
                              )}
                              <Dropdown.Item onClick={() => {
                                setSelectedRequest(request)
                                setMessageText("")
                                setShowMessageModal(true)
                              }}>
                                <Send size={16} className="me-2" />
                                Gửi tin nhắn
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={selectedEventId === "all" ? 10 : 9} className="text-center py-4">
                      <p className="mb-0 text-muted">Không tìm thấy yêu cầu nào phù hợp với điều kiện tìm kiếm</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div>
              <span className="text-muted">
                Hiển thị {filteredRequests.length} / {requests.length} yêu cầu
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

      {/* Modal Chi tiết yêu cầu */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" backdrop="static">
        {selectedRequest && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="d-flex align-items-center">
                  Chi tiết yêu cầu đăng ký
                  <div className="ms-2">
                    {getStatusBadge(selectedRequest.status)}
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tabs defaultActiveKey="info" className="mb-3">
                <Tab eventKey="info" title="Thông tin cá nhân">
                  <Row>
                    <Col md={6}>
                      <h5 className="mb-3">Thông tin cơ bản</h5>
                      <div className="mb-2">
                        <strong>Họ và tên:</strong> {selectedRequest.name}
                      </div>
                      <div className="mb-2">
                        <strong>Email:</strong> {selectedRequest.email}
                      </div>
                      <div className="mb-2">
                        <strong>Số điện thoại:</strong> {selectedRequest.phone}
                      </div>
                      <div className="mb-2">
                        <strong>Tuổi:</strong> {selectedRequest.age || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Giới tính:</strong> {selectedRequest.gender || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Địa chỉ:</strong> {selectedRequest.address || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Liên hệ khẩn cấp:</strong> {selectedRequest.emergencyContact || "N/A"}
                      </div>
                    </Col>
                    <Col md={6}>
                      <h5 className="mb-3">Thông tin đăng ký</h5>
                      <div className="mb-2">
                        <strong>ID:</strong> {selectedRequest.id}
                      </div>
                      <div className="mb-2">
                        <strong>Sự kiện:</strong> {events.find(event => event.id === selectedRequest.eventId)?.name || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Ngày đăng ký:</strong> {formatDate(selectedRequest.requestDate)}
                      </div>
                      <div className="mb-2">
                        <strong>Trạng thái:</strong>{" "}
                        {selectedRequest.status === "approved" 
                          ? "Đã duyệt" 
                          : selectedRequest.status === "pending" 
                            ? "Chờ duyệt" 
                            : "Từ chối"}
                      </div>
                      {selectedRequest.approvedDate && (
                        <div className="mb-2">
                          <strong>Ngày duyệt:</strong> {formatDate(selectedRequest.approvedDate)}
                        </div>
                      )}
                      {selectedRequest.rejectedDate && (
                        <div className="mb-2">
                          <strong>Ngày từ chối:</strong> {formatDate(selectedRequest.rejectedDate)}
                        </div>
                      )}
                      {selectedRequest.rejectionReason && (
                        <div className="mb-2">
                          <strong>Lý do từ chối:</strong> {selectedRequest.rejectionReason}
                        </div>
                      )}
                    </Col>
                  </Row>

                  <hr className="my-3" />

                  <Row>
                    <Col md={6}>
                      <h5 className="mb-3">Kỹ năng và kinh nghiệm</h5>
                      {selectedRequest.skills && selectedRequest.skills.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {selectedRequest.skills.map((skill, index) => (
                            <Badge key={index} bg="light" text="dark" className="py-2 px-3 border">
                              <CheckCircle size={14} className="me-1 text-success" />
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted">Không có kỹ năng nào được đề cập</p>
                      )}
                      <div className="mb-2">
                        <strong>Kinh nghiệm:</strong> {selectedRequest.experience || "Không có"}
                      </div>
                      <div className="mb-2">
                        <strong>Số sự kiện đã tham gia:</strong> {selectedRequest.previousEvents || 0}
                      </div>
                    </Col>
                    <Col md={6}>
                      <h5 className="mb-3">Thông tin bổ sung</h5>
                      <div className="mb-2">
                        <strong>Động lực tham gia:</strong>
                        <p className="bg-light p-2 rounded mt-1 mb-2">
                          {selectedRequest.motivation || "Không có thông tin"}
                        </p>
                      </div>
                      <div className="mb-2">
                        <strong>Thời gian có thể tham gia:</strong>{" "}
                        {selectedRequest.availability && selectedRequest.availability.length > 0 
                          ? selectedRequest.availability.join(", ") 
                          : "Không có thông tin"}
                      </div>
                      <div className="mb-2">
                        <strong>Ghi chú:</strong> {selectedRequest.notes || "Không có"}
                      </div>
                    </Col>
                  </Row>
                </Tab>
                <Tab eventKey="event" title="Thông tin sự kiện">
                  {(() => {
                    const event = events.find(e => e.id === selectedRequest.eventId)
                    return event ? (
                      <>
                        <h5 className="mb-3">{event.name}</h5>
                        <Row>
                          <Col md={6}>
                            <div className="mb-2">
                              <strong>Ngày diễn ra:</strong> {formatDate(event.date)}
                            </div>
                            <div className="mb-2">
                              <strong>Địa điểm:</strong> {event.location}
                            </div>
                            <div className="mb-2">
                              <strong>Tổ chức:</strong> {event.organization}
                            </div>
                            <div className="mb-2">
                              <strong>Trạng thái:</strong> {getEventStatusBadge(event.status)}
                            </div>
                          </Col>
                          <Col md={6}>
                            <div className="mb-2">
                              <strong>Số người đăng ký:</strong> {event.registeredCount}/{event.maxParticipants}
                            </div>
                            <div className="mb-2">
                              <strong>Đã duyệt:</strong> {event.approvedCount}
                            </div>
                            <div className="mb-2">
                              <strong>Chờ duyệt:</strong> {event.pendingCount}
                            </div>
                            <div className="mb-2">
                              <strong>Từ chối:</strong> {event.rejectedCount}
                            </div>
                          </Col>
                        </Row>
                        <hr className="my-3" />
                        <h5 className="mb-2">Mô tả sự kiện</h5>
                        <p className="bg-light p-3 rounded mb-4">
                          {event.description || "Không có mô tả"}
                        </p>
                        <Row>
                          <Col md={6}>
                            <h5 className="mb-2">Yêu cầu</h5>
                            {event.requirements && event.requirements.length > 0 ? (
                              <ul className="mb-3">
                                {event.requirements.map((req, index) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-muted">Không có yêu cầu cụ thể</p>
                            )}
                          </Col>
                          <Col md={6}>
                            <h5 className="mb-2">Kỹ năng cần thiết</h5>
                            {event.skills && event.skills.length > 0 ? (
                              <div className="d-flex flex-wrap gap-2 mb-3">
                                {event.skills.map((skill, index) => (
                                  <Badge key={index} bg="light" text="dark" className="py-2 px-3 border">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <p className="text-muted">Không có kỹ năng cụ thể</p>
                            )}
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <Alert variant="warning">
                        Không tìm thấy thông tin sự kiện
                      </Alert>
                    )
                  })()}
                </Tab>
              </Tabs>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                Đóng
              </Button>
              {selectedRequest.status === "pending" && (
                <>
                  <Button 
                    variant="danger"
                    onClick={() => {
                      setShowModal(false)
                      openRejectModal(selectedRequest)
                    }}
                  >
                    <XCircle size={16} className="me-2" />
                    Từ chối
                  </Button>
                  <Button 
                    variant="success"
                    onClick={() => {
                      approveRequest(selectedRequest.id)
                      setShowModal(false)
                    }}
                  >
                    <CheckCircle size={16} className="me-2" />
                    Duyệt
                  </Button>
                </>
              )}
              <Button 
                variant="primary" 
                style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                onClick={() => {
                  setShowModal(false)
                  setSelectedRequest(selectedRequest)
                  setMessageText("")
                  setShowMessageModal(true)
                }}
              >
                <Send size={16} className="me-2" />
                Gửi tin nhắn
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>

      {/* Modal Từ chối yêu cầu */}
      <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Từ chối yêu cầu đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <>
              <p>
                Bạn đang từ chối yêu cầu đăng ký của <strong>{selectedRequest.name}</strong> cho sự kiện{" "}
                <strong>{events.find(e => e.id === selectedRequest.eventId)?.name}</strong>.
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Lý do từ chối</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Nhập lý do từ chối yêu cầu..."
                />
                <Form.Text className="text-muted">
                  Lý do từ chối sẽ được gửi đến người đăng ký.
                </Form.Text>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowRejectModal(false)}>
            Hủy
          </Button>
          <Button 
            variant="danger"
            onClick={handleReject}
          >
            <XCircle size={16} className="me-2" />
            Xác nhận từ chối
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Hành động hàng loạt */}
      <Modal show={showBulkActionModal} onHide={() => setShowBulkActionModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {bulkAction === "approve" ? "Duyệt hàng loạt" : "Từ chối hàng loạt"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn đang {bulkAction === "approve" ? "duyệt" : "từ chối"} <strong>{selectedRequests.length}</strong> yêu cầu đăng ký.
          </p>
          {bulkAction === "reject" && (
            <Form.Group className="mb-3">
              <Form.Label>Lý do từ chối</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Nhập lý do từ chối yêu cầu..."
              />
              <Form.Text className="text-muted">
                Lý do từ chối sẽ được gửi đến tất cả người đăng ký bị từ chối.
              </Form.Text>
            </Form.Group>
          )}
          <Alert variant="warning">
            <AlertTriangle size={16} className="me-2" />
            Hành động này không thể hoàn tác. Vui lòng xác nhận trước khi tiếp tục.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowBulkActionModal(false)}>
            Hủy
          </Button>
          <Button 
            variant={bulkAction === "approve" ? "success" : "danger"}
            onClick={handleBulkAction}
          >
            {bulkAction === "approve" ? (
              <>
                <CheckCircle size={16} className="me-2" />
                Xác nhận duyệt
              </>
            ) : (
              <>
                <XCircle size={16} className="me-2" />
                Xác nhận từ chối
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Gửi tin nhắn */}
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Gửi tin nhắn</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Bạn đang gửi tin nhắn đến{" "}
            {selectedRequests.length > 0 
              ? <strong>{selectedRequests.length} người</strong> 
              : selectedRequest 
                ? <strong>{selectedRequest.name}</strong> 
                : "người đăng ký"}.
          </p>
          <Form.Group className="mb-3">
            <Form.Label>Nội dung tin nhắn</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Nhập nội dung tin nhắn..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowMessageModal(false)}>
            Hủy
          </Button>
          <Button 
            variant="primary"
            style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
          >
            <Send size={16} className="me-2" />
            Gửi tin nhắn
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default OrganizationUserRequests
