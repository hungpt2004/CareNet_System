"use client"

import { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Alert,
  Accordion,
  ListGroup,
  Badge,
} from "react-bootstrap"
import {
  Send,
  HelpCircle,
  Phone,
  Mail,
  MessageSquare,
  MapPin,
  FileText,
  Clock,
  ChevronRight,
  Search,
  BookOpen,
  Users,
  CheckCircle,
  Info,
} from "lucide-react"

// Custom CSS variables for the color scheme
const customStyles = {
  primaryColor: "#5DB996",
  secondaryColor: "#FBF6E9",
}

const SupportRequestPage = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    category: "",
    message: "",
    attachments: null,
    agreeTerms: false,
  })

  // State for form validation
  const [validated, setValidated] = useState(false)
  const [errors, setErrors] = useState({})

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  // Support categories
  const supportCategories = [
    { value: "general", label: "Thông tin chung" },
    { value: "courses", label: "Khóa học & Chương trình đào tạo" },
    { value: "admission", label: "Tuyển sinh & Đăng ký" },
    { value: "technical", label: "Hỗ trợ kỹ thuật" },
    { value: "financial", label: "Học phí & Tài chính" },
    { value: "other", label: "Vấn đề khác" },
  ]

  // FAQ items
  const faqItems = [
    {
      question: "Làm thế nào để đăng ký khóa học?",
      answer:
        'Để đăng ký khóa học, bạn cần truy cập vào trang "Khóa học", chọn khóa học phù hợp và nhấn nút "Đăng ký". Sau đó, làm theo hướng dẫn để hoàn tất quá trình đăng ký và thanh toán học phí.',
    },
    {
      question: "Tôi có thể thanh toán học phí bằng những phương thức nào?",
      answer:
        "Chúng tôi chấp nhận nhiều phương thức thanh toán khác nhau bao gồm: thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay, VNPay), và thanh toán trực tiếp tại văn phòng.",
    },
    {
      question: "Làm thế nào để nhận chứng chỉ sau khi hoàn thành khóa học?",
      answer:
        'Sau khi hoàn thành tất cả các yêu cầu của khóa học, chứng chỉ sẽ được cấp tự động và gửi đến email đã đăng ký của bạn. Bạn cũng có thể tải chứng chỉ từ trang "Khóa học của tôi" trong tài khoản cá nhân.',
    },
    {
      question: "Tôi có thể hủy đăng ký khóa học và được hoàn tiền không?",
      answer:
        "Bạn có thể hủy đăng ký khóa học trong vòng 7 ngày kể từ ngày đăng ký và được hoàn tiền 100% (trừ phí giao dịch). Sau thời gian này, việc hoàn tiền sẽ được xem xét theo từng trường hợp cụ thể và có thể áp dụng phí hủy.",
    },
    {
      question: "Làm thế nào để cập nhật thông tin cá nhân?",
      answer:
        'Để cập nhật thông tin cá nhân, vui lòng đăng nhập vào tài khoản, truy cập mục "Hồ sơ cá nhân" và chọn "Chỉnh sửa thông tin". Sau khi cập nhật, nhấn "Lưu thay đổi" để hoàn tất.',
    },
  ]

  // Support options
  const supportOptions = [
    {
      title: "Trung tâm trợ giúp",
      description: "Tìm câu trả lời nhanh chóng qua cơ sở kiến thức của chúng tôi",
      icon: <BookOpen size={24} />,
      link: "#help-center",
      color: "#4CAF50",
    },
    {
      title: "Hỗ trợ trực tuyến",
      description: "Chat trực tiếp với đội ngũ hỗ trợ của chúng tôi",
      icon: <MessageSquare size={24} />,
      link: "#live-chat",
      color: "#2196F3",
    },
    {
      title: "Hướng dẫn & Tài liệu",
      description: "Xem hướng dẫn chi tiết và tài liệu hỗ trợ",
      icon: <FileText size={24} />,
      link: "#guides",
      color: "#FF9800",
    },
    {
      title: "Webinar & Đào tạo",
      description: "Tham gia các buổi đào tạo trực tuyến miễn phí",
      icon: <Users size={24} />,
      link: "#webinars",
      color: "#9C27B0",
    },
  ]

  // Contact information
  const contactInfo = [
    {
      title: "Hotline hỗ trợ",
      content: "1900 1234",
      icon: <Phone size={20} />,
      details: "Thứ 2 - Thứ 6: 8:00 - 18:00, Thứ 7: 8:00 - 12:00",
    },
    {
      title: "Email hỗ trợ",
      content: "hotro@tochuc.edu.vn",
      icon: <Mail size={20} />,
      details: "Phản hồi trong vòng 24 giờ làm việc",
    },
    {
      title: "Văn phòng chính",
      content: "123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh",
      icon: <MapPin size={20} />,
      details: "Thứ 2 - Thứ 6: 8:00 - 17:00",
    },
    {
      title: "Thời gian phản hồi",
      content: "Trong vòng 24 giờ làm việc",
      icon: <Clock size={20} />,
      details: "Các yêu cầu khẩn cấp sẽ được ưu tiên xử lý",
    },
  ]

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files,
      })
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      })
    }

    // Clear specific error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    // Validate required fields
    if (!formData.fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên"

    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập email"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Số điện thoại không hợp lệ"
    }

    if (!formData.category) newErrors.category = "Vui lòng chọn danh mục"
    if (!formData.subject.trim()) newErrors.subject = "Vui lòng nhập tiêu đề"
    if (!formData.message.trim()) newErrors.message = "Vui lòng nhập nội dung"
    if (!formData.agreeTerms) newErrors.agreeTerms = "Vui lòng đồng ý với điều khoản"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false)
        setSubmitSuccess(true)

        // Reset form after successful submission
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          category: "",
          message: "",
          attachments: null,
          agreeTerms: false,
        })

        setValidated(false)
      }, 1500)
    } else {
      setValidated(true)
    }
  }

  return (
    <Container fluid className="py-5" style={{ backgroundColor: customStyles.secondaryColor, minHeight: "100vh" }}>
      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="mb-3" style={{ color: customStyles.primaryColor }}>
              Trung tâm Hỗ trợ
            </h1>
            <p className="lead mb-4">
              Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn. Vui lòng chọn phương thức hỗ trợ phù hợp
              hoặc gửi yêu cầu trực tiếp.
            </p>

            <div className="search-container mb-5">
              <InputGroup className="mx-auto" style={{ maxWidth: "600px" }}>
                <Form.Control placeholder="Tìm kiếm câu hỏi hoặc chủ đề..." aria-label="Tìm kiếm" className="py-2" />
                <Button
                  variant="primary"
                  style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                >
                  <Search size={18} />
                </Button>
              </InputGroup>
            </div>
          </Col>
        </Row>

        {/* Support Options */}
        <Row className="mb-5">
          {supportOptions.map((option, index) => (
            <Col md={6} lg={3} key={index} className="mb-4">
              <Card className="h-100 border-0 shadow-sm hover-card">
                <Card.Body className="text-center p-4">
                  <div
                    className="icon-container rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: `${option.color}15`,
                      color: option.color,
                      width: "70px",
                      height: "70px",
                    }}
                  >
                    {option.icon}
                  </div>
                  <h4 className="mb-2">{option.title}</h4>
                  <p className="text-muted mb-3">{option.description}</p>
                  <a
                    href={option.link}
                    className="btn btn-sm btn-outline-primary d-inline-flex align-items-center"
                    style={{ color: option.color, borderColor: option.color }}
                  >
                    Xem thêm <ChevronRight size={16} className="ms-1" />
                  </a>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row className="mb-5">
          {/* Contact Information */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <Card className="border-0 shadow-sm h-100">
              <Card.Header className="bg-white border-0">
                <h3 className="mb-0">Thông tin liên hệ</h3>
              </Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {contactInfo.map((info, index) => (
                    <ListGroup.Item key={index} className="px-0 py-3 border-bottom">
                      <div className="d-flex">
                        <div
                          className="icon-container rounded-circle me-3 d-flex align-items-center justify-content-center"
                          style={{
                            backgroundColor: `${customStyles.primaryColor}15`,
                            color: customStyles.primaryColor,
                            width: "45px",
                            height: "45px",
                            flexShrink: 0,
                          }}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <h5 className="mb-1">{info.title}</h5>
                          <p className="mb-1 fw-bold">{info.content}</p>
                          <small className="text-muted">{info.details}</small>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>

                <div className="mt-4">
                  <h5 className="mb-3">Theo dõi chúng tôi</h5>
                  <div className="d-flex gap-2">
                    <a href="#facebook" className="social-icon">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#3b5998",
                          color: "white",
                        }}
                      >
                        <i className="bi bi-facebook"></i>
                      </div>
                    </a>
                    <a href="#youtube" className="social-icon">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#FF0000",
                          color: "white",
                        }}
                      >
                        <i className="bi bi-youtube"></i>
                      </div>
                    </a>
                    <a href="#instagram" className="social-icon">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#E1306C",
                          color: "white",
                        }}
                      >
                        <i className="bi bi-instagram"></i>
                      </div>
                    </a>
                    <a href="#linkedin" className="social-icon">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: "#0077B5",
                          color: "white",
                        }}
                      >
                        <i className="bi bi-linkedin"></i>
                      </div>
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Support Request Form */}
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Gửi yêu cầu hỗ trợ</h3>
                <Badge
                  bg="success"
                  className="rounded-pill px-3 py-2"
                  style={{ backgroundColor: customStyles.primaryColor }}
                >
                  <Clock size={14} className="me-1" /> Phản hồi trong 24h
                </Badge>
              </Card.Header>

              <Card.Body>
                {submitSuccess ? (
                  <Alert variant="success" className="d-flex align-items-center">
                    <CheckCircle size={24} className="me-2" />
                    <div>
                      <h5 className="alert-heading mb-1">Yêu cầu đã được gửi thành công!</h5>
                      <p className="mb-0">
                        Cảm ơn bạn đã liên hệ với chúng tôi. Yêu cầu của bạn đã được tiếp nhận và sẽ được xử lý trong
                        thời gian sớm nhất. Mã yêu cầu của bạn là{" "}
                        <strong>REQ-{Math.floor(100000 + Math.random() * 900000)}</strong>.
                      </p>
                    </div>
                  </Alert>
                ) : (
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="fullName">
                          <Form.Label>
                            Họ và tên <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            isInvalid={!!errors.fullName}
                            required
                          />
                          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group controlId="email">
                          <Form.Label>
                            Email <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            required
                          />
                          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="phone">
                          <Form.Label>Số điện thoại</Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            isInvalid={!!errors.phone}
                          />
                          <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Group controlId="category">
                          <Form.Label>
                            Danh mục <span className="text-danger">*</span>
                          </Form.Label>
                          <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            isInvalid={!!errors.category}
                            required
                          >
                            <option value="">Chọn danh mục</option>
                            {supportCategories.map((category) => (
                              <option key={category.value} value={category.value}>
                                {category.label}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="subject">
                      <Form.Label>
                        Tiêu đề <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        isInvalid={!!errors.subject}
                        required
                      />
                      <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="message">
                      <Form.Label>
                        Nội dung <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        isInvalid={!!errors.message}
                        required
                        placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                      />
                      <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="attachments">
                      <Form.Label>Tệp đính kèm (nếu có)</Form.Label>
                      <Form.Control type="file" name="attachments" onChange={handleChange} multiple />
                      <Form.Text className="text-muted">
                        Hỗ trợ các định dạng: PDF, DOC, DOCX, JPG, PNG. Kích thước tối đa: 5MB.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="agreeTerms">
                      <Form.Check
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        isInvalid={!!errors.agreeTerms}
                        label={
                          <span>
                            Tôi đồng ý với <a href="#terms">Điều khoản dịch vụ</a> và{" "}
                            <a href="#privacy">Chính sách bảo mật</a>
                          </span>
                        }
                      />
                      {errors.agreeTerms && <div className="text-danger mt-1 small">{errors.agreeTerms}</div>}
                    </Form.Group>

                    <div className="d-grid">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="me-2" />
                            Gửi yêu cầu
                          </>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAQs Section */}
        <Row className="mb-5">
          <Col lg={12}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white border-0">
                <h3 className="mb-0">Câu hỏi thường gặp</h3>
              </Card.Header>
              <Card.Body>
                <Accordion defaultActiveKey="0" flush>
                  {faqItems.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                      <Accordion.Header>
                        <div className="d-flex align-items-center">
                          <HelpCircle size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                          {faq.question}
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <p className="mb-0">{faq.answer}</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>

                <div className="text-center mt-4">
                  <Button
                    variant="outline-primary"
                    className="px-4"
                    style={{ color: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                  >
                    Xem tất cả câu hỏi
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Additional Support Info */}
        <Row>
          <Col lg={12}>
            <Card className="border-0 shadow-sm bg-light">
              <Card.Body className="p-4">
                <Row>
                  <Col md={8}>
                    <div className="d-flex">
                      <div className="me-3">
                        <Info size={24} style={{ color: customStyles.primaryColor }} />
                      </div>
                      <div>
                        <h4 className="mb-2">Bạn cần hỗ trợ ngay?</h4>
                        <p className="mb-0">
                          Đối với các vấn đề khẩn cấp, vui lòng gọi đến hotline hỗ trợ của chúng tôi theo số{" "}
                          <strong>1900 1234</strong> hoặc sử dụng tính năng chat trực tuyến để được hỗ trợ nhanh chóng.
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md={4} className="d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                    <Button
                      variant="primary"
                      size="lg"
                      className="me-2"
                      style={{ backgroundColor: customStyles.primaryColor, borderColor: customStyles.primaryColor }}
                    >
                      <MessageSquare size={18} className="me-2" />
                      Chat trực tuyến
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Custom CSS */}
      <style>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
        }
        
        .accordion-button:not(.collapsed) {
          background-color: ${customStyles.secondaryColor};
          color: ${customStyles.primaryColor};
          box-shadow: none;
        }
        
        .accordion-button:focus {
          box-shadow: none;
          border-color: rgba(0,0,0,.125);
        }
      `}</style>
    </Container>
  )
}

export default SupportRequestPage

