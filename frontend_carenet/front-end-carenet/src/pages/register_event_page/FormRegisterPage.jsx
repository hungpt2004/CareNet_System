"use client"

import { useState } from "react"
import { Container, Card, Form, Button, Row, Col, Alert, ListGroup, Badge, InputGroup } from "react-bootstrap"
import {
   ChevronLeft,
   Calendar,
   MapPin,
   Users,
   Clock,
   CheckCircle,
   AlertCircle,
   Info,
   Heart,
   Mail,
   Phone,
} from "lucide-react"
import { nav } from "framer-motion/client"
import { useNavigate } from "react-router-dom"

// Custom CSS variables for the color scheme
const customStyles = {
   primaryColor: "#5DB996",
   secondaryColor: "#FBF6E9",
}

// Mock event data for the left side recap
const eventData = {
   id: 1,
   name: "Beach Cleanup Drive",
   location: "Coastal Beach Park, 123 Shoreline Dr",
   startDate: "2025-04-15T09:00:00",
   endDate: "2025-04-15T13:00:00",
   category: "Environment",
   description: "Join us for a community beach cleanup to protect marine life and keep our beaches beautiful.",
   organizer: "Ocean Conservation Group",
   participants: 45,
   maxParticipants: 75,
   image: "https://via.placeholder.com/400x200",
   requirements: [
      "All ages welcome",
      "No experience needed",
      "Physical activity: Light to moderate",
      "Outdoor environment",
   ],
   whatToBring: ["Comfortable clothes", "Sunscreen", "Hat", "Reusable water bottle"],
}

