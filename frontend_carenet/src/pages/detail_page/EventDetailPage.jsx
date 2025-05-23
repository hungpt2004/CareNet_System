import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, Alert } from 'react-bootstrap';
import { Calendar, MapPin, Users, Heart, Share2, Star, MessageSquare, Award, ExternalLink } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MapComponent from '../../components/map/MapComponent';
import styles from '../../css/AppColors.module.css';
import axios from 'axios';

const customStyles = {
  primaryColor: '#5DB996',
  secondaryColor: '#FBF6E9',
};

const generateLongDescription = (shortDescription) => {
  return `Chào mừng bạn đến với sự kiện đặc biệt của chúng tôi! Chúng tôi rất vui khi bạn quan tâm đến sự kiện này và mong muốn được chào đón bạn tham gia cùng chúng tôi.

${shortDescription}

Sự kiện này được tổ chức với mục tiêu tạo ra không gian giao lưu, học hỏi và kết nối giữa những người có cùng sở thích và đam mê. Đây là cơ hội tuyệt vời để bạn mở rộng mạng lưới quan hệ, cập nhật những xu hướng mới nhất trong ngành và tham gia vào các cuộc thảo luận sâu sắc với các chuyên gia hàng đầu.

Khi tham gia sự kiện, bạn sẽ được:
• Gặp gỡ và kết nối với những người có cùng chí hướng
• Tiếp cận với những kiến thức và công nghệ tiên tiến
• Tham gia các workshop thực hành và phiên thảo luận chuyên sâu
• Cơ hội networking với các chuyên gia trong ngành
• Trải nghiệm không gian sự kiện chuyên nghiệp và thân thiện`;
};

