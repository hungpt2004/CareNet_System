import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Layout,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Divider,
  Space,
  Alert,
  DatePicker,
  ConfigProvider,
  notification,
} from "antd"
import { FacebookFilled, GoogleOutlined } from "@ant-design/icons"
import { Eye, EyeOff, Mail, Lock, User, Calendar, Phone } from "lucide-react"
import { CustomSuccessToast, CustomFailedToast, CustomToast } from "../../components/toast/CustomToast"
import useAuthStore from "../../hooks/authStore"

// Custom theme configuration
const theme = {
  token: {
    colorPrimary: "#5DB996",
    colorBgContainer: "#FFFFFF",
    colorBgElevated: "#FFFFFF",
    borderRadius: 8,
    fontSize: 16,
  },
}

// Social login component
const SocialLoginButton = ({ icon, title, color, onClick }) => (
  <Button
    icon={icon}
    size="large"
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: color,
    }}
    onClick={onClick}
  >
    {title}
  </Button>
)

function AuthenGatePage() {
  const navigate = useNavigate()
  const { login, register, currentUser, loading: authLoading, error: authError, successMessage: authSuccess } = useAuthStore()

  // State for modals
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  // Login form reference
  const [loginForm] = Form.useForm()
  const [registerForm] = Form.useForm()

  // State for errors
  const [loginError, setLoginError] = useState("")

  // Notification API
  const [api, contextHolder] = notification.useNotification()

  // Handle login modal
  const handleLoginModalClose = () => {
    setShowLoginModal(false)
    loginForm.resetFields()
    setLoginError("")
  }

  const handleLoginModalShow = () => setShowLoginModal(true)

  // Handle register modal
  const handleRegisterModalClose = () => {
    setShowRegisterModal(false)
    registerForm.resetFields()
  }

  const handleRegisterModalShow = () => setShowRegisterModal(true)

  // Handle login form submission
  const handleLoginSubmit = async (values) => {

    console.log("Login values:", values)

    try {
      setLoginError("")
      await login(values.email, values.password)
      CustomSuccessToast("Đăng nhập thành công")
      
      // Navigate based on user role
      setTimeout(() => {
        if (currentUser?.hobbies?.length <= 0) {
          navigate("/onboarding")
        } else {
          switch (currentUser?.role?.toLowerCase()) {
            case 'volunteer':
              navigate("/")
              break
            case 'organization':
              navigate("/owner-dashboard")
              break
            case 'admin':
              navigate("/dashboard")
              break
            case 'staff':
              navigate("/staff-attendance")
              break
            default:
              navigate("/")
          }
        }
      }, 800)
    } catch (err) {
      setLoginError(err || "Đăng nhập thất bại. Vui lòng thử lại.")
      CustomFailedToast(err || "Đăng nhập thất bại. Vui lòng thử lại.")
    }
  }

  // Handle register form submission
  const handleRegisterSubmit = async (values) => {
    try {
      const userData = {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        dob: values.dob ? values.dob.format('YYYY-MM-DD') : null,
        phone: values.phone,
      }
      
      await register(userData)
      CustomSuccessToast("Đăng ký thành công! Vui lòng đăng nhập.")
      handleRegisterModalClose()
      handleLoginModalShow()
    } catch (err) {
      CustomFailedToast(err?.message || "Đăng ký thất bại. Vui lòng thử lại.")
    }
  }

  // Show error toast when auth error changes
  useEffect(() => {
    if (authError) {
      CustomFailedToast(authError)
    }
  }, [authError])

  // Show success toast when auth success changes
  useEffect(() => {
    if (authSuccess) {
      CustomSuccessToast(authSuccess)
    }
  }, [authSuccess])

  return (
    <>
      <CustomToast/>
      <ConfigProvider theme={theme}>
      {contextHolder}
      <Layout
        style={{
          minHeight: "100vh",
          background: "transparent",
          position: "relative",
        }}
      >
        {/* Background image with overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url(/volunteer_img/login.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -2,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: -1,
          }}
        />

        {/* Main content */}
        <Layout.Content
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "24px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: "600px",
              width: "100%",
            }}
          >
            <Typography.Title
              level={1}
              style={{
                color: "white",
                marginBottom: "16px",
                fontSize: "3.5rem",
                fontWeight: "bold",
              }}
            >
              CareNet
            </Typography.Title>

            <Typography.Paragraph
              style={{
                color: "white",
                fontSize: "1.2rem",
                marginBottom: "32px",
              }}
            >
              Nền tảng kết nối tình nguyện viên với các tổ chức xã hội trên khắp Việt Nam
            </Typography.Paragraph>

            <Space size="middle">
              <Button
                type="primary"
                size="large"
                onClick={handleLoginModalShow}
                style={{
                  height: "48px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  fontWeight: "bold",
                }}
              >
                Đăng nhập
              </Button>

              <Button
                ghost
                size="large"
                onClick={handleRegisterModalShow}
                style={{
                  height: "48px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  borderColor: "white",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Đăng ký
              </Button>

              <Button
                size="large"
                onClick={() => navigate("/")}
                style={{
                  height: "48px",
                  paddingLeft: "24px",
                  paddingRight: "24px",
                  fontWeight: "bold",
                }}
              >
                Xem trước
              </Button>
            </Space>
          </div>
        </Layout.Content>

        {/* Login Modal */}
        <Modal
          open={showLoginModal}
          onCancel={handleLoginModalClose}
          footer={null}
          width={520}
          centered
          style={{ borderRadius: "16px" }}
        >
          <div style={{ padding: "16px 8px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Typography.Title level={2} style={{ color: theme.token.colorPrimary, marginBottom: "8px" }}>
                Chào mừng trở lại
              </Typography.Title>
              <Typography.Paragraph type="secondary">Đăng nhập để tiếp tục sử dụng CareNet</Typography.Paragraph>
            </div>

            {loginError && <Alert message={loginError} type="error" showIcon style={{ marginBottom: "24px" }} />}

            <Form form={loginForm} layout="vertical" onFinish={handleLoginSubmit} initialValues={{ remember: false }}>
              {/* Email Field */}
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Vui lòng nhập email của bạn!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  prefix={<Mail size={18} className="site-form-item-icon" />}
                  placeholder="Nhập email của bạn"
                  size="large"
                />
              </Form.Item>

              {/* Password Field */}
              <Form.Item
                name="password"
                label={
                  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <span>Mật khẩu</span>
                    <a href="/forgot-password" style={{ color: theme.token.colorPrimary }}>
                      Quên mật khẩu?
                    </a>
                  </div>
                }
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
                  { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                ]}
              >
                <Input.Password
                  prefix={<Lock size={18} className="site-form-item-icon" />}
                  placeholder="Nhập mật khẩu của bạn"
                  size="large"
                  iconRender={(visible) => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
                />
              </Form.Item>

              {/* Remember Me Checkbox */}
              <Form.Item name="rememberMe" valuePropName="checked">
                <Checkbox>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>

              {/* Login Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block loading={authLoading}>
                  Đăng nhập
                </Button>
              </Form.Item>

              {/* Divider */}
              <Divider plain>HOẶC ĐĂNG NHẬP VỚI</Divider>

              {/* Social Login Buttons */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <SocialLoginButton
                  icon={<FacebookFilled />}
                  title="Facebook"
                  color="#1877F2"
                  onClick={() => console.log("Facebook login")}
                />
                <SocialLoginButton
                  icon={<GoogleOutlined />}
                  title="Google"
                  color="#DB4437"
                  onClick={() => console.log("Google login")}
                />
              </div>

              {/* Sign Up Link */}
              <div style={{ textAlign: "center" }}>
                <Typography.Paragraph style={{ marginBottom: 0 }}>
                  Chưa có tài khoản?{" "}
                  <a
                    href="#"
                    style={{ color: theme.token.colorPrimary, fontWeight: "bold" }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLoginModalClose()
                      handleRegisterModalShow()
                    }}
                  >
                    Đăng ký ngay
                  </a>
                </Typography.Paragraph>
              </div>
            </Form>
          </div>
        </Modal>

        {/* Register Modal */}
        <Modal
          open={showRegisterModal}
          onCancel={handleRegisterModalClose}
          footer={null}
          width={520}
          centered
          style={{ borderRadius: "16px" }}
        >
          <div style={{ padding: "16px 8px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <Typography.Title level={2} style={{ color: theme.token.colorPrimary, marginBottom: "8px" }}>
                Tham gia cùng CareNet
              </Typography.Title>
              <Typography.Paragraph type="secondary">
                Tạo tài khoản để bắt đầu hành trình tình nguyện của bạn
              </Typography.Paragraph>
            </div>

            <Form form={registerForm} layout="vertical" onFinish={handleRegisterSubmit}>
              {/* Full Name Field */}
              <Form.Item
                name="fullname"
                label={
                  <>
                    Họ và tên <span style={{ color: "#ff4d4f" }}>*</span>
                  </>
                }
                rules={[{ required: true, message: "Vui lòng nhập họ và tên của bạn!" }]}
              >
                <Input
                  prefix={<User size={18} className="site-form-item-icon" />}
                  placeholder="Nhập họ và tên của bạn"
                  size="large"
                />
              </Form.Item>

              {/* Email Field */}
              <Form.Item
                name="email"
                label={
                  <>
                    Email <span style={{ color: "#ff4d4f" }}>*</span>
                  </>
                }
                rules={[
                  { required: true, message: "Vui lòng nhập email của bạn!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  prefix={<Mail size={18} className="site-form-item-icon" />}
                  placeholder="Nhập email của bạn"
                  size="large"
                />
              </Form.Item>

              {/* Password Field */}
              <Form.Item
                name="password"
                label={
                  <>
                    Mật khẩu <span style={{ color: "#ff4d4f" }}>*</span>
                  </>
                }
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
                  { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                ]}
                extra="Mật khẩu phải có ít nhất 8 ký tự"
              >
                <Input.Password
                  prefix={<Lock size={18} className="site-form-item-icon" />}
                  placeholder="Nhập mật khẩu của bạn"
                  size="large"
                  iconRender={(visible) => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
                />
              </Form.Item>

              {/* Confirm Password Field */}
              <Form.Item
                name="confirmPassword"
                label={
                  <>
                    Xác nhận mật khẩu <span style={{ color: "#ff4d4f" }}>*</span>
                  </>
                }
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu của bạn!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"))
                    },
                  }),
                ]}
              >
                <Input.Password
                  prefix={<Lock size={18} className="site-form-item-icon" />}
                  placeholder="Nhập lại mật khẩu của bạn"
                  size="large"
                  iconRender={(visible) => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
                />
              </Form.Item>

              {/* Birth Date Field */}
              <Form.Item name="dob" label="Ngày sinh">
                <DatePicker
                  style={{ width: "100%" }}
                  placeholder="Chọn ngày sinh"
                  format="DD/MM/YYYY"
                  size="large"
                  suffixIcon={<Calendar size={18} />}
                />
              </Form.Item>

              {/* Phone Field */}
              <Form.Item name="phone" label="Số điện thoại">
                <Input
                  prefix={<Phone size={18} className="site-form-item-icon" />}
                  placeholder="Nhập số điện thoại của bạn"
                  size="large"
                />
              </Form.Item>

              {/* Terms Checkbox */}
              <Form.Item
                name="agreeTerms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error("Bạn phải đồng ý với điều khoản dịch vụ!")),
                  },
                ]}
              >
                <Checkbox>
                  Tôi đồng ý với{" "}
                  <a href="#terms" style={{ color: theme.token.colorPrimary }}>
                    Điều khoản dịch vụ
                  </a>{" "}
                  và{" "}
                  <a href="#privacy" style={{ color: theme.token.colorPrimary }}>
                    Chính sách bảo mật
                  </a>
                </Checkbox>
              </Form.Item>

              {/* Register Button */}
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block loading={authLoading}>
                  Đăng ký
                </Button>
              </Form.Item>

              {/* Divider */}
              <Divider plain>HOẶC ĐĂNG KÝ VỚI</Divider>

              {/* Social Register Buttons */}
              <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
                <SocialLoginButton
                  icon={<FacebookFilled />}
                  title="Facebook"
                  color="#1877F2"
                  onClick={() => console.log("Facebook login")}
                />
                <SocialLoginButton
                  icon={<GoogleOutlined />}
                  title="Google"
                  color="#DB4437"
                  onClick={() => console.log("Google login")}
                />
              </div>

              {/* Login Link */}
              <div style={{ textAlign: "center" }}>
                <Typography.Paragraph style={{ marginBottom: 0 }}>
                  Đã có tài khoản?{" "}
                  <a
                    href="#"
                    style={{ color: theme.token.colorPrimary, fontWeight: "bold" }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleRegisterModalClose()
                      handleLoginModalShow()
                    }}
                  >
                    Đăng nhập
                  </a>
                </Typography.Paragraph>
              </div>
            </Form>
          </div>
        </Modal>
      </Layout>
    </ConfigProvider>
    </>
  )
}

export default AuthenGatePage
