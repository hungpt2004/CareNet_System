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
   name: "Beach Cleanup Drive",
   location: "Coastal Beach Park, 123 Shoreline Dr",
   startDate: "2025-04-15T09:00:00",
   endDate: "2025-04-15T13:00:00",
   category: "Environment",
   description: "Join us for a community beach cleanup to protect marine life and keep our beaches beautiful. This event is suitable for all ages and abilities. We'll provide all necessary equipment including gloves, trash bags, and trash pickers. Please wear comfortable clothes and bring sunscreen, a hat, and a reusable water bottle.",
   longDescription: "Our beaches are facing a crisis with increasing amounts of plastic and other waste washing up on our shores. This not only affects the beauty of our coastlines but also poses a serious threat to marine life and ecosystems.\n\nBy participating in this cleanup event, you'll be making a direct impact on the health of our local environment. Last year, our volunteers collected over 500 pounds of trash in just one day!\n\nThe event will begin with a brief orientation about the types of waste we commonly find and how to safely collect them. We'll then break into small teams to cover different sections of the beach. After the cleanup, we'll gather to sort and record the waste collected for environmental monitoring purposes.",
   organizer: "Ocean Conservation Group",
   organizerLogo: "/placeholder.svg?height=50&width=50",
   organizerDescription: "A non-profit organization dedicated to protecting marine ecosystems through education, advocacy, and direct action.",
   participants: 45,
   maxParticipants: 75,
   skills: ["No experience needed", "All ages welcome", "Physical activity: Light"],
   whatToBring: ["Comfortable clothes", "Sunscreen", "Hat", "Reusable water bottle"],
   whatProvided: ["Gloves", "Trash bags", "Trash pickers", "Refreshments"],
   coordinates: { lat: 10.762622, lng: 106.660172 },
   image: "/placeholder.svg?height=400&width=800",
   gallery: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100"
   ],
   reviews: [
      {
         id: 1,
         user: "Sarah Johnson",
         avatar: "/placeholder.svg?height=40&width=40",
         date: "2024-03-10",
         rating: 5,
         comment: "This was my first time volunteering for a beach cleanup and it was an amazing experience! The organizers were very friendly and everything was well planned."
      },
      {
         id: 2,
         user: "Michael Chen",
         avatar: "/placeholder.svg?height=40&width=40",
         date: "2024-03-05",
         rating: 4,
         comment: "Great event for families. My kids learned a lot about environmental protection while having fun. Would definitely participate again."
      },
      {
         id: 3,
         user: "Emily Rodriguez",
         avatar: "/placeholder.svg?height=40&width=40",
         date: "2024-02-28",
         rating: 5,
         comment: "Very well organized event. I was impressed by how much trash we collected and the impact we made in just a few hours."
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

   // Calculate average rating
   const averageRating = eventData.reviews.reduce((acc, review) => acc + review.rating, 0) / eventData.reviews.length

   // Calculate participation percentage
   const participationPercentage = (eventData.participants / eventData.maxParticipants) * 100

   return (
      <Container fluid  className={`${styles.body} py-4 min-vh-100`}>
         <Container>
            {/* Back button */}
            <Link href="/search" passHref>
               <Button
                  variant="link"
                  className="mb-3 p-0"
                  style={{ color: customStyles.primaryColor }}
               >
                  <ChevronLeft size={16} className="me-1" />
                  Back to Events
               </Button>
            </Link>

            {/* Event Header */}
            <Card className="border-0 shadow-sm mb-4 overflow-hidden">
               <div className="position-relative">
                  <img
                     src={eventData.image || "/placeholder.svg"}
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
                              <strong>{eventData.participants} participants</strong>
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
                              <small className="text-muted">{eventData.participants} joined</small>
                              <small className="text-muted">{eventData.maxParticipants} max</small>
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
                              Share
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
                              Register Now
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
                        <h3 className="mb-3">About This Event</h3>
                        <p className="mb-4">{eventData.description}</p>
                        <p style={{ whiteSpace: 'pre-line' }}>{eventData.longDescription}</p>
                     </Card.Body>
                  </Card>

                  {/* What to Expect */}
                  <Card className="border-0 shadow-sm mb-4">
                     <Card.Body className="p-4">
                        <h3 className="mb-3">What to Expect</h3>

                        <h5 className="mb-2">Skills Required</h5>
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
                              <h5 className="mb-2">What to Bring</h5>
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
                              <h5 className="mb-2">What's Provided</h5>
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
                        <h3 className="mb-3">Photo Gallery</h3>
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
                           <h3 className="mb-0">Volunteer Feedback</h3>
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
                              Thank you for your feedback! Your review has been submitted.
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
                                    Submit Review
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
                        <h3 className="mb-3">Similar Events</h3>
                        <div className="d-flex flex-column gap-3">
                           {[1, 2, 3].map((item) => (
                              <div key={item} className="d-flex">
                                 <img
                                    src="/placeholder.svg?height=60&width=60"
                                    alt="Event thumbnail"
                                    className="rounded me-3"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                 />
                                 <div>
                                    <h6 className="mb-1">Tree Planting Initiative</h6>
                                    <div className="d-flex align-items-center text-muted small mb-1">
                                       <Calendar size={12} className="me-1" />
                                       Apr 20, 2025
                                    </div>
                                    <div className="d-flex align-items-center text-muted small">
                                       <MapPin size={12} className="me-1" />
                                       Urban Forest Park
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
                           View More Events
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
