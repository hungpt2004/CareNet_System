"use client"
import { Container, Navbar, Nav, Button, Row, Col, Card, Form, Image, Modal } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { motion } from "framer-motion"
import '../../css/LandingPage.css'
import VolunteerArticles from "../../components/component_page/news/VolunteerArticle"
import TopCommentsSlider from "../../components/component_page/top_comment/TopComment"
import { comments } from "../../components/component_page/top_comment/MockDataComment"
import CustomNavbar from "../../components/navbar/CustomNavbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { Footer } from "../../components/footer/Footer"
import Achievements from "../../components/component_page/achivements/Achivements"
import Services from "../../components/component_page/services/Services"
import styles from '../../css/AppColors.module.css'
import { FaUserPlus, FaClipboardList, FaHandshake, FaUsers, FaComments } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function LandingPage() {

  // Initialize state
  const [loading, setLoading] = useState(false);
  const [isChat, setIsChat] = useState(false);
  const chatContainerRef = useRef(null); // Tham chiếu tới container chat

  // Add new state for floating chat
  const [isFloatingChatOpen, setIsFloatingChatOpen] = useState(false);
  const floatingChatRef = useRef(null);

  // Hàm cuộn xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [isChat]); // Mỗi khi cửa sổ chat mở hoặc có tin nhắn mới

  // Add useEffect for handling clicks outside the chat window
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (floatingChatRef.current && !floatingChatRef.current.contains(event.target)) {
        setIsFloatingChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <div className={`${styles.body} w-100 position-relative`}>

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

                  <div className="flex-column">

                    <motion.div
                      initial={{ opacity: 0, y: 50 }}  // Hiệu ứng khởi tạo (mờ dần và trượt lên)
                      animate={{ opacity: 1, y: 1 }}  // Hiệu ứng khi mở/đóng
                      transition={{ duration: 1 }}  // Thời gian chuyển động
                    >
                      <Button variant="light" size="lg" className={`${isChat ? 'w-100' : ''}`} onClick={() => setIsChat(!isChat)}>
                        {isChat ? 'Đóng Chat' : 'Tôi Cần Giúp'}
                      </Button>
                    </motion.div>

                    {isChat && (

                      <motion.div
                        initial={{ opacity: 0, y: 50 }}  // Hiệu ứng khởi tạo (mờ dần và trượt lên)
                        animate={{ opacity: isChat ? 1 : 0, y: isChat ? 0 : 50 }}  // Hiệu ứng khi mở/đóng
                        transition={{ duration: 0.5 }}  // Thời gian chuyển động
                        style={{
                          position: 'absolute',
                          top: '350px',
                          width: '400px',  // Đặt chiều rộng của khung chat
                        }}
                      >
                        <div className="p-3 mt-3 border rounded bg-secondary shadow-lg" style={{ bottom: '100px' }}>
                          <div className="d-flex justify-content-between aligns-item-center mb-3">
                            <h4 className={`${styles.autoText}`} style={{ letterSpacing: '2px' }}>CHAT BOX CARENET</h4>
                            <IoMdClose size={30} onClick={() => setIsChat(!isChat)} />
                          </div>
                          <div
                            ref={chatContainerRef}
                            style={{
                              height: '200px',
                              overflowY: 'auto',
                              borderBottom: '1px solid #ddd',
                              marginBottom: '10px',
                            }}
                          >
                            {/* Nội dung chat */}
                            <div className={`${styles.messageContainer}`}>
                              <div className={`${styles.carenetMessage}`}>
                                <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
                              </div>
                              <div className={`${styles.userMessage}`}>
                                <p>Tôi cần hỗ trợ về sản phẩm.</p>
                              </div>
                            </div>
                          </div>

                          {/* Các câu hỏi có sẵn */}
                          <div className="d-flex flex-wrap gap-2 mb-3">
                            <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => {
                              // Handle quick reply click
                              const messageArea = document.querySelector('.chat-messages');
                              if (messageArea) {
                                const newMessage = document.createElement('div');
                                newMessage.className = 'mb-3 text-end';
                                newMessage.innerHTML = `
                                  <div class="bg-primary text-white rounded p-2 d-inline-block">
                                    <p class="mb-0">Tôi muốn đăng ký làm tình nguyện viên</p>
                                  </div>
                                `;
                                messageArea.appendChild(newMessage);
                                messageArea.scrollTop = messageArea.scrollHeight;
                              }
                            }}>
                              Đăng ký làm tình nguyện viên
                            </Button>
                            <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => {
                              const messageArea = document.querySelector('.chat-messages');
                              if (messageArea) {
                                const newMessage = document.createElement('div');
                                newMessage.className = 'mb-3 text-end';
                                newMessage.innerHTML = `
                                  <div class="bg-primary text-white rounded p-2 d-inline-block">
                                    <p class="mb-0">Tôi muốn tìm hiểu về các dự án đang diễn ra</p>
                                  </div>
                                `;
                                messageArea.appendChild(newMessage);
                                messageArea.scrollTop = messageArea.scrollHeight;
                              }
                            }}>
                              Dự án đang diễn ra
                            </Button>
                            <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => {
                              const messageArea = document.querySelector('.chat-messages');
                              if (messageArea) {
                                const newMessage = document.createElement('div');
                                newMessage.className = 'mb-3 text-end';
                                newMessage.innerHTML = `
                                  <div class="bg-primary text-white rounded p-2 d-inline-block">
                                    <p class="mb-0">Tôi cần hỗ trợ kỹ thuật</p>
                                  </div>
                                `;
                                messageArea.appendChild(newMessage);
                                messageArea.scrollTop = messageArea.scrollHeight;
                              }
                            }}>
                              Hỗ trợ kỹ thuật
                            </Button>
                            <Button variant="outline-primary" size="sm" className="rounded-pill" onClick={() => {
                              const messageArea = document.querySelector('.chat-messages');
                              if (messageArea) {
                                const newMessage = document.createElement('div');
                                newMessage.className = 'mb-3 text-end';
                                newMessage.innerHTML = `
                                  <div class="bg-primary text-white rounded p-2 d-inline-block">
                                    <p class="mb-0">Tôi muốn tìm hiểu về CareNet</p>
                                  </div>
                                `;
                                messageArea.appendChild(newMessage);
                                messageArea.scrollTop = messageArea.scrollHeight;
                              }
                            }}>
                              Tìm hiểu về CareNet
                            </Button>
                          </div>

                          {/* Input tin nhắn */}
                          <div className="d-flex">
                            <div className="col-md-10">
                              <input
                                type="text"
                                placeholder="Nhập tin nhắn..."
                                className="form-control"
                              />
                            </div>
                            <div className="col-md-2 mx-2">
                              <Button className="w-100 btn btn-success text-center">Gửi</Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                    )}

                  </div>
                  <div>
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}  // Hiệu ứng khởi tạo (mờ dần và trượt lên)
                      animate={{ opacity: 1, y: 1 }}  // Hiệu ứng khi mở/đóng
                      transition={{ duration: 1 }}  // Thời gian chuyển động
                    >
                      <Button onClick={() => handleSearchPage()} className="w-100" variant="outline-light" size="lg">
                        {loading ? <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        /> : "Tìm kiếm cùng CareNet"}
                      </Button>
                    </motion.div>
                  </div>

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
                <h2 className={`${styles.textPrimary} display-4 fw-bold`}>500+</h2>
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
                <h2 className={`${styles.textPrimary} display-4 fw-bold`}>1,200+</h2>
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
                <h2 className={`${styles.textPrimary} display-4 fw-bold`}>3,000+</h2>
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
            <h2 className={`${styles.textPrimary} display-5 fw-bold`}>Cách Chúng Tôi Giúp Đỡ</h2>
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
        <Container className="border-0" fluid>
          <div className="text-center mb-5">
            <h2 className={`${styles.textPrimary} display-5 fw-bold`}>Vận Hành</h2>
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
                  className={`${styles.containerPrimary} border-0 rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3`}
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


      <h2 className={`${styles.textPrimary} display-5 fw-bold text-center mt-4`}>Dịch vụ CareNet</h2>
      <Services />

      <div className={`border-0 mx-5 py-10 ${styles.containerSecondary}`}>
        <TopCommentsSlider topComments={comments} />
      </div>


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

      {/* Floating Chat Button and Window */}
      <div 
        ref={floatingChatRef}
        className="position-fixed"
        style={{ 
          bottom: '20px', 
          right: '20px', 
          zIndex: 1000 
        }}
      >
        {/* Chat Window */}
        {isFloatingChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3 shadow-lg mb-3"
            style={{ 
              width: '350px',
              height: '400px',
              overflow: 'hidden'
            }}
          >
            {/* Chat Header */}
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Chat with CareNet</h5>
              <Button 
                variant="link" 
                className="p-0 text-dark"
                onClick={() => setIsFloatingChatOpen(false)}
              >
                <IoMdClose size={24} />
              </Button>
            </div>

            {/* Chat Messages */}
            <div 
              className="p-3"
              style={{ 
                height: 'calc(100% - 130px)',
                overflowY: 'auto'
              }}
            >
              <div className="mb-3">
                <div className="bg-light rounded p-2 d-inline-block">
                  <p className="mb-0">Xin chào! Tôi có thể giúp gì cho bạn?</p>
                </div>
              </div>
              
              {/* Quick Reply Buttons */}
              <div className="d-flex flex-wrap gap-2 mb-3">
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="rounded-pill"
                  onClick={() => {
                    // Handle quick reply click
                    const messageArea = document.querySelector('.chat-messages');
                    if (messageArea) {
                      const newMessage = document.createElement('div');
                      newMessage.className = 'mb-3 text-end';
                      newMessage.innerHTML = `
                        <div class="bg-primary text-white rounded p-2 d-inline-block">
                          <p class="mb-0">Tôi muốn đăng ký làm tình nguyện viên</p>
                        </div>
                      `;
                      messageArea.appendChild(newMessage);
                      messageArea.scrollTop = messageArea.scrollHeight;
                    }
                  }}
                >
                  Đăng ký làm tình nguyện viên
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="rounded-pill"
                  onClick={() => {
                    const messageArea = document.querySelector('.chat-messages');
                    if (messageArea) {
                      const newMessage = document.createElement('div');
                      newMessage.className = 'mb-3 text-end';
                      newMessage.innerHTML = `
                        <div class="bg-primary text-white rounded p-2 d-inline-block">
                          <p class="mb-0">Tôi muốn tìm hiểu về các dự án đang diễn ra</p>
                        </div>
                      `;
                      messageArea.appendChild(newMessage);
                      messageArea.scrollTop = messageArea.scrollHeight;
                    }
                  }}
                >
                  Dự án đang diễn ra
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="rounded-pill"
                  onClick={() => {
                    const messageArea = document.querySelector('.chat-messages');
                    if (messageArea) {
                      const newMessage = document.createElement('div');
                      newMessage.className = 'mb-3 text-end';
                      newMessage.innerHTML = `
                        <div class="bg-primary text-white rounded p-2 d-inline-block">
                          <p class="mb-0">Tôi cần hỗ trợ kỹ thuật</p>
                        </div>
                      `;
                      messageArea.appendChild(newMessage);
                      messageArea.scrollTop = messageArea.scrollHeight;
                    }
                  }}
                >
                  Hỗ trợ kỹ thuật
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="rounded-pill"
                  onClick={() => {
                    const messageArea = document.querySelector('.chat-messages');
                    if (messageArea) {
                      const newMessage = document.createElement('div');
                      newMessage.className = 'mb-3 text-end';
                      newMessage.innerHTML = `
                        <div class="bg-primary text-white rounded p-2 d-inline-block">
                          <p class="mb-0">Tôi muốn tìm hiểu về CareNet</p>
                        </div>
                      `;
                      messageArea.appendChild(newMessage);
                      messageArea.scrollTop = messageArea.scrollHeight;
                    }
                  }}
                >
                  Tìm hiểu về CareNet
                </Button>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 border-top">
              <div className="d-flex gap-2">
                <Form.Control 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-grow-1"
                />
                <Button variant="primary">Send</Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Floating Chat Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="primary"
            className="rounded-circle p-3 shadow-lg"
            onClick={() => setIsFloatingChatOpen(!isFloatingChatOpen)}
            style={{ 
              width: '60px', 
              height: '60px',
              backgroundColor: styles.containerPrimary,
              border: 'none'
            }}
          >
            <FaComments size={24} />
          </Button>
        </motion.div>
      </div>

    </div >
  )
}

export default LandingPage