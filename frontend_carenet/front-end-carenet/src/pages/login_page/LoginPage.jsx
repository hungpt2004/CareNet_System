"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, InputGroup, Alert } from "react-bootstrap"
import { Mail, Lock, Eye, EyeOff, Facebook, Twitter, Github, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Custom CSS variables for the color scheme
const customStyles = {
  primaryColor: "#5DB996",
  secondaryColor: "#FBF6E9",
}


function LoginPage() {
  // State for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)

  // State for form validation
  const [validated, setValidated] = useState(false)

  // State for login error
  const [loginError, setLoginError] = useState("")

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user types
    if (loginError) setLoginError("")
  }

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      return
    }

    // Simulate login - in a real app, you would call your auth API
    console.log("Login attempt with:", formData)

    // Simulate login error for demo purposes (if email doesn't contain '@')
    if (!formData.email.includes("@")) {
      setLoginError("Invalid email or password. Please try again.")
      return
    }

    // Simulate successful login
    navigate('/home')
  }

  const navigate = useNavigate();

  return (

    <div
      className="login-page d-flex align-items-center justify-content-center min-vh-100"
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

      <Container className="position-relative">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="border-0 shadow" style={{ background: "rgba(255, 255, 255, 0.9)" }}>
              <Card.Body className="p-4 p-md-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-1" style={{ color: customStyles.primaryColor }}>
                    Welcome Back
                  </h2>
                  <p className="text-muted">Sign in to continue to Volunteer Portal</p>
                </div>

                {loginError && (
                  <Alert variant="danger" className="mb-4">
                    {loginError}
                  </Alert>
                )}

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <Mail size={18} />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">Please enter a valid email address.</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group className="mb-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Label>Password</Form.Label>
                      <a
                        href="#forgot-password"
                        className="text-decoration-none small"
                        style={{ color: customStyles.primaryColor }}
                      >
                        Forgot Password?
                      </a>
                    </div>
                    <InputGroup>
                      <InputGroup.Text>
                        <Lock size={18} />
                      </InputGroup.Text>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength={6}
                      />
                      <Button variant="outline-secondary" onClick={togglePasswordVisibility} type="button">
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                      <Form.Control.Feedback type="invalid">
                        Password must be at least 6 characters.
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  {/* Remember Me Checkbox */}
                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      label="Remember me"
                      checked={formData.rememberMe}
                      onChange={handleChange}
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
                      Sign In
                      <ArrowRight size={18} className="ms-2" />
                    </Button>
                  </div>

                  {/* Divider */}
                  <div className="d-flex align-items-center mb-4">
                    <div className="flex-grow-1 border-bottom"></div>
                    <div className="px-3 text-muted small">OR CONTINUE WITH</div>
                    <div className="flex-grow-1 border-bottom"></div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="d-flex justify-content-center gap-2 mb-4">
                    <Button
                      variant="outline-primary"
                      className="rounded-circle p-2"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <Facebook size={20} />
                    </Button>
                    <Button
                      variant="outline-info"
                      className="rounded-circle p-2"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <Twitter size={20} />
                    </Button>
                    <Button
                      variant="outline-dark"
                      className="rounded-circle p-2"
                      style={{ width: "45px", height: "45px" }}
                    >
                      <Github size={20} />
                    </Button>
                  </div>

                  {/* Sign Up Link */}
                  <div className="text-center">
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a
                        href="#signup"
                        className="text-decoration-none fw-bold"
                        style={{ color: customStyles.primaryColor }}
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            {/* Footer */}
            <div className="text-center mt-3 text-white">
              <p className="small mb-0">&copy; 2025 Volunteer Portal. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LoginPage