export default function EventDetail() {
  const [isFavorite, setIsFavorite] = useState(false);
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [feedbackData, setFeedbackData] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const navigate = useNavigate();

  const fetchEventDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/event/get-event-detail/${id}`);
      if (response.data && response.data.event && response.data.feedback) {
        setEventData(response.data.event);
        setFeedbackData(response.data.feedback);
        console.log('Lấy thông tin event thành công');
      }
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    console.log('Review submitted:', { rating, reviewText });
    setReviewText('');
    setRating(0);
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 3000);
  };

  const handleGotToRegisterForm = () => {
    navigate(`/form-register/${id}`);
  };

  const averageRating = feedbackData.length
    ? feedbackData.reduce((acc, review) => acc + review.rating, 0) / feedbackData.length
    : 0;

  useEffect(() => {
    fetchEventDetail();
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ minHeight: '80vh', maxWidth: '900px', margin: 'auto' }}
    >
      <Container fluid className={`${styles.body} py-3`}>
        <Container>
          {/* Event Header */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-sm mb-3 overflow-hidden">
              <div className="position-relative">
                <motion.img
                  src={eventData?.images[0] || '/placeholder.svg'}
                  alt={eventData?.title}
                  className="w-100 object-fit-cover"
                  style={{ maxHeight: '300px' }}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <div
                  className="position-absolute bottom-0 start-0 w-100 p-2"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}
                >
                  <Badge style={{ backgroundColor: customStyles.primaryColor }} className="mb-1">
                    {eventData?.category}
                  </Badge>
                  <h3 className="text-white mb-0">{eventData?.title}</h3>
                </div>
              </div>
              <Card.Body className="p-3">
                <Row>
                  <Col md={8}>
                    <motion.div
                      className="d-flex align-items-center mb-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Calendar size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                      <div>
                        <strong>{eventData?.startAt && formatDate(eventData.startAt)}</strong>
                        <div className="text-muted small">
                          {eventData?.startAt && formatTime(eventData.startAt)} -{' '}
                          {eventData?.endAt && formatTime(eventData.endAt)}
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="d-flex align-items-center mb-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <MapPin size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                      <strong>{eventData?.location.province}</strong>
                    </motion.div>
                    <motion.div
                      className="d-flex align-items-center mb-2"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Users size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                      <strong>{eventData?.currentParticipants} người tham gia</strong>
                    </motion.div>
                  </Col>
                  <Col md={4} className="d-flex flex-column justify-content-between">
                    <motion.div
                      className="d-flex justify-content-end mb-2"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.button
                        variant="outline-secondary"
                        className="me-2 btn btn-outline-secondary"
                        onClick={() => alert('Share functionality would go here')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Share2 size={14} className="me-1" />
                        Chia sẻ
                      </motion.button>
                      <motion.button
                        variant={isFavorite ? 'primary' : 'outline-primary'}
                        className={`btn ${isFavorite ? '' : 'btn-outline-primary'}`}
                        onClick={toggleFavorite}
                        style={{
                          backgroundColor: isFavorite ? customStyles.primaryColor : 'white',
                          borderColor: customStyles.primaryColor,
                          color: isFavorite ? 'white' : customStyles.primaryColor,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart size={14} className={`me-1 ${isFavorite ? 'fill-current' : ''}`} />
                        {isFavorite ? 'Saved' : 'Save'}
                      </motion.button>
                    </motion.div>
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        onClick={handleGotToRegisterForm}
                        className="w-100"
                        style={{
                          backgroundColor: customStyles.primaryColor,
                          borderColor: customStyles.primaryColor,
                        }}
                      >
                        Ghi danh ngay
                      </Button>
                    </motion.div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>

          {/* Event Details */}
          <Row className="mb-3">
            <Col lg={8}>
              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Body className="p-3">
                    <h4 className="mb-3">Thông tin về sự kiện này</h4>
                    <div className="text-gray-600" style={{ whiteSpace: 'pre-line', fontSize: '14px' }}>
                      {eventData?.description && generateLongDescription(eventData.description)}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>

              {/* What to Expect */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Body className="p-3">
                    <h4 className="mb-3">Điều mong đợi?</h4>
                    <h5 className="mb-2">Kĩ năng yêu cầu</h5>
                    <div className="d-flex flex-wrap gap-2">
                      {eventData?.skillNeeds?.map((skill, index) => (
                        <motion.div
                          key={index}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                        >
                          <Badge
                            className="py-1 px-2"
                            bg="light"
                            text="dark"
                            style={{ border: '1px solid #dee2e6', fontSize: '12px' }}
                          >
                            {skill}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>

              {/* Photo Gallery */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Body className="p-3">
                    <h4 className="mb-3">Ảnh của sự kiện</h4>
                    <div className="d-flex gap-2 flex-wrap">
                      {eventData?.images?.map((photo, index) => (
                        <motion.img
                          key={index}
                          src={photo || '/placeholder.svg'}
                          alt={`Event photo ${index + 1}`}
                          className="rounded"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.1 + index * 0.1 }}
                        />
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>

              {/* Reviews */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Body className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4 className="mb-0">Đánh giá</h4>
                      <div className="d-flex align-items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.round(averageRating) ? 'fill-current' : ''}
                            style={{ color: i < Math.round(averageRating) ? '#FFD700' : '#e0e0e0' }}
                          />
                        ))}
                        <span className="ms-1 small">{averageRating.toFixed(1)} ({feedbackData.length})</span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {showThankYou && (
                        <motion.div
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Alert variant="success" className="mb-3">
                            Cảm ơn vì đã góp ý!
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Review Form */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1.3 }}
                    >
                      <Card className="bg-light border-0 mb-3">
                        <Card.Body className="p-2">
                          <h5 className="mb-2">Chia sẻ trải nghiệm</h5>
                          <Form onSubmit={handleReviewSubmit}>
                            <Form.Group className="mb-2">
                              <div className="d-flex align-items-center mb-2">
                                <Form.Label className="mb-0 me-2 small">Đánh giá:</Form.Label>
                                <div>
                                  {[...Array(5)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      whileHover={{ scale: 1.2 }}
                                      style={{ display: 'inline-block' }}
                                    >
                                      <Star
                                        size={16}
                                        fill={i < rating ? '#FFD700' : 'transparent'}
                                        stroke={i < rating ? '#FFD700' : '#e0e0e0'}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => setRating(i + 1)}
                                      />
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </Form.Group>
                            <Form.Group className="mb-2">
                              <Form.Control
                                as="textarea"
                                rows={2}
                                placeholder="Chia sẻ trải nghiệm của bạn..."
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                style={{ fontSize: '12px' }}
                              />
                            </Form.Group>
                            <motion.button
                              type="submit"
                              className="btn"
                              style={{
                                backgroundColor: customStyles.primaryColor,
                                borderColor: customStyles.primaryColor,
                                color: 'white',
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Gửi đánh giá
                            </motion.button>
                          </Form>
                        </Card.Body>
                      </Card>
                    </motion.div>

                    {/* Review List */}
                    <div>
                      {feedbackData.map((review, index) => (
                        <motion.div
                          key={index}
                          className="mb-3 pb-3 border-bottom"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.4 + index * 0.1 }}
                        >
                          <div className="d-flex mb-2">
                            <img
                              src={review.avatar || '/placeholder.svg'}
                              alt={review.userId?.fullname}
                              className="rounded-circle me-2"
                              width="32"
                              height="32"
                            />
                            <div>
                              <h6 className="mb-0 small">{review.userId?.fullname}</h6>
                              <div className="d-flex align-items-center">
                                <small className="text-muted me-2">
                                  {new Date(review.createdAt).toLocaleDateString()}
                                </small>
                                <div>
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={10}
                                      className={i < review.rating ? 'fill-current' : ''}
                                      style={{ color: i < review.rating ? '#FFD700' : '#e0e0e0' }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mb-0 small">{review.content}</p>
                        </motion.div>
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>

            <Col lg={4}>
              {/* Organizer Info */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center mb-2">
                      <img
                        src={eventData?.organizerLogo || '/placeholder.svg'}
                        alt={eventData?.organizationId?.name}
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <div>
                        <h5 className="mb-0 small">{eventData?.organizationId?.name}</h5>
                        <div className="d-flex align-items-center">
                          <Award size={12} className="me-1" style={{ color: customStyles.primaryColor }} />
                          <small>Đã xác minh</small>
                        </div>
                      </div>
                    </div>
                    <p className="mb-2 small">{eventData?.organizationId?.description}</p>
                    <motion.button
                      variant="outline-primary"
                      className="btn btn-outline-primary w-100"
                      style={{ fontSize: '12px' }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Xem thông tin
                    </motion.button>
                  </Card.Body>
                </Card>
              </motion.div>

              {/* Location Map */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.7 }}
              >
                <Card className="border-0 shadow-sm mb-3">
                  <Card.Body className="p-3">
                    <h4 className="mb-2">Vị trí</h4>
                    <div className="mb-2">
                      <div className="bg-light rounded mb-2" style={{ height: '150px' }}>
                        <MapComponent
                          province={eventData?.location?.province}
                          district={eventData?.location?.district}
                          ward={eventData?.location?.ward}
                        />
                      </div>
                      <h5 className="small">{eventData?.location?.province}</h5>
                      <motion.button
                        variant="outline-secondary"
                        className="btn btn-outline-secondary w-100"
                        onClick={() =>
                          window.open(`https://maps.google.com/?q=${eventData?.location?.province}`, '_blank')
                        }
                        style={{ fontSize: '12px' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={14} className="me-1" />
                        Chỉ đường
                      </motion.button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>

              {/* Similar Events */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <Card className="border-0 shadow-sm">
                  <Card.Body className="p-3">
                    <h4 className="mb-2">Sự kiện tương tự</h4>
                    <div className="d-flex flex-column gap-2">
                      {[1, 2, 3].map((item) => (
                        <motion.div
                          key={item}
                          className="d-flex"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.9 + item * 0.1 }}
                        >
                          <img
                            src="https://i.pinimg.com/736x/49/9e/14/499e14f2275c85224394c4ba8934083c.jpg"
                            alt="Hình thu nhỏ sự kiện"
                            className="rounded me-2"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                          <div>
                            <h6 className="mb-1 small">Sáng Kiến Trồng Cây</h6>
                            <div className="d-flex align-items-center text-muted small mb-1">
                              <Calendar size={10} className="me-1" />
                              20 Tháng 4, 2025
                            </div>
                            <div className="d-flex align-items-center text-muted small">
                              <MapPin size={10} className="me-1" />
                              Công Viên Rừng Đô Thị
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      variant="link"
                      className="btn btn-link w-100 mt-2 text-decoration-none"
                      style={{ color: customStyles.primaryColor, fontSize: '12px' }}
                      whileHover={{ scale: 1.05 }}
                    >
                      Xem thêm sự kiện
                    </motion.button>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>

          {/* Call to Action */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.0 }}
          >
            <Card className="border-0 shadow-sm text-center" style={{ backgroundColor: customStyles.primaryColor }}>
              <Card.Body className="p-3">
                <h2 className="text-white mb-2">Sẵn sàng tạo nên sự thay đổi?</h2>
                <p className="text-white mb-3 small">
                  Tham gia cùng {eventData?.currentParticipants} người khác trong cơ hội tình nguyện này.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleGotToRegisterForm}
                    style={{
                      backgroundColor: 'white',
                      color: customStyles.primaryColor,
                      borderColor: 'white',
                    }}
                  >
                    Ghi danh ngay
                  </Button>
                </motion.div>
              </Card.Body>
            </Card>
          </motion.div>
        </Container>
      </Container>
    </motion.div>
  );
}