function RegisterForm({ eventId }) {
   // Form data state with comprehensive fields
   const [formData, setFormData] = useState({
      // Personal Information
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      tShirtSize: "",

      // Address
      address: "",
      city: "",
      state: "",
      zipCode: "",

      // Volunteer Information
      previousExperience: false,
      experienceDetails: "",
      skills: [],
      otherSkills: "",
      motivation: "",

      // Availability
      availableDays: [],
      availableTimeSlots: [],

      // Emergency Contact
      emergencyContact: "",
      emergencyPhone: "",
      emergencyRelationship: "",

      // Health Information
      healthLimitations: false,
      healthDetails: "",
      allergies: "",

      // Additional Information
      heardFrom: "",

      // Agreements
      agreeTerms: false,
      agreePhotoRelease: false,
      agreeCodeOfConduct: false,
   })

   // Skills options
   const skillOptions = [
      "Communication",
      "Leadership",
      "Teamwork",
      "First Aid",
      "Teaching/Training",
      "Physical Labor",
      "Environmental Knowledge",
      "Photography",
      "Social Media",
      "Foreign Languages",
   ]

   const navigate = useNavigate();

   // How heard about options
   const heardFromOptions = ["Social Media", "Friend/Family", "Email", "Website", "School/Work", "Other"]

   // T-shirt size options
   const tShirtSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]

   const [submitted, setSubmitted] = useState(false)
   const [errors, setErrors] = useState({})

   // Handle input changes
   const handleChange = (e) => {
      const { name, value, type, checked } = e.target

      if (type === "checkbox") {
         if (name === "skills" || name === "availableDays" || name === "availableTimeSlots") {
            // Handle array of checkboxes
            const updatedArray = [...formData[name]]
            if (checked) {
               updatedArray.push(value)
            } else {
               const index = updatedArray.indexOf(value)
               if (index > -1) {
                  updatedArray.splice(index, 1)
               }
            }
            setFormData({
               ...formData,
               [name]: updatedArray,
            })
         } else {
            // Handle single checkbox
            setFormData({
               ...formData,
               [name]: checked,
            })
         }
      } else {
         // Handle other input types
         setFormData({
            ...formData,
            [name]: value,
         })
      }
   }

   // Format date for display
   const formatDate = (dateString) => {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      return new Date(dateString).toLocaleDateString(undefined, options)
   }

   // Format time for display
   const formatTime = (dateString) => {
      const options = { hour: "numeric", minute: "numeric", hour12: true }
      return new Date(dateString).toLocaleTimeString(undefined, options)
   }

   // Validate form
   const validateForm = () => {
      const newErrors = {}

      // Required fields validation
      if (!formData.firstName) newErrors.firstName = "First name is required"
      if (!formData.lastName) newErrors.lastName = "Last name is required"
      if (!formData.email) newErrors.email = "Email is required"
      if (!formData.phone) newErrors.phone = "Phone number is required"
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"

      // Emergency contact validation
      if (!formData.emergencyContact) newErrors.emergencyContact = "Emergency contact name is required"
      if (!formData.emergencyPhone) newErrors.emergencyPhone = "Emergency contact phone is required"
      if (!formData.emergencyRelationship) newErrors.emergencyRelationship = "Relationship is required"

      // Availability validation
      if (formData.availableDays.length === 0) newErrors.availableDays = "Please select at least one day"
      if (formData.availableTimeSlots.length === 0) newErrors.availableTimeSlots = "Please select at least one time slot"

      // Agreement validation
      if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms and conditions"
      if (!formData.agreeCodeOfConduct) newErrors.agreeCodeOfConduct = "You must agree to the code of conduct"

      // If previous experience is checked, details are required
      if (formData.previousExperience && !formData.experienceDetails) {
         newErrors.experienceDetails = "Please provide details about your previous experience"
      }

      // If health limitations is checked, details are required
      if (formData.healthLimitations && !formData.healthDetails) {
         newErrors.healthDetails = "Please provide details about your health limitations"
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
   }

   // Handle form submission
   const handleSubmit = (e) => {
      e.preventDefault()

      if (!validateForm()) {
         // In a real app, you would send this to your backend
         console.log("Registration submitted:", formData)
         setSubmitted(true)
         setTimeout(() => {
            navigate('/success-register')
         })
      } else {
         // Scroll to the first error
         const firstError = document.querySelector(".is-invalid")
         if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth", block: "center" })
         }
      }
   }

   // Go back function
   const goBack = () => {
      window.history.back()
   }

   const handleSuccess = () => {
      navigate('/sucess')
   }

   // If form is submitted successfully
   if (submitted) {
      return (
         <div style={{ backgroundColor: 'white', minHeight: "100vh" }}>
            <Container className="py-5">
               <Card className="border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: "600px" }}>
                  <div className="text-center mb-4">
                     <div
                        className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
                        style={{
                           width: "80px",
                           height: "80px",
                           backgroundColor: customStyles.primaryColor,
                        }}
                     >
                        <CheckCircle size={40} color="white" />
                     </div>
                     <h2>Application Submitted!</h2>
                     <p className="text-muted">Thank you for applying to volunteer for this event.</p>
                  </div>

                  <Alert variant="success" className="mb-4">
                     <p className="mb-0">
                        A confirmation email has been sent to <strong>{formData.email}</strong> with all the details.
                     </p>
                     <p className="mb-0 mt-2">The organizer will review your application and contact you soon.</p>
                  </Alert>

                  <div className="text-center">
                     <Button
                        variant="outline-primary"
                        className="me-2"
                        style={{
                           borderColor: customStyles.primaryColor,
                           color: customStyles.primaryColor,
                        }}
                        onClick={goBack}
                     >
                        Return to Event
                     </Button>
                     <Button
                        style={{
                           backgroundColor: customStyles.primaryColor,
                           borderColor: customStyles.primaryColor,
                        }}
                        onClick={() => (window.location.href = "/events")}
                     >
                        Browse More Events
                     </Button>
                  </div>
               </Card>
            </Container>
         </div>
      )
   }

   return (
      <div style={{ backgroundColor: customStyles.secondaryColor, minHeight: "100vh" }}>
         <Container className="py-4">
            <Button variant="link" className="mb-3 p-0" style={{ color: customStyles.primaryColor }} onClick={goBack}>
               <ChevronLeft size={16} className="me-1" />
               Back to Event
            </Button>

            <h2 className="text-center mb-4">Volunteer Application Form</h2>

            <Row>
               {/* Left Column - Event Information */}
               <Col lg={4} className="mb-4 mb-lg-0">
                  <Card className="border-0 shadow-sm h-100">
                     <Card.Img
                        variant="top"
                        src={eventData.image}
                        alt={eventData.name}
                        style={{ height: "200px", objectFit: "cover" }}
                     />

                     <Card.Body className="p-4">
                        <Badge className="mb-2" style={{ backgroundColor: customStyles.primaryColor }}>
                           {eventData.category}
                        </Badge>
                        <Card.Title as="h3">{eventData.name}</Card.Title>
                        <Card.Text>{eventData.description}</Card.Text>

                        <hr className="my-3" />

                        <div className="d-flex align-items-center mb-3">
                           <Calendar size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <div className="fw-bold">{formatDate(eventData.startDate)}</div>
                              <div className="text-muted">
                                 {formatTime(eventData.startDate)} - {formatTime(eventData.endDate)}
                              </div>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                           <MapPin size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <div className="fw-bold">{eventData.location}</div>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                           <Users size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <div className="fw-bold">{eventData.participants} participants</div>
                              <div className="text-muted">{eventData.maxParticipants - eventData.participants} spots left</div>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                           <Info size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <div className="fw-bold">Organized by</div>
                              <div>{eventData.organizer}</div>
                           </div>
                        </div>

                        <hr className="my-3" />

                        <h5 className="mb-3">Requirements</h5>
                        <ListGroup variant="flush" className="mb-4">
                           {eventData.requirements.map((req, index) => (
                              <ListGroup.Item key={index} className="px-0 py-2 border-0">
                                 <CheckCircle size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                                 {req}
                              </ListGroup.Item>
                           ))}
                        </ListGroup>

                        <h5 className="mb-3">What to Bring</h5>
                        <ListGroup variant="flush">
                           {eventData.whatToBring.map((item, index) => (
                              <ListGroup.Item key={index} className="px-0 py-2 border-0">
                                 <CheckCircle size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                                 {item}
                              </ListGroup.Item>
                           ))}
                        </ListGroup>
                     </Card.Body>

                     <Card.Footer
                        className="text-center p-3"
                        style={{ backgroundColor: customStyles.primaryColor, color: "white" }}
                     >
                        <Heart size={18} className="me-2" />
                        Thank you for your interest in volunteering!
                     </Card.Footer>
                  </Card>
               </Col>

               {/* Right Column - Application Form */}
               <Col lg={8}>
                  <Card className="border-0 shadow-sm">
                     <Card.Body className="p-4">
                        <h4 className="mb-4 border-bottom pb-2">Volunteer Application</h4>

                        <Form onSubmit={handleSubmit}>
                           {/* Personal Information Section */}
                           <h5 className="mb-3">
                              <Info size={18} className="me-2" />
                              Personal Information
                           </h5>

                           <Row className="mb-4">
                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       First Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="firstName"
                                       value={formData.firstName}
                                       onChange={handleChange}
                                       isInvalid={!!errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Last Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="lastName"
                                       value={formData.lastName}
                                       onChange={handleChange}
                                       isInvalid={!!errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Email <span className="text-danger">*</span>
                                    </Form.Label>
                                    <InputGroup>
                                       <InputGroup.Text>
                                          <Mail size={16} />
                                       </InputGroup.Text>
                                       <Form.Control
                                          type="email"
                                          name="email"
                                          value={formData.email}
                                          onChange={handleChange}
                                          isInvalid={!!errors.email}
                                       />
                                       <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </InputGroup>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Phone Number <span className="text-danger">*</span>
                                    </Form.Label>
                                    <InputGroup>
                                       <InputGroup.Text>
                                          <Phone size={16} />
                                       </InputGroup.Text>
                                       <Form.Control
                                          type="tel"
                                          name="phone"
                                          value={formData.phone}
                                          onChange={handleChange}
                                          isInvalid={!!errors.phone}
                                       />
                                       <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                    </InputGroup>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Date of Birth <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                       type="date"
                                       name="dateOfBirth"
                                       value={formData.dateOfBirth}
                                       onChange={handleChange}
                                       isInvalid={!!errors.dateOfBirth}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                    <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                                       <option value="">Select Gender</option>
                                       <option value="male">Male</option>
                                       <option value="female">Female</option>
                                       <option value="non-binary">Non-binary</option>
                                       <option value="prefer-not-to-say">Prefer not to say</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>T-Shirt Size</Form.Label>
                                    <Form.Select name="tShirtSize" value={formData.tShirtSize} onChange={handleChange}>
                                       <option value="">Select Size</option>
                                       {tShirtSizes.map((size) => (
                                          <option key={size} value={size}>
                                             {size}
                                          </option>
                                       ))}
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* Address Section */}
                           <h5 className="mb-3">
                              <MapPin size={18} className="me-2" />
                              Address
                           </h5>

                           <Row className="mb-4">
                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>Street Address</Form.Label>
                                    <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} />
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} />
                                 </Form.Group>
                              </Col>

                              <Col md={3} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} />
                                 </Form.Group>
                              </Col>

                              <Col md={3} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>Zip Code</Form.Label>
                                    <Form.Control type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* Volunteer Information Section */}
                           <h5 className="mb-3">
                              <Users size={18} className="me-2" />
                              Volunteer Information
                           </h5>

                           <Row className="mb-4">
                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Check
                                       type="checkbox"
                                       id="previousExperience"
                                       name="previousExperience"
                                       label="I have previous volunteer experience"
                                       checked={formData.previousExperience}
                                       onChange={handleChange}
                                    />
                                 </Form.Group>
                              </Col>

                              {formData.previousExperience && (
                                 <Col md={12} className="mb-3">
                                    <Form.Group>
                                       <Form.Label>
                                          Please describe your previous volunteer experience <span className="text-danger">*</span>
                                       </Form.Label>
                                       <Form.Control
                                          as="textarea"
                                          rows={3}
                                          name="experienceDetails"
                                          value={formData.experienceDetails}
                                          onChange={handleChange}
                                          isInvalid={!!errors.experienceDetails}
                                          placeholder="Include organization names, roles, and duration"
                                       />
                                       <Form.Control.Feedback type="invalid">{errors.experienceDetails}</Form.Control.Feedback>
                                    </Form.Group>
                                 </Col>
                              )}

                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>What skills do you have that might be helpful? (Select all that apply)</Form.Label>
                                    <div className="d-flex flex-wrap gap-2">
                                       {skillOptions.map((skill) => (
                                          <Form.Check
                                             key={skill}
                                             type="checkbox"
                                             id={`skill-${skill}`}
                                             name="skills"
                                             value={skill}
                                             label={skill}
                                             inline
                                             checked={formData.skills.includes(skill)}
                                             onChange={handleChange}
                                          />
                                       ))}
                                    </div>
                                 </Form.Group>
                              </Col>

                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>Other skills or qualifications</Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="otherSkills"
                                       value={formData.otherSkills}
                                       onChange={handleChange}
                                       placeholder="List any other skills not mentioned above"
                                    />
                                 </Form.Group>
                              </Col>

                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>Why do you want to volunteer for this event?</Form.Label>
                                    <Form.Control
                                       as="textarea"
                                       rows={3}
                                       name="motivation"
                                       value={formData.motivation}
                                       onChange={handleChange}
                                       placeholder="Share your motivation for volunteering"
                                    />
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* Emergency Contact Section */}
                           <h5 className="mb-3">
                              <AlertCircle size={18} className="me-2" />
                              Emergency Contact <span className="text-danger">*</span>
                           </h5>

                           <Row className="mb-4">
                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Emergency Contact Name <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="emergencyContact"
                                       value={formData.emergencyContact}
                                       onChange={handleChange}
                                       isInvalid={!!errors.emergencyContact}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.emergencyContact}</Form.Control.Feedback>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Emergency Contact Phone <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                       type="tel"
                                       name="emergencyPhone"
                                       value={formData.emergencyPhone}
                                       onChange={handleChange}
                                       isInvalid={!!errors.emergencyPhone}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.emergencyPhone}</Form.Control.Feedback>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Relationship <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="emergencyRelationship"
                                       value={formData.emergencyRelationship}
                                       onChange={handleChange}
                                       isInvalid={!!errors.emergencyRelationship}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.emergencyRelationship}</Form.Control.Feedback>
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* Health Information Section */}
                           <h5 className="mb-3">
                              <AlertCircle size={18} className="me-2" />
                              Health Information
                           </h5>

                           <Row className="mb-4">
                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Check
                                       type="checkbox"
                                       id="healthLimitations"
                                       name="healthLimitations"
                                       label="I have health limitations or conditions that might affect my volunteer work"
                                       checked={formData.healthLimitations}
                                       onChange={handleChange}
                                    />
                                 </Form.Group>
                              </Col>

                              {formData.healthLimitations && (
                                 <Col md={12} className="mb-3">
                                    <Form.Group>
                                       <Form.Label>
                                          Please describe your health limitations <span className="text-danger">*</span>
                                       </Form.Label>
                                       <Form.Control
                                          as="textarea"
                                          rows={3}
                                          name="healthDetails"
                                          value={formData.healthDetails}
                                          onChange={handleChange}
                                          isInvalid={!!errors.healthDetails}
                                          placeholder="Include any accommodations you might need"
                                       />
                                       <Form.Control.Feedback type="invalid">{errors.healthDetails}</Form.Control.Feedback>
                                    </Form.Group>
                                 </Col>
                              )}

                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>Do you have any allergies or medical conditions we should be aware of?</Form.Label>
                                    <Form.Control
                                       as="textarea"
                                       rows={2}
                                       name="allergies"
                                       value={formData.allergies}
                                       onChange={handleChange}
                                       placeholder="Optional - for safety purposes only"
                                    />
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* Additional Information Section */}
                           <h5 className="mb-3">
                              <Info size={18} className="me-2" />
                              Additional Information
                           </h5>

                           <Row className="mb-4">
                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>How did you hear about this volunteer opportunity?</Form.Label>
                                    <Form.Select name="heardFrom" value={formData.heardFrom} onChange={handleChange}>
                                       <option value="">Select an option</option>
                                       {heardFromOptions.map((option) => (
                                          <option key={option} value={option}>
                                             {option}
                                          </option>
                                       ))}
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* Agreements Section */}
                           <h5 className="mb-3">
                              <CheckCircle size={18} className="me-2" />
                              Agreements <span className="text-danger">*</span>
                           </h5>

                           <Row className="mb-4">
                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Check
                                       type="checkbox"
                                       id="agreeTerms"
                                       name="agreeTerms"
                                       label="I agree to the terms and conditions, including the liability waiver"
                                       checked={formData.agreeTerms}
                                       onChange={handleChange}
                                       isInvalid={!!errors.agreeTerms}
                                    />
                                    {errors.agreeTerms && <div className="text-danger mt-1 small">{errors.agreeTerms}</div>}
                                 </Form.Group>
                              </Col>

                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Check
                                       type="checkbox"
                                       id="agreePhotoRelease"
                                       name="agreePhotoRelease"
                                       label="I agree to be photographed and allow the use of my image in promotional materials"
                                       checked={formData.agreePhotoRelease}
                                       onChange={handleChange}
                                    />
                                 </Form.Group>
                              </Col>

                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Check
                                       type="checkbox"
                                       id="agreeCodeOfConduct"
                                       name="agreeCodeOfConduct"
                                       label="I agree to follow the volunteer code of conduct"
                                       checked={formData.agreeCodeOfConduct}
                                       onChange={handleChange}
                                       isInvalid={!!errors.agreeCodeOfConduct}
                                    />
                                    {errors.agreeCodeOfConduct && (
                                       <div className="text-danger mt-1 small">{errors.agreeCodeOfConduct}</div>
                                    )}
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* Submit Button */}
                           <div className="d-grid mt-4">
                              <Button
                                 onClick={() => navigate('/success-register')}
                                 type="submit"
                                 size="lg"
                                 style={{
                                    backgroundColor: customStyles.primaryColor,
                                    borderColor: customStyles.primaryColor,
                                 }}
                              >
                                 Submit Application
                              </Button>
                           </div>
                        </Form>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default RegisterForm

