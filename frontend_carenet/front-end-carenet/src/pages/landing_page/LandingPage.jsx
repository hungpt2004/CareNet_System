"use client"

import { Container, Navbar, Nav, Button, Row, Col, Card, Form, Image } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { motion } from "framer-motion"
import '../../css/LandingPage.css'
import VolunteerArticles from "../../components/component_page/news/VolunteerArticle"
import TopCommentsSlider from "../../components/component_page/top_comment/TopComment"
import { comments } from "../../components/component_page/top_comment/MockDataComment"
import CustomNavbar from "../../components/navbar/CustomNavbar"

function LandingPage() {
  return (
    <div className="w-100">
      {/* Header/Navigation */}
      <CustomNavbar/>

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
                  Empowering Nonprofits with Tech Volunteers
                </h1>
                <p className="lead mb-4">
                  Connect with skilled tech volunteers who can help build, maintain, and improve your organization's website and digital presence.
                </p>
                <div className="d-flex flex-wrap gap-2">
                  <Button variant="light" size="lg">
                    I Need Help
                  </Button>
                  <Button variant="outline-light" size="lg">
                    I Want to Volunteer
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
                <p className="lead">Nonprofits Helped</p>
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
                <p className="lead">Tech Volunteers</p>
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
                <p className="lead">Projects Completed</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5">
        <Container fluid>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">How We Help</h2>
            <p className="lead text-muted">Connecting nonprofits with the tech support they need</p>
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
                    <Card.Title className="fw-bold">Skilled Volunteers</Card.Title>
                    <Card.Text>
                      Access a network of skilled developers, designers, and digital marketers who want to give back.
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
                    <Card.Title className="fw-bold">Project Matching</Card.Title>
                    <Card.Text>
                      Our platform intelligently matches your organization's needs with volunteers who have the right
                      skills.
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
                    <Card.Title className="fw-bold">Ongoing Support</Card.Title>
                    <Card.Text>
                      Get help with website maintenance, updates, and technical issues as your needs evolve.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* News */}
      <VolunteerArticles/>

      {/* How It Works */}
      <section id="how-it-works" className="py-5 bg-light">
        <Container fluid>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Vận Hành</h2>
            <p className="lead text-muted">Simple process, powerful results</p>
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
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <h3 className="text-white m-0">1</h3>
                </div>
                <h4>Register</h4>
                <p className="text-muted">Create an account for your nonprofit organization</p>
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
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <h3 className="text-white m-0">2</h3>
                </div>
                <h4>Describe Needs</h4>
                <p className="text-muted">Tell us about your website or tech project needs</p>
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
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <h3 className="text-white m-0">3</h3>
                </div>
                <h4>Get Matched</h4>
                <p className="text-muted">We'll match you with qualified volunteers</p>
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
                  className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <h3 className="text-white m-0">4</h3>
                </div>
                <h4>Collaborate</h4>
                <p className="text-muted">Work together to complete your project</p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      <h2 className="display-5 fw-bold text-center">Top Comments</h2>
      <div className="container mx-auto py-10">
        <TopCommentsSlider topComments={comments} />
      </div>


      {/* Testimonials */}
      <section id="testimonials" className="py-5">
        <Container fluid>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Success Stories</h2>
            <p className="lead text-muted">Hear from organizations we've helped</p>
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
                        <h5 className="mb-0">Wildlife Conservation Trust</h5>
                        <small className="text-muted">Environmental Nonprofit</small>
                      </div>
                    </div>
                    <Card.Text className="mb-3">
                      "The volunteers helped us rebuild our outdated website, making it mobile-friendly and easier to
                      update. Donations increased by 30% in the first month after launch!"
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
                        <h5 className="mb-0">Community Food Bank</h5>
                        <small className="text-muted">Food Security Organization</small>
                      </div>
                    </div>
                    <Card.Text className="mb-3">
                      "Our volunteer developer created an online system that streamlined our food donation tracking.
                      What used to take hours now takes minutes!"
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
                        <h5 className="mb-0">Youth Mentorship Program</h5>
                        <small className="text-muted">Education Nonprofit</small>
                      </div>
                    </div>
                    <Card.Text className="mb-3">
                      "The volunteer team built us a custom application to match mentors with students. It's been a
                      game-changer for our small organization."
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
      <section className="py-5 text-white" style={{backgroundColor: '#FBF6E9'}}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col md={10} lg={8} className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="display-5 fw-bold mb-3">Ready to get started?</h2>
                <p className="lead mb-4 text-dark">Join our community of nonprofits and tech volunteers today.</p>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Form className="d-flex gap-2">
                      <Form.Control type="email" placeholder="Enter your email" className="me-2" />
                      <Button variant="light">Sign Up</Button>
                    </Form>
                  </Col>
                </Row>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <Container fluid>
          <Row className="px-md-5">
            <Col md={4} className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">VolunteerTech</h5>
              <p className="mb-3">
                Connecting nonprofits with tech volunteers to create digital solutions that make a difference.
              </p>
              <div className="d-flex gap-2">
                <a href="#" className="text-white">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-instagram"></i>
                </a>
              </div>
            </Col>
            <Col md={2} className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">About</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Our Mission
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Team
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Partners
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Careers
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={2} className="mb-4 mb-md-0">
              <h5 className="fw-bold mb-3">Resources</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Blog
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Guides
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    FAQ
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-white text-decoration-none">
                    Support
                  </a>
                </li>
              </ul>
            </Col>
            <Col md={4}>
              <h5 className="fw-bold mb-3">Contact Us</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-envelope me-2"></i> info@volunteertech.org
                </li>
                <li className="mb-2">
                  <i className="bi bi-telephone me-2"></i> (123) 456-7890
                </li>
                <li className="mb-2">
                  <i className="bi bi-geo-alt me-2"></i> 123 Nonprofit Way, Charity City
                </li>
              </ul>
            </Col>
          </Row>
          <hr className="my-4" />
          <div className="text-center">
            <p className="small mb-0">© {new Date().getFullYear()} VolunteerTech. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}

export default LandingPage