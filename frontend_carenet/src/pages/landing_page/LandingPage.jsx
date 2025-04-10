"use client"
import { Container, Navbar, Nav, Button, Row, Col, Card, Form, Image } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { motion } from "framer-motion"
import '../../css/LandingPage.css'
import VolunteerArticles from "../../components/component_page/news/VolunteerArticle"
import TopCommentsSlider from "../../components/component_page/top_comment/TopComment"
import { comments } from "../../components/component_page/top_comment/MockDataComment"
import CustomNavbar from "../../components/navbar/CustomNavbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Footer } from "../../components/footer/Footer"
import Achievements from "../../components/component_page/achivements/Achivements"
import Services from "../../components/component_page/services/Services"
import styles from '../../css/AppColors.module.css'
import { FaUserPlus, FaClipboardList, FaHandshake, FaUsers } from "react-icons/fa";

function LandingPage() {

  // Initialize state
  const [loading, setLoading] = useState(false);

  // Initialize hook
  const navigate = useNavigate();

  // Bussiness Logic

  // Go to search page
  const handleSearchPage = () => {
    setLoading(true);
    try {
      navigate('/search');
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  // UseEffect 
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [loading]);



  return (
    <div className={`${styles.body} w-100`}>

      {/* Hero Section */}
      <section id="home" className="home-section text-white py-5 position-relative" style={{ marginTop: "80px" }}>
        <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundImage: "url('/volunteer_img/background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
            opacity: 0.85,
          }}
        ></div>

        <Container fluid>
          <Row className="align-items-center px-md-5">
            <Col lg={6} className="mb-4 mb-lg-0">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="display-4 fw-bold mb-3">
                  CareNet kết nối mọi người
                </h1>
                <p className="lead mb-4">
                  Kết nối với những tình nguyện viên có kỹ năng về công nghệ
                  giúp xây dựng, duy trì và cải thiện website cũng như sự hiện diện số
                  của tổ chức bạn.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Button variant="light" size="lg">
                    Tôi Cần Giúp
                  </Button>
                  <Button onClick={() => handleSearchPage()} className="w-25" variant="outline-light" size="lg">
                    {loading ? <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /> : "Kết nối CareNet"}
                  </Button>
                </div>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src="/volunteer_img/banner.jpg"
                  alt="Volunteers collaborating"
                  className="img-fluid rounded-5 shadow"
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>


      {/* Stats Section */}
      <section className="py-5 bg-light">
        <Container fluid>
          <Row className="text-center px-md-5">
            <Col md={4} className="mb-4 mb-md-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="display-4 fw-bold">500+</h2>
                <p className="lead">Tổ Chức Phi Lợi Nhuận Đã Được Giúp Đỡ</p>
              </motion.div>
            </Col>
            <Col md={4} className="mb-4 mb-md-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="display-4 fw-bold">1,200+</h2>
                <p className="lead">Tình Nguyện Viên Công Nghệ</p>
              </motion.div>
            </Col>
            <Col md={4}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="display-4 fw-bold">3,000+</h2>
                <p className="lead">Dự Án Đã Hoàn Thành</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container fluid>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Cách Chúng Tôi Giúp Đỡ</h2>
            <p className="lead text-muted">Kết nối các tổ chức phi lợi nhuận với sự hỗ trợ công nghệ mà họ cần</p>
          </div>
          <Row className="px-md-5">
            <Col md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4 text-center">
                    <div className="mb-3">
                      <i className="bi bi-people-fill text-primary" style={{ fontSize: "2rem" }}></i>
                    </div>
                    <Card.Title className="fw-bold">Tình Nguyện Viên Kỹ Năng</Card.Title>
                    <Card.Text>
                      Tiếp cận mạng lưới các nhà phát triển, nhà thiết kế và nhà tiếp thị kỹ thuật số có kỹ năng muốn đóng góp.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4 text-center">
                    <div className="mb-3">
                      <i className="bi bi-laptop text-primary" style={{ fontSize: "2rem" }}></i>
                    </div>
                    <Card.Title className="fw-bold">Ghép Nối Dự Án</Card.Title>
                    <Card.Text>
                      Nền tảng của chúng tôi thông minh ghép nối nhu cầu của tổ chức bạn với tình nguyện viên có kỹ năng phù hợp.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col md={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4 text-center">
                    <div className="mb-3">
                      <i className="bi bi-graph-up text-primary" style={{ fontSize: "2rem" }}></i>
                    </div>
                    <Card.Title className="fw-bold">Hỗ Trợ Liên Tục</Card.Title>
                    <Card.Text>
                      Nhận hỗ trợ bảo trì trang web, cập nhật và giải quyết vấn đề kỹ thuật khi nhu cầu của bạn thay đổi.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* News */}
      <VolunteerArticles />

      <Achievements />

      {/* How It Works */}
      <section id="how-it-works" className={`py-5 ${styles.containerSecondary}`}>
        <Container fluid>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Vận Hành</h2>
            <p className="lead text-muted">Quy trình đơn giản, kết quả mạnh mẽ</p>
          </div>
          <Row className="g-4 px-md-5">
            <Col md={3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                className="text-center"
              >
                <div
                  className={`${styles.containerPrimary} rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`}
                  style={{ width: "80px", height: "80px" }}
                >
                  <FaUserPlus size={40} color="white" />
                </div>
                <h4>Đăng Ký</h4>
                <p className="text-muted">Tạo tài khoản cho tổ chức phi lợi nhuận của bạn</p>
              </motion.div>
            </Col>

            <Col md={3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div
                  className={`${styles.containerPrimary} rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`}
                  style={{ width: "80px", height: "80px" }}
                >
                  <FaClipboardList size={40} color="white" />
                </div>
                <h4>Mô Tả Nhu Cầu</h4>
                <p className="text-muted">Hãy cho chúng tôi biết về nhu cầu dự án website hoặc công nghệ của bạn</p>
              </motion.div>
            </Col>

            <Col md={3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center"
              >
                <div
                  className={`${styles.containerPrimary} rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`}
                  style={{ width: "80px", height: "80px" }}
                >
                  <FaHandshake size={40} color="white" />
                </div>
                <h4>Kết Nối</h4>
                <p className="text-muted">Chúng tôi sẽ kết nối bạn với các tình nguyện viên phù hợp</p>
              </motion.div>
            </Col>

            <Col md={3}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="text-center"
              >
                <div
                  className={`${styles.containerPrimary} rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`}
                  style={{ width: "80px", height: "80px" }}
                >
                  <FaUsers size={40} color="white" />
                </div>
                <h4>Hợp Tác</h4>
                <p className="text-muted">Làm việc cùng nhau để hoàn thành dự án của bạn</p>
              </motion.div>
            </Col>

          </Row>
        </Container>
      </section>


      <h2 className="display-5 fw-bold text-center mt-4">Dịch vụ CareNet</h2>
      <Services />

      {/* <h2 className="display-5 fw-bold text-center">Top Comments</h2>
      <div className={`container mx-auto py-10 ${styles.containerSecondary}`}>
        <TopCommentsSlider topComments={comments} />
      </div> */}


      {/* Testimonials */}
      <section id="testimonials" className="py-5">
        <Container fluid>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Câu Chuyện Thành Công</h2>
            <p className="lead text-muted">Lắng nghe từ các tổ chức mà chúng tôi đã giúp đỡ</p>
          </div>
          <Row className="px-md-5">
            <Col lg={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        roundedCircle
                        width={60}
                        height={60}
                        className="me-3"
                      />
                      <div>
                        <h5 className="mb-0">Quỹ Bảo Tồn Động Vật Hoang Dã</h5>
                        <small className="text-muted">Tổ Chức Phi Lợi Nhuận Về Môi Trường</small>
                      </div>
                    </div>
                    <Card.Text className="mb-3">
                      "Các tình nguyện viên đã giúp chúng tôi xây dựng lại trang web cũ, giúp trang web thân thiện với thiết bị di động và dễ dàng cập nhật hơn. Số tiền quyên góp đã tăng 30% trong tháng đầu tiên sau khi ra mắt!"
                    </Card.Text>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col lg={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        roundedCircle
                        width={60}
                        height={60}
                        className="me-3"
                      />
                      <div>
                        <h5 className="mb-0">Ngân Hàng Thực Phẩm Cộng Đồng</h5>
                        <small className="text-muted">Tổ Chức An Ninh Lương Thực</small>
                      </div>
                    </div>
                    <Card.Text className="mb-3">
                      "Nhà phát triển tình nguyện của chúng tôi đã tạo ra một hệ thống trực tuyến giúp tối ưu việc theo dõi quyên góp thực phẩm. Việc này từng tốn hàng giờ, giờ đây chỉ mất vài phút!"
                    </Card.Text>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
            <Col lg={4} className="mb-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center mb-4">
                      <Image
                        src="/placeholder.svg?height=60&width=60"
                        roundedCircle
                        width={60}
                        height={60}
                        className="me-3"
                      />
                      <div>
                        <h5 className="mb-0">Chương Trình Hướng Dẫn Thanh Thiếu Niên</h5>
                        <small className="text-muted">Tổ Chức Phi Lợi Nhuận Về Giáo Dục</small>
                      </div>
                    </div>
                    <Card.Text className="mb-3">
                      "Đội ngũ tình nguyện đã xây dựng cho chúng tôi một ứng dụng tùy chỉnh để kết nối cố vấn với học sinh. Đây là một bước ngoặt cho tổ chức nhỏ của chúng tôi."
                    </Card.Text>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className={`py-5 text-white ${styles.containerSecondary}`}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className={`display-5 fw-bold mb-3  ${styles.textPrimary}`}>Đã sẵn sàng để đi cùng CareNet chưa ?</h2>
                <p className="lead mb-4 text-dark">Tham gia cộng đồng các tổ chức phi lợi nhuận và tình nguyện viên công nghệ của chúng tôi ngay hôm nay.</p>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Form className="d-flex gap-2">
                      <Form.Control type="email" placeholder="Enter your email" className="me-2" />
                      <Button variant="dark">Gửi</Button>
                    </Form>
                  </Col>
                </Row>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  )
}

export default LandingPage