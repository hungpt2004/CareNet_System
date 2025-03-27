"use client"

import React, { useState } from 'react'
import {
   Container, Row, Col, Card, Badge, Button,
   ListGroup, Form, Alert, ProgressBar
} from 'react-bootstrap'
import { Calendar, MapPin, Users, Clock, Heart, Share2, ChevronLeft, Star, MessageSquare, Award, Bookmark, CheckCircle, ExternalLink } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import MapComponent from '../../components/map/MapComponent'
import styles from '../../css/AppColors.module.css'

// Custom CSS variables for the color scheme
const customStyles = {
   primaryColor: '#5DB996',
   secondaryColor: '#FBF6E9',
}

// Mock event data
const eventData = {
   id: 1,
   name: "Chiến Dịch Dọn Rác Bãi Biển",
   location: "Công Viên Bãi Biển Ven Biển, 123 Shoreline Dr",
   startDate: "2025-04-15T09:00:00",
   endDate: "2025-04-15T13:00:00",
   category: "Môi Trường",
   description: "Tham gia cùng chúng tôi trong chiến dịch dọn rác bãi biển để bảo vệ sinh vật biển và giữ cho bãi biển luôn sạch đẹp. Sự kiện phù hợp với mọi lứa tuổi và khả năng. Chúng tôi sẽ cung cấp tất cả các thiết bị cần thiết bao gồm găng tay, túi rác và dụng cụ gắp rác. Vui lòng mặc quần áo thoải mái và mang theo kem chống nắng, mũ và chai nước tái sử dụng.",
   longDescription: "Các bãi biển của chúng ta đang phải đối mặt với vấn đề ngày càng nhiều rác thải nhựa và các loại rác khác trôi dạt vào bờ. Điều này không chỉ ảnh hưởng đến vẻ đẹp của bờ biển mà còn gây ra mối đe dọa nghiêm trọng đối với sinh vật biển và hệ sinh thái.\n\nBằng cách tham gia sự kiện dọn rác này, bạn sẽ trực tiếp góp phần cải thiện sức khỏe của môi trường địa phương. Năm ngoái, các tình nguyện viên của chúng tôi đã thu gom được hơn 500 pound rác chỉ trong một ngày!\n\nSự kiện sẽ bắt đầu với phần giới thiệu ngắn về các loại rác thường gặp và cách thu gom an toàn. Sau đó, chúng ta sẽ chia thành các nhóm nhỏ để dọn dẹp từng khu vực của bãi biển. Sau khi dọn xong, chúng ta sẽ tập trung để phân loại và ghi nhận số lượng rác thu thập được nhằm phục vụ mục đích theo dõi môi trường.",
   organizer: "Nhóm Bảo Vệ Đại Dương",
   organizerLogo: "/placeholder.svg?height=50&width=50",
   organizerDescription: "Tổ chức phi lợi nhuận dành cho việc bảo vệ hệ sinh thái biển thông qua giáo dục, vận động và hành động trực tiếp.",
   participants: 45,
   maxParticipants: 75,
   skills: ["Không cần kinh nghiệm", "Chào đón mọi lứa tuổi", "Hoạt động thể chất: Nhẹ nhàng"],
   whatToBring: ["Quần áo thoải mái", "Kem chống nắng", "Mũ", "Chai nước tái sử dụng"],
   whatProvided: ["Găng tay", "Túi rác", "Dụng cụ gắp rác", "Nước giải khát"],
   coordinates: { lat: 10.762622, lng: 106.660172 },
   image: "/placeholder.svg?height=400&width=800",
   gallery: [
      "https://i.pinimg.com/736x/e7/04/56/e7045643b35fba6754bf68e0dcae3bb0.jpg",
      "https://i.pinimg.com/736x/b5/7d/f5/b57df5976700b222adc77766fc0e232e.jpg",
      "https://i.pinimg.com/736x/00/27/65/002765ee261fbc54e8d549ea4cf2cd7e.jpg",
      "https://i.pinimg.com/736x/d0/5a/69/d05a697a30fa47e016c2fded0cf2350a.jpg"
   ],
   reviews: [
      {
         id: 1,
         user: "Sarah Johnson",
         avatar: "https://i.pinimg.com/736x/25/33/8f/25338f488af2c45912c15ebab325e363.jpg",
         date: "2024-03-10",
         rating: 5,
         comment: "Đây là lần đầu tiên tôi tham gia dọn rác bãi biển và đó là một trải nghiệm tuyệt vời! Những người tổ chức rất thân thiện và mọi thứ được sắp xếp rất chu đáo."
      },
      {
         id: 2,
         user: "Michael Chen",
         avatar: "https://i.pinimg.com/736x/8d/e6/21/8de621e960298a6c9374933bbd91a69d.jpg",
         date: "2024-03-05",
         rating: 4,
         comment: "Sự kiện rất phù hợp cho gia đình. Các con tôi đã học được rất nhiều về bảo vệ môi trường trong khi vẫn vui chơi. Chắc chắn sẽ tham gia lần nữa."
      },
      {
         id: 3,
         user: "Emily Rodriguez",
         avatar: "https://i.pinimg.com/736x/3a/7a/37/3a7a37a296e99f1709212644c9e3d141.jpg",
         date: "2024-02-28",
         rating: 5,
         comment: "Sự kiện được tổ chức rất tốt. Tôi rất ấn tượng với lượng rác chúng tôi đã thu gom được và tác động mà chúng tôi tạo ra chỉ trong vài giờ."
      }
   ]
}


