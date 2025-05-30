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
import styles from '../../css/AuthenGate.module.css'

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
const SocialLoginButton = ({ icon, title, color, onClick, type }) => (
  <Button
    icon={icon}
    size="large"
    className={`${styles.socialButton} ${type === 'facebook' ? styles.facebookButton : styles.googleButton}`}
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
        <Layout className={styles.pageContainer}>
          {/* Background with particles */}
          <div className={styles.backgroundImage} />
          <div className={styles.backgroundOverlay} />
          
          {/* Floating particles */}
          <div className={styles.particles}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.particle} />
            ))}
          </div>

          {/* Main content */}
          <Layout.Content className={styles.mainContent}>
            <div className={styles.heroSection}>
              <Typography.Title level={1} className={styles.heroTitle}>
                CareNet
              </Typography.Title>

              <Typography.Paragraph className={styles.heroSubtitle}>
                Nền tảng kết nối tình nguyện viên với các tổ chức xã hội trên khắp Việt Nam
              </Typography.Paragraph>

              <div className={styles.actionButtons}>
                <Button
                  type="primary"
                  size="large"
                  onClick={handleLoginModalShow}
                  className={styles.primaryButton}
                >
                  Đăng nhập
                </Button>

                <Button
                  size="large"
                  onClick={handleRegisterModalShow}
                  className={styles.ghostButton}
                >
                  Đăng ký
                </Button>

                <Button
                  size="large"
                  onClick={() => navigate("/")}
                  className={styles.secondaryButton}
                >
                  Xem trước
                </Button>
              </div>
            </div>
          </Layout.Content>

          {/* Login Modal */}
          <Modal
            open={showLoginModal}
            onCancel={handleLoginModalClose}
            footer={null}
            width={520}
            centered
            className={styles.modal}
          >
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <Typography.Title level={2} className={styles.modalTitle}>
                  Chào mừng trở lại
                </Typography.Title>
                <Typography.Paragraph className={styles.modalSubtitle}>
                  Đăng nhập để tiếp tục sử dụng CareNet
                </Typography.Paragraph>
              </div>

              {loginError && (
                <Alert 
                  message={loginError} 
                  type="error" 
                  showIcon 
                  className={styles.errorAlert}
                />
              )}

              <Form 
                form={loginForm} 
                layout="vertical" 
                onFinish={handleLoginSubmit} 
                initialValues={{ remember: false }}
              >
                {/* Email Field */}
                <Form.Item
                  name="email"
                  label={<span className={styles.formLabel}>Email</span>}
                  rules={[
                    { required: true, message: "Vui lòng nhập email của bạn!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                  className={styles.formItem}
                >
                  <Input
                    prefix={<Mail size={18} />}
                    placeholder="Nhập email của bạn"
                    size="large"
                    className={styles.formInput}
                  />
                </Form.Item>

                {/* Password Field */}
                <Form.Item
                  name="password"
                  label={
                    <div className={styles.passwordLabel}>
                      <span className={styles.formLabel}>Mật khẩu</span>
                      <a href="/forgot-password" className={styles.forgotPassword}>
                        Quên mật khẩu?
                      </a>
                    </div>
                  }
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                  ]}
                  className={styles.formItem}
                >
                  <Input.Password
                    prefix={<Lock size={18} />}
                    placeholder="Nhập mật khẩu của bạn"
                    size="large"
                    className={styles.formInput}
                    iconRender={(visible) => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
                  />
                </Form.Item>

                {/* Remember Me Checkbox */}
                <Form.Item name="rememberMe" valuePropName="checked" className={styles.rememberMe}>
                  <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>

                {/* Login Button */}
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    block 
                    loading={authLoading}
                    className={styles.submitButton}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>

                {/* Divider */}
                <Divider plain className={styles.divider}>HOẶC ĐĂNG NHẬP VỚI</Divider>

                {/* Social Login Buttons */}
                <div className={styles.socialButtons}>
                  <SocialLoginButton
                    icon={<FacebookFilled />}
                    title="Facebook"
                    type="facebook"
                    onClick={() => console.log("Facebook login")}
                  />
                  <SocialLoginButton
                    icon={<GoogleOutlined />}
                    title="Google"
                    type="google"
                    onClick={() => console.log("Google login")}
                  />
                </div>

                {/* Sign Up Link */}
                <div className={styles.switchLink}>
                  <Typography.Paragraph className={styles.switchText}>
                    Chưa có tài khoản?{" "}
                    <a
                      href="#"
                      className={styles.switchButton}
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
            className={styles.modal}
          >
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <Typography.Title level={2} className={styles.modalTitle}>
                  Tham gia cùng CareNet
                </Typography.Title>
                <Typography.Paragraph className={styles.modalSubtitle}>
                  Tạo tài khoản để bắt đầu hành trình tình nguyện của bạn
                </Typography.Paragraph>
              </div>

              <Form form={registerForm} layout="vertical" onFinish={handleRegisterSubmit}>
                {/* Full Name Field */}
                <Form.Item
                  name="fullname"
                  label={
                    <span className={styles.formLabel}>
                      Họ và tên <span className={styles.requiredStar}>*</span>
                    </span>
                  }
                  rules={[{ required: true, message: "Vui lòng nhập họ và tên của bạn!" }]}
                  className={styles.formItem}
                >
                  <Input
                    prefix={<User size={18} />}
                    placeholder="Nhập họ và tên của bạn"
                    size="large"
                    className={styles.formInput}
                  />
                </Form.Item>

                {/* Email Field */}
                <Form.Item
                  name="email"
                  label={
                    <span className={styles.formLabel}>
                      Email <span className={styles.requiredStar}>*</span>
                    </span>
                  }
                  rules={[
                    { required: true, message: "Vui lòng nhập email của bạn!" },
                    { type: "email", message: "Email không hợp lệ!" },
                  ]}
                  className={styles.formItem}
                >
                  <Input
                    prefix={<Mail size={18} />}
                    placeholder="Nhập email của bạn"
                    size="large"
                    className={styles.formInput}
                  />
                </Form.Item>

                {/* Password Field */}
                <Form.Item
                  name="password"
                  label={
                    <span className={styles.formLabel}>
                      Mật khẩu <span className={styles.requiredStar}>*</span>
                    </span>
                  }
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu của bạn!" },
                    { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" },
                  ]}
                  extra={<span className={styles.formExtra}>Mật khẩu phải có ít nhất 8 ký tự</span>}
                  className={styles.formItem}
                >
                  <Input.Password
                    prefix={<Lock size={18} />}
                    placeholder="Nhập mật khẩu của bạn"
                    size="large"
                    className={styles.formInput}
                    iconRender={(visible) => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
                  />
                </Form.Item>

                {/* Confirm Password Field */}
                <Form.Item
                  name="confirmPassword"
                  label={
                    <span className={styles.formLabel}>
                      Xác nhận mật khẩu <span className={styles.requiredStar}>*</span>
                    </span>
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
                  className={styles.formItem}
                >
                  <Input.Password
                    prefix={<Lock size={18} />}
                    placeholder="Nhập lại mật khẩu của bạn"
                    size="large"
                    className={styles.formInput}
                    iconRender={(visible) => (visible ? <Eye size={18} /> : <EyeOff size={18} />)}
                  />
                </Form.Item>

                {/* Birth Date Field */}
                <Form.Item 
                  name="dob" 
                  label={<span className={styles.formLabel}>Ngày sinh</span>}
                  className={styles.formItem}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    placeholder="Chọn ngày sinh"
                    format="DD/MM/YYYY"
                    size="large"
                    suffixIcon={<Calendar size={18} />}
                    className={styles.formInput}
                  />
                </Form.Item>

                {/* Phone Field */}
                <Form.Item 
                  name="phone" 
                  label={<span className={styles.formLabel}>Số điện thoại</span>}
                  className={styles.formItem}
                >
                  <Input
                    prefix={<Phone size={18} />}
                    placeholder="Nhập số điện thoại của bạn"
                    size="large"
                    className={styles.formInput}
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
                  className={styles.termsCheckbox}
                >
                  <Checkbox>
                    <span className={styles.termsText}>
                      Tôi đồng ý với{" "}
                      <a href="#terms" className={styles.termsLink}>
                        Điều khoản dịch vụ
                      </a>{" "}
                      và{" "}
                      <a href="#privacy" className={styles.termsLink}>
                        Chính sách bảo mật
                      </a>
                    </span>
                  </Checkbox>
                </Form.Item>

                {/* Register Button */}
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large" 
                    block 
                    loading={authLoading}
                    className={styles.submitButton}
                  >
                    Đăng ký
                  </Button>
                </Form.Item>

                {/* Divider */}
                <Divider plain className={styles.divider}>HOẶC ĐĂNG KÝ VỚI</Divider>

                {/* Social Register Buttons */}
                <div className={styles.socialButtons}>
                  <SocialLoginButton
                    icon={<FacebookFilled />}
                    title="Facebook"
                    type="facebook"
                    onClick={() => console.log("Facebook login")}
                  />
                  <SocialLoginButton
                    icon={<GoogleOutlined />}
                    title="Google"
                    type="google"
                    onClick={() => console.log("Google login")}
                  />
                </div>

                {/* Login Link */}
                <div className={styles.switchLink}>
                  <Typography.Paragraph className={styles.switchText}>
                    Đã có tài khoản?{" "}
                    <a
                      href="#"
                      className={styles.switchButton}
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
