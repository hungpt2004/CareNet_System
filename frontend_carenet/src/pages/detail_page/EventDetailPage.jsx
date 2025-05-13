import React, { useEffect, useState } from 'react'
import {
   Container, Row, Col, Card, Badge, Button,
   ListGroup, Form, Alert, ProgressBar
} from 'react-bootstrap'
import { Calendar, MapPin, Users, Clock, Heart, Share2, ChevronLeft, Star, MessageSquare, Award, Bookmark, CheckCircle, ExternalLink } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MapComponent from '../../components/map/MapComponent'
import styles from '../../css/AppColors.module.css'
import axios from 'axios'

// Custom CSS variables for the color scheme
const customStyles = {
   primaryColor: '#5DB996',
   secondaryColor: '#FBF6E9',
}

const generateLongDescription = (shortDescription) => {
   return `Chào mừng bạn đến với sự kiện đặc biệt của chúng tôi! Chúng tôi rất vui khi bạn quan tâm đến sự kiện này và mong muốn được chào đón bạn tham gia cùng chúng tôi.

${shortDescription}

Sự kiện này được tổ chức với mục tiêu tạo ra không gian giao lưu, học hỏi và kết nối giữa những người có cùng sở thích và đam mê. Đây là cơ hội tuyệt vời để bạn mở rộng mạng lưới quan hệ, cập nhật những xu hướng mới nhất trong ngành và tham gia vào các cuộc thảo luận sâu sắc với các chuyên gia hàng đầu.

Khi tham gia sự kiện, bạn sẽ được:
• Gặp gỡ và kết nối với những người có cùng chí hướng
• Tiếp cận với những kiến thức và công nghệ tiên tiến
• Tham gia các workshop thực hành và phiên thảo luận chuyên sâu
• Cơ hội networking với các chuyên gia trong ngành
• Trải nghiệm không gian sự kiện chuyên nghiệp và thân thiện

Chúng tôi đã chuẩn bị mọi thứ kỹ lưỡng để đảm bảo bạn có trải nghiệm tốt nhất tại sự kiện. Từ nội dung chương trình phong phú đến đội ngũ nhân viên nhiệt tình, tất cả đều hướng đến việc mang lại giá trị thiết thực cho mỗi người tham dự.

`;
};


