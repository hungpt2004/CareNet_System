"use client"

import { useState } from "react"
import { Container, Row, Col, Button, Modal, Form, InputGroup, Alert } from "react-bootstrap"
import { Mail, Lock, Eye, EyeOff, Facebook, Twitter, Github, ArrowRight, User, Calendar, Phone } from "lucide-react"
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { SocialLoginComponent } from "../../components/button/SocialLoginComponent";
import { useNavigate } from "react-router-dom";

// Custom CSS variables for the color scheme
const customStyles = {
  primaryColor: "#5DB996",
  secondaryColor: "#FBF6E9",
}

function AuthenGatePage() {
  // Navigate 
  const navigate = useNavigate();

  // State for modals
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    phone: "",
    agreeTerms: false,
  })

  // State for password visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // State for form validation
  const [loginValidated, setLoginValidated] = useState(false)
  const [registerValidated, setRegisterValidated] = useState(false)

  // State for errors
  const [loginError, setLoginError] = useState("")
  const [registerErrors, setRegisterErrors] = useState({})

  // Handle login modal
  const handleLoginModalClose = () => {
    setShowLoginModal(false)
    setLoginData({
      email: "",
      password: "",
      rememberMe: false,
    })
    setLoginValidated(false)
    setLoginError("")
  }  
  const handleLoginModalShow = () => setShowLoginModal(true)

  // Handle register modal
  const handleRegisterModalClose = () => {
    setShowRegisterModal(false)
    setRegisterData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthDate: "",
      phone: "",
      agreeTerms: false,
    })
    setRegisterValidated(false)
    setRegisterErrors({})
  }
  const handleRegisterModalShow = () => setShowRegisterModal(true)

  // Handle login input changes
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target
    setLoginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user types
    if (loginError) setLoginError("")
  }

  // Handle register input changes
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target
    setRegisterData({
      ...registerData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear specific error when field is changed
    if (registerErrors[name]) {
      setRegisterErrors({
        ...registerErrors,
        [name]: "",
      })
    }
  }

  // Toggle password visibility
  const toggleLoginPasswordVisibility = () => {
    setShowLoginPassword(!showLoginPassword)
  }

  const toggleRegisterPasswordVisibility = () => {
    setShowRegisterPassword(!showRegisterPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setLoginValidated(true)
      return
    }

    // Simulate login - in a real app, you would call your auth API
    console.log("Login attempt with:", loginData)

    // Simulate login error for demo purposes (if email doesn't contain '@')
    if (!loginData.email.includes("@")) {
      setLoginError("Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.")
      return
    }

    // Simulate successful login
    handleLoginModalClose()

    // In a real app, you would redirect or update the UI
    navigate('/home')
  }

  // Validate register form
  const validateRegisterForm = () => {
    const newErrors = {}

    if (!registerData.email) newErrors.email = "Email không được để trống"
    else if (!/\S+@\S+\.\S+/.test(registerData.email)) newErrors.email = "Email không hợp lệ"

    if (!registerData.password) newErrors.password = "Mật khẩu không được để trống"
    else if (registerData.password.length < 8) newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự"

    if (!registerData.confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu"
    else if (registerData.password !== registerData.confirmPassword) newErrors.confirmPassword = "Mật khẩu không khớp"

    if (!registerData.fullName) newErrors.fullName = "Họ tên không được để trống"

    if (!registerData.agreeTerms) newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản dịch vụ"

    setRegisterErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle register form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setRegisterValidated(true)
    }

    if (validateRegisterForm()) {
      // Simulate registration - in a real app, you would call your auth API
      console.log("Registration submitted:", registerData)
      alert("Đăng ký thành công!")
      handleRegisterModalClose()
      // In a real app, you would redirect or update the UI
    }
  }

  return (
    <div
      className="authen-page d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: "url(/volunteer_img/login.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay to darken the background image */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></div>

      <Container className="position-relative text-center">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="text-white mb-5">
              <h1 className="display-4 fw-bold mb-3">CareNet</h1>
              <p className="lead mb-4">
                Nền tảng kết nối tình nguyện viên với các tổ chức và sự kiện thiện nguyện trên khắp Việt Nam
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button
                  size="lg"
                  onClick={handleLoginModalShow}
                  style={{
                    backgroundColor: customStyles.primaryColor,
                    borderColor: customStyles.primaryColor,
                  }}
                >
                  Đăng nhập
                </Button>
                <Button size="lg" variant="outline-light" onClick={handleRegisterModalShow}>
                  Đăng ký
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleLoginModalClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <h4 className="fw-bold mb-1" style={{ color: customStyles.primaryColor }}>
              Chào mừng trở lại
            </h4>
            <p className="text-muted">Đăng nhập để tiếp tục sử dụng CareNet</p>
          </div>

          {loginError && (
            <Alert variant="danger" className="mb-4">
              {loginError}
            </Alert>
          )}

          <Form noValidate validated={loginValidated} onSubmit={handleLoginSubmit}>
            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Mail size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
                <Form.Control.Feedback type="invalid">Vui lòng nhập email hợp lệ.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <Form.Label>Mật khẩu</Form.Label>
                <a
                  href="#forgot-password"
                  className="text-decoration-none small"
                  style={{ color: customStyles.primaryColor }}
                >
                  Quên mật khẩu?
                </a>
              </div>
              <InputGroup>
                <InputGroup.Text>
                  <Lock size={18} />
                </InputGroup.Text>
                <Form.Control
                  type={showLoginPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required
                  minLength={6}
                />
                <Button variant="outline-secondary" onClick={toggleLoginPasswordVisibility} type="button">
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
                <Form.Control.Feedback type="invalid">Mật khẩu phải có ít nhất 6 ký tự.</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Remember Me Checkbox */}
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                label="Ghi nhớ đăng nhập"
                checked={loginData.rememberMe}
                onChange={handleLoginChange}
              />
            </Form.Group>

            {/* Login Button */}
            <div className="d-grid mb-4">
              <Button
                type="submit"
                size="lg"
                style={{
                  backgroundColor: customStyles.primaryColor,
                  borderColor: customStyles.primaryColor,
                }}
              >
                Đăng nhập
                <ArrowRight size={18} className="ms-2" />
              </Button>
            </div>

            {/* Divider */}
            <div className="d-flex align-items-center mb-4">
              <div className="flex-grow-1 border-bottom"></div>
              <div className="px-3 text-muted small">HOẶC ĐĂNG NHẬP VỚI</div>
              <div className="flex-grow-1 border-bottom"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="d-flex justify-content-center gap-2 mb-4">
              <SocialLoginComponent
               Icon={FaFacebookSquare}
               color={'blue'}
               title={"Đăng nhập với Facebook"}
               size={30}
              />
              <SocialLoginComponent
               Icon={FcGoogle}
               color={'blue'}
               title={"Đăng nhập với Google"}
               size={30}
              />
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="mb-0">
                Chưa có tài khoản?{" "}
                <a
                  href="#"
                  className="text-decoration-none fw-bold"
                  style={{ color: customStyles.primaryColor }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLoginModalClose()
                    handleRegisterModalShow()
                  }}
                >
                  Đăng ký ngay
                </a>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Register Modal */}
      <Modal show={showRegisterModal} onHide={handleRegisterModalClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Đăng ký</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="text-center mb-4">
            <h4 className="fw-bold mb-1" style={{ color: customStyles.primaryColor }}>
              Tham gia cùng CareNet
            </h4>
            <p className="text-muted">Tạo tài khoản để bắt đầu hành trình tình nguyện của bạn</p>
          </div>

          <Form noValidate validated={registerValidated} onSubmit={handleRegisterSubmit}>
            {/* Full Name Field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Họ và tên <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <User size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Nhập họ và tên của bạn"
                  value={registerData.fullName}
                  onChange={handleRegisterChange}
                  required
                  isInvalid={!!registerErrors.fullName}
                />
                <Form.Control.Feedback type="invalid">
                  {registerErrors.fullName || "Vui lòng nhập họ và tên của bạn."}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Email Field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Email <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Mail size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Nhập email của bạn"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required
                  isInvalid={!!registerErrors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {registerErrors.email || "Vui lòng nhập email hợp lệ."}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Mật khẩu <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Lock size={18} />
                </InputGroup.Text>
                <Form.Control
                  type={showRegisterPassword ? "text" : "password"}
                  name="password"
                  placeholder="Nhập mật khẩu của bạn"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required
                  minLength={8}
                  isInvalid={!!registerErrors.password}
                />
                <Button variant="outline-secondary" onClick={toggleRegisterPasswordVisibility} type="button">
                  {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {registerErrors.password || "Mật khẩu phải có ít nhất 8 ký tự."}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text className="text-muted">Mật khẩu phải có ít nhất 8 ký tự</Form.Text>
            </Form.Group>

            {/* Confirm Password Field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Xác nhận mật khẩu <span className="text-danger">*</span>
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Lock size={18} />
                </InputGroup.Text>
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu của bạn"
                  value={registerData.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                  isInvalid={!!registerErrors.confirmPassword}
                />
                <Button variant="outline-secondary" onClick={toggleConfirmPasswordVisibility} type="button">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
                <Form.Control.Feedback type="invalid">
                  {registerErrors.confirmPassword || "Vui lòng xác nhận mật khẩu."}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            {/* Birth Date Field */}
            <Form.Group className="mb-3">
              <Form.Label>Ngày sinh</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Calendar size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  name="birthDate"
                  value={registerData.birthDate}
                  onChange={handleRegisterChange}
                />
              </InputGroup>
            </Form.Group>

            {/* Phone Field */}
            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <Phone size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Nhập số điện thoại của bạn"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                />
              </InputGroup>
            </Form.Group>

            {/* Terms Checkbox */}
            <Form.Group className="mb-4">
              <Form.Check
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={registerData.agreeTerms}
                onChange={handleRegisterChange}
                label={
                  <span>
                    Tôi đồng ý với{" "}
                    <a href="#terms" className="text-primary">
                      Điều khoản dịch vụ
                    </a>{" "}
                    và{" "}
                    <a href="#privacy" className="text-primary">
                      Chính sách bảo mật
                    </a>
                  </span>
                }
                isInvalid={!!registerErrors.agreeTerms}
              />
              {registerErrors.agreeTerms && <div className="text-danger mt-1 small">{registerErrors.agreeTerms}</div>}
            </Form.Group>

            {/* Register Button */}
            <div className="d-grid mb-4">
              <Button
                type="submit"
                size="lg"
                style={{
                  backgroundColor: customStyles.primaryColor,
                  borderColor: customStyles.primaryColor,
                }}
              >
                Đăng ký
                <ArrowRight size={18} className="ms-2" />
              </Button>
            </div>

            {/* Divider */}
            <div className="d-flex align-items-center mb-4">
              <div className="flex-grow-1 border-bottom"></div>
              <div className="px-3 text-muted small">HOẶC ĐĂNG KÝ VỚI</div>
              <div className="flex-grow-1 border-bottom"></div>
            </div>

            {/* Social Register Buttons */}
            <div className="d-flex justify-content-center gap-2 mb-4">
              <Button
                variant="outline-primary"
                className="rounded-circle p-2"
                style={{ width: "45px", height: "45px" }}
              >
                <Facebook size={20} />
              </Button>
              <Button variant="outline-info" className="rounded-circle p-2" style={{ width: "45px", height: "45px" }}>
                <Twitter size={20} />
              </Button>
              <Button variant="outline-dark" className="rounded-circle p-2" style={{ width: "45px", height: "45px" }}>
                <Github size={20} />
              </Button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="mb-0">
                Đã có tài khoản?{" "}
                <a
                  href="#"
                  className="text-decoration-none fw-bold"
                  style={{ color: customStyles.primaryColor }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleRegisterModalClose()
                    handleLoginModalShow()
                  }}
                >
                  Đăng nhập
                </a>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default AuthenGatePage