export default function EventDetail() {
   const [isFavorite, setIsFavorite] = useState(false)
   const [reviewText, setReviewText] = useState('')
   const [rating, setRating] = useState(0)
   const [showThankYou, setShowThankYou] = useState(false)
   const navigate = useNavigate();

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
      navigate('/form-register')
   }

   const handleBackBeforePage = () => {
      navigate('/search');
   }

   // Calculate average rating
   const averageRating = eventData.reviews.reduce((acc, review) => acc + review.rating, 0) / eventData.reviews.length

   // Calculate participation percentage
   const participationPercentage = (eventData.participants / eventData.maxParticipants) * 100

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
                     src={"https://i.pinimg.com/736x/59/68/16/5968160f97edba47dcc44a41d89829d5.jpg"}
                     alt={eventData.name}
                     className="w-100 object-fit-cover"
                     style={{ maxHeight: '400px' }}
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-3"
                     style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
                     <Badge
                        className="mb-2"
                        style={{ backgroundColor: customStyles.primaryColor }}
                     >
                        {eventData.category}
                     </Badge>
                     <h1 className="text-white mb-0">{eventData.name}</h1>
                  </div>
               </div>

               <Card.Body className="p-4">
                  <Row>
                     <Col md={8}>
                        <div className="d-flex align-items-center mb-3">
                           <Calendar size={20} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <strong>{formatDate(eventData.startDate)}</strong>
                              <div className="text-muted">
                                 {formatTime(eventData.startDate)} - {formatTime(eventData.endDate)}
                              </div>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                           <MapPin size={20} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <strong>{eventData.location}</strong>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                           <Users size={20} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <strong>{eventData.participants} người tham gia</strong>
                              <div className="text-muted">{eventData.maxParticipants - eventData.participants} spots left</div>
                           </div>
                        </div>

                        <div className="mb-3">
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
                        </div>
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
                        <h3 className="mb-3">Thông tin về sự kiện này</h3>
                        <p className="mb-4">{eventData.description}</p>
                        <p style={{ whiteSpace: 'pre-line' }}>{eventData.longDescription}</p>
                     </Card.Body>
                  </Card>

                  {/* What to Expect */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <h3 className="mb-3">Điều mong đợi ?</h3>

                        <h5 className="mb-2">Kĩ năng yêu cầu</h5>
                        <div className="d-flex flex-wrap gap-2 mb-4">
                           {eventData.skills.map((skill, index) => (
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

                        <Row className="mb-3">
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
                        </Row>
                     </Card.Body>
                  </Card>

                  {/* Photo Gallery */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <h3 className="mb-3">Ảnh của sự kiện</h3>
                        <div className="d-flex gap-2 flex-wrap">
                           {eventData.gallery.map((photo, index) => (
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
                              <span className="text-muted ms-1">({eventData.reviews.length})</span>
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
                              <h5 className="mb-3">Share Your Experience</h5>
                              <Form onSubmit={handleReviewSubmit}>
                                 <Form.Group className="mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                       <Form.Label className="mb-0 me-2">Your Rating:</Form.Label>
                                       <div>
                                          {[...Array(5)].map((_, i) => (
                                             <Star
                                                key={i}
                                                size={20}
                                                className={`cursor-pointer ${i < rating ? 'fill-current' : ''}`}
                                                style={{
                                                   color: i < rating ? '#FFD700' : '#e0e0e0',
                                                   cursor: 'pointer'
                                                }}
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
                           {eventData.reviews.map((review) => (
                              <div key={review.id} className="mb-4 pb-4 border-bottom">
                                 <div className="d-flex mb-2">
                                    <img
                                       src={review.avatar || "/placeholder.svg"}
                                       alt={review.user}
                                       className="rounded-circle me-2"
                                       width="40"
                                       height="40"
                                    />
                                    <div>
                                       <h6 className="mb-0">{review.user}</h6>
                                       <div className="d-flex align-items-center">
                                          <small className="text-muted me-2">
                                             {new Date(review.date).toLocaleDateString()}
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
                                 <p className="mb-0">{review.comment}</p>
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
                        <h3 className="mb-3">Organizer</h3>
                        <div className="d-flex align-items-center mb-3">
                           <img
                              src={eventData.organizerLogo || "/placeholder.svg"}
                              alt={eventData.organizer}
                              className="rounded-circle me-3"
                              width="50"
                              height="50"
                           />
                           <div>
                              <h5 className="mb-0">{eventData.organizer}</h5>
                              <div className="d-flex align-items-center">
                                 <Award size={14} className="me-1" style={{ color: customStyles.primaryColor }} />
                                 <small>Verified Organizer</small>
                              </div>
                           </div>
                        </div>
                        <p className="mb-3">{eventData.organizerDescription}</p>
                        <Button
                           variant="outline-primary"
                           className="w-100"
                           style={{
                              borderColor: customStyles.primaryColor,
                              color: customStyles.primaryColor
                           }}
                        >
                           View Organizer Profile
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
                                 <MapComponent />
                              </div>

                           </div>
                           <h5>{eventData.location}</h5>
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
                  <h2 className="text-white mb-3">Ready to Make a Difference?</h2>
                  <p className="text-white mb-4">Join {eventData.participants} others and be part of this amazing volunteer opportunity.</p>
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
                        Register Now
                     </Button>
                  </Link>
               </Card.Body>
            </Card>
         </Container>
      </Container>
   )
}