export default function EventDetail() {
   const [isFavorite, setIsFavorite] = useState(false)
   const { id } = useParams();
   const [eventData, setEventData] = useState(null);
   const [feedbackData, setFeedbackData] = useState([]);
   const [reviewText, setReviewText] = useState('')
   const [rating, setRating] = useState(0)
   const [showThankYou, setShowThankYou] = useState(false)
   const navigate = useNavigate();

   // Get Event Detail
   const fetchEventDetail = async () => {
      try {
         const response = await axios.get(`http://localhost:5000/event/get-event-detail/${id}`);
         if (response.data && response.data.event && response.data.feedback) {
            setEventData(response.data.event);
            setFeedbackData(response.data.feedback);
            console.log(`Lấy thông tin event thành công`)
         }
      } catch (error) {
         console.log(`${error}`);
      }
   }

   console.log(`Du lieu event: ${JSON.stringify(eventData, null, 2)}`);
   console.log(`Du lieu feedback: ${JSON.stringify(feedbackData, null, 2)}`)

   // Format date for display
   const formatDate = (dateString) => {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
   }

   // Format time for display
   const formatTime = (dateString) => {
      const options = { hour: 'numeric', minute: 'numeric', hour12: true }
      return new Date(dateString).toLocaleTimeString(undefined, options)
   }

   // Toggle favorite status
   const toggleFavorite = () => {
      setIsFavorite(!isFavorite)
   }

   // Handle review submission
   const handleReviewSubmit = (e) => {
      e.preventDefault()
      // In a real app, you would send this to your backend
      console.log('Review submitted:', { rating, reviewText })
      setReviewText('')
      setRating(0)
      setShowThankYou(true)
      setTimeout(() => setShowThankYou(false), 3000)
   }

   const handleGotToRegisterForm = () => {
      navigate(`/form-register/${id}`)
   }

   const handleBackBeforePage = () => {
      navigate('/search');
   }

   // Calculate average rating
   const averageRating = feedbackData.reduce((acc, review) => acc + review.rating, 0) / feedbackData.length

   // Calculate participation percentage
   // const participationPercentage = (eventData.participants / eventData.maxParticipants) * 100

   useEffect(() => {
      fetchEventDetail();
   }, []);

   return (
      <Container fluid className={`${styles.body} py-4 min-vh-100`}>
         <Container>
            {/* Back button */}
            <Button
               variant="link"
               className="mb-3 p-0"
               onClick={() => handleBackBeforePage()}
               style={{ color: customStyles.primaryColor }}
            >
               <ChevronLeft size={16} className="me-1" />
               Trở về trang trước đó
            </Button>

            {/* Event Header */}
            <Card className="border-0 shadow-sm mb-4 overflow-hidden">
               <div className="position-relative">
                  <img
                     src={`${eventData?.images[0]}`}
                     alt={eventData?.title}
                     className="w-100 object-fit-cover"
                     style={{ maxHeight: '400px' }}
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-3"
                     style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                     <Badge
                        className="mb-2"
                        style={{ backgroundColor: customStyles.primaryColor }}
                     >
                        {eventData?.category}
                     </Badge>
                     <h1 className="text-white mb-0">{eventData?.title}</h1>
                  </div>
               </div>

               <Card.Body className="p-4">
                  <Row>
                     <Col md={8}>
                        <div className="d-flex align-items-center mb-3">
                           <Calendar size={20} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <strong>{formatDate(eventData?.startAt)}</strong>
                              <div className="text-muted">
                                 {formatTime(eventData?.startAt)} - {formatTime(eventData?.endAt)}
                              </div>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                           <MapPin size={20} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <strong>{eventData?.location.province}</strong>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                           <Users size={20} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <strong>{eventData?.currentParticipants} người tham gia</strong>
                              {/* <div className="text-muted">{eventData.maxParticipants - eventData.participants} spots left</div> */}
                           </div>
                        </div>

                        {/* <div className="mb-3">
                           <ProgressBar
                              now={participationPercentage}
                              style={{
                                 backgroundColor: '#e9ecef',
                                 height: '8px'
                              }}
                           >
                              <ProgressBar
                                 now={participationPercentage}
                                 style={{ backgroundColor: customStyles.primaryColor }}
                              />
                           </ProgressBar>
                           <div className="d-flex justify-content-between mt-1">
                              <small className="text-muted">{eventData.participants} đã tham gia</small>
                              <small className="text-muted">{eventData.maxParticipants} tối đa</small>
                           </div>
                        </div> */}

                     </Col>

                     <Col md={4} className="d-flex flex-column justify-content-between">
                        <div className="d-flex justify-content-end mb-3">
                           <Button
                              variant="outline-secondary"
                              className="me-2"
                              onClick={() => alert('Share functionality would go here')}
                           >
                              <Share2 size={16} className="me-1" />
                              Chia sẻ
                           </Button>
                           <Button
                              variant={isFavorite ? "primary" : "outline-primary"}
                              onClick={toggleFavorite}
                              style={{
                                 backgroundColor: isFavorite ? customStyles.primaryColor : 'white',
                                 borderColor: customStyles.primaryColor,
                                 color: isFavorite ? 'white' : customStyles.primaryColor
                              }}
                           >
                              <Heart size={16} className={`me-1 ${isFavorite ? 'fill-current' : ''}`} />
                              {isFavorite ? 'Saved' : 'Save'}
                           </Button>
                        </div>

                        <div className="mt-auto">
                           <Button
                              onClick={() => handleGotToRegisterForm()}
                              size="lg"
                              className="w-100"
                              style={{
                                 backgroundColor: customStyles.primaryColor,
                                 borderColor: customStyles.primaryColor
                              }}
                           >
                              Ghi danh ngay
                           </Button>
                        </div>
                     </Col>
                  </Row>
               </Card.Body>
            </Card>

            {/* Event Details */}
            <Row className="mb-4">
               <Col lg={8}>
                  {/* Description */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <div className="container mx-auto p-4">
                           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                              <h3 className="text-xl font-bold mb-4">Thông tin về sự kiện này</h3>

                              {/* Hiển thị mô tả dài với mô tả ngắn được nhúng vào giữa */}
                              <div className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>
                                 {generateLongDescription(eventData?.description)}
                              </div>
                           </div>
                        </div>
                     </Card.Body>
                  </Card>

                  {/* What to Expect */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <h3 className="mb-3">Điều mong đợi ?</h3>

                        <h5 className="mb-2">Kĩ năng yêu cầu</h5>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                           {eventData?.skillNeeds.map((skill, index) => (
                              <Badge
                                 key={index}
                                 className="py-2 px-3"
                                 bg="light"
                                 text="dark"
                                 style={{ border: '1px solid #dee2e6' }}
                              >
                                 <CheckCircle size={14} className="me-1" style={{ color: customStyles.primaryColor }} />
                                 {skill}
                              </Badge>
                           ))}
                        </div>

                        {/* <Row className="mb-3">
                           <Col md={6}>
                              <h5 className="mb-2">Cần trang bị gì ?</h5>
                              <ListGroup variant="flush">
                                 {eventData.whatToBring.map((item, index) => (
                                    <ListGroup.Item key={index} className="px-0 py-2 border-0">
                                       <CheckCircle size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                                       {item}
                                    </ListGroup.Item>
                                 ))}
                              </ListGroup>
                           </Col>

                           <Col md={6}>
                              <h5 className="mb-2">Vật dụng cung cấp</h5>
                              <ListGroup variant="flush">
                                 {eventData.whatProvided.map((item, index) => (
                                    <ListGroup.Item key={index} className="px-0 py-2 border-0">
                                       <CheckCircle size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                                       {item}
                                    </ListGroup.Item>
                                 ))}
                              </ListGroup>
                           </Col>
                        </Row> */}

                     </Card.Body>
                  </Card>

                  {/* Photo Gallery */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <h3 className="mb-3">Ảnh của sự kiện</h3>
                        <div className="d-flex gap-2 flex-wrap">
                           {eventData?.images.map((photo, index) => (
                              <img
                                 key={index}
                                 src={photo || "/placeholder.svg"}
                                 alt={`Event photo ${index + 1}`}
                                 className="rounded"
                                 style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                              />
                           ))}
                        </div>
                     </Card.Body>
                  </Card>

                  {/* Reviews */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                           <h3 className="mb-0">Đánh giá của tình nguyện viên</h3>
                           <div className="d-flex align-items-center">
                              <div className="me-2">
                                 {[...Array(5)].map((_, i) => (
                                    <Star
                                       key={i}
                                       size={16}
                                       className={i < Math.round(averageRating) ? 'fill-current' : ''}
                                       style={{ color: i < Math.round(averageRating) ? '#FFD700' : '#e0e0e0' }}
                                    />
                                 ))}
                              </div>
                              <span className="fw-bold">{averageRating.toFixed(1)}</span>
                              <span className="text-muted ms-1">({feedbackData.length})</span>
                           </div>
                        </div>

                        {showThankYou && (
                           <Alert variant="success" className="mb-4">
                              Cảm ơn vì đã góp ý cho {eventData.name}
                           </Alert>
                        )}

                        {/* Review Form */}
                        <Card className="bg-light border-0 mb-4">
                           <Card.Body className="p-3">
                              <h5 className="mb-3">Chia sẻ trải nghiệm</h5>
                              <Form onSubmit={handleReviewSubmit}>
                                 <Form.Group className="mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                       <Form.Label className="mb-0 me-2">Mức độ đánh giá:</Form.Label>
                                       <div>
                                          {[...Array(5)].map((_, i) => (
                                             <Star
                                                key={i}
                                                size={20}
                                                fill={i < rating ? '#FFD700' : 'transparent'}
                                                stroke={i < rating ? '#FFD700' : '#e0e0e0'}
                                                strokeWidth={2}
                                                className="mx-1 cursor-pointer"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => setRating(i + 1)}
                                             />
                                          ))}
                                       </div>
                                    </div>
                                 </Form.Group>
                                 <Form.Group className="mb-3">
                                    <Form.Control
                                       as="textarea"
                                       rows={3}
                                       placeholder="Share your experience with this event..."
                                       value={reviewText}
                                       onChange={(e) => setReviewText(e.target.value)}
                                    />
                                 </Form.Group>
                                 <Button
                                    type="submit"
                                    style={{
                                       backgroundColor: customStyles.primaryColor,
                                       borderColor: customStyles.primaryColor
                                    }}
                                 >
                                    Gửi đánh giá
                                 </Button>
                              </Form>
                           </Card.Body>
                        </Card>

                        {/* Review List */}
                        <div>
                           {feedbackData.map((review, index) => (
                              <div key={index} className="mb-4 pb-4 border-bottom">
                                 <div className="d-flex mb-2">
                                    <img
                                       src={review.avatar || "/placeholder.svg"}
                                       alt={review.userId.fullname}
                                       className="rounded-circle me-2"
                                       width="40"
                                       height="40"
                                    />
                                    <div>
                                       <h6 className="mb-0">{review.userId.fullname}</h6>
                                       <div className="d-flex align-items-center">
                                          <small className="text-muted me-2">
                                             {new Date(review.createdAt).toLocaleDateString()}
                                          </small>
                                          <div>
                                             {[...Array(5)].map((_, i) => (
                                                <Star
                                                   key={i}
                                                   size={12}
                                                   className={i < review.rating ? 'fill-current' : ''}
                                                   style={{ color: i < review.rating ? '#FFD700' : '#e0e0e0' }}
                                                />
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <p className="mb-0">{review.content}</p>
                              </div>
                           ))}
                        </div>
                     </Card.Body>
                  </Card>
               </Col>

               <Col lg={4}>
                  {/* Organizer Info */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <div className="d-flex align-items-center mb-3">
                           <img
                              src={eventData?.organizerLogo || "/placeholder.svg"}
                              alt={eventData?.organizationId.name}
                              className="rounded-circle me-3"
                              width="50"
                              height="50"
                           />
                           <div>
                              <h5 className="mb-0">{eventData?.organizationId.name}</h5>
                              <div className="d-flex align-items-center">
                                 <Award size={14} className="me-1" style={{ color: customStyles.primaryColor }} />
                                 <small>Tổ chức đã được xác minh</small>
                              </div>
                           </div>
                        </div>
                        <p className="mb-3">{eventData?.organizationId.description}</p>
                        <Button
                           variant="outline-primary"
                           className="w-100"
                           style={{
                              borderColor: customStyles.primaryColor,
                              color: customStyles.primaryColor
                           }}
                        >
                           Xem thông tin
                        </Button>
                     </Card.Body>
                  </Card>

                  {/* Location Map */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <h3 className="mb-3">Location</h3>
                        <div className="mb-3">
                           <div
                              className="bg-light rounded mb-3"
                              style={{ height: '200px', position: 'relative' }}
                           >
                              {/* Placeholder for map - in a real implementation, you would integrate a map library here */}
                              <div style={{ height: '20px' }}>
                                 <MapComponent province={eventData?.location.province} district={eventData?.location.district} ward={eventData?.location.ward} />
                              </div>

                           </div>
                           <h5>{eventData?.location.province}</h5>
                           <Button
                              variant="outline-secondary"
                              className="w-100"
                              onClick={() => window.open(`https://maps.google.com/?q=${eventData.location}`, '_blank')}
                           >
                              <ExternalLink size={16} className="me-1" />
                              Get Directions
                           </Button>
                        </div>
                     </Card.Body>
                  </Card>

                  {/* Similar Events */}
                  <Card className="border-0 shadow-sm">
                     <Card.Body className="p-4">
                        <h3 className="mb-3">Sự Kiện Tương Tự</h3>
                        <div className="d-flex flex-column gap-3">
                           {[1, 2, 3].map((item) => (
                              <div key={item} className="d-flex">
                                 <img
                                    src="https://i.pinimg.com/736x/49/9e/14/499e14f2275c85224394c4ba8934083c.jpg"
                                    alt="Hình thu nhỏ sự kiện"
                                    className="rounded me-3"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                 />
                                 <div>
                                    <h6 className="mb-1">Sáng Kiến Trồng Cây</h6>
                                    <div className="d-flex align-items-center text-muted small mb-1">
                                       <Calendar size={12} className="me-1" />
                                       20 Tháng 4, 2025
                                    </div>
                                    <div className="d-flex align-items-center text-muted small">
                                       <MapPin size={12} className="me-1" />
                                       Công Viên Rừng Đô Thị
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <Button
                           variant="link"
                           className="w-100 mt-3 text-decoration-none"
                           style={{ color: customStyles.primaryColor }}
                        >
                           Xem Thêm Sự Kiện
                        </Button>
                     </Card.Body>
                  </Card>

               </Col>
            </Row>

            {/* Call to Action */}
            <Card
               className="border-0 shadow-sm mb-4 text-center"
               style={{ backgroundColor: customStyles.primaryColor }}
            >
               <Card.Body className="p-4">
                  <h2 className="text-white mb-3">Sẵn Sàng Tạo Nên Sự Thay Đổi?</h2>
                  <p className="text-white mb-4">Tham gia cùng {eventData?.currentParticipants} người khác và trở thành một phần của cơ hội tình nguyện tuyệt vời này.</p>
                  <Link href={`/form-register`} >
                     <Button
                        size="lg"
                        onClick={() => handleGotToRegisterForm()}
                        style={{
                           backgroundColor: 'white',
                           color: customStyles.primaryColor,
                           borderColor: 'white'
                        }}
                     >
                        Ghi danh ngay
                     </Button>
                  </Link>
               </Card.Body>
            </Card>
         </Container>
      </Container>
   )
}
