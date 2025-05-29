import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Row, Col, Alert, ListGroup, Badge, InputGroup } from "react-bootstrap";
import {
   ChevronLeft,
   Calendar,
   MapPin,
   Users,
   Clock,
   CheckCircle,
   Info,
   Heart,
   Mail,
   Phone,
} from "lucide-react";
import { useParams } from "react-router-dom";
import useAuthStore from "../../hooks/authStore";
import axios from "axios";
import { formatDateVN } from "../../utils/FormatDateVN";
import axiosInstance from "../../utils/AxiosInstance";
import { CustomFailedToast, CustomSuccessToast, CustomToast } from "../../components/toast/CustomToast";

// Biến tùy chỉnh màu sắc giao diện
const customStyles = {
   primaryColor: "#5DB996",
   secondaryColor: "#FBF6E9",
};

function RegisterForm() {
   const { id } = useParams();
   const [eventData, setEventData] = useState(null);
   const { currentUser } = useAuthStore();

   // Khởi tạo formData với thông tin cá nhân từ currentUser
   const initialFormData = {
      fullName: currentUser?.fullname || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      dateOfBirth: formatDateVN(currentUser?.dob) || "",
      gender: "",
      tShirtSize: "",
      agreeTerms: false,
      agreePhotoRelease: false,
      agreeCodeOfConduct: false,
   };

   // State lưu trữ dữ liệu biểu mẫu
   const [formData, setFormData] = useState(initialFormData);
   const [submitted, setSubmitted] = useState(false);
   const [errors, setErrors] = useState({});

   // Danh sách kích cỡ áo
   const tShirtSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

   // Lấy thông tin sự kiện từ API
   const fetchEventDetail = async () => {
      try {
         const response = await axios.get(`http://localhost:5000/event/get-event-detail/${id}`);
         if (response.data && response.data.event) {
            setEventData(response.data.event);
            console.log("Lấy thông tin sự kiện thành công");
         }
      } catch (error) {
         console.log(`Lỗi khi lấy thông tin sự kiện: ${error}`);
      }
   };

   // Xử lý thay đổi giá trị đầu vào
   const handleChange = (e, question, type) => {
      const { name, value, checked } = e.target;

      if (type === "checkbox" && question) {
         // Xử lý checkbox cho câu hỏi động (mảng giá trị)
         const currentValues = formData[question] || [];
         let updatedValues;
         if (checked) {
            updatedValues = [...currentValues, value];
         } else {
            updatedValues = currentValues.filter((val) => val !== value);
         }
         setFormData({
            ...formData,
            [question]: updatedValues,
         });
      } else if (name === "agreeTerms" || name === "agreePhotoRelease" || name === "agreeCodeOfConduct") {
         // Xử lý checkbox cho thỏa thuận
         setFormData({
            ...formData,
            [name]: checked,
         });
      } else if (question) {
         // Xử lý text, radio, dropdown cho câu hỏi động
         setFormData({
            ...formData,
            [question]: value,
         });
      } else {
         // Xử lý các trường thông tin cá nhân
         setFormData({
            ...formData,
            [name]: value,
         });
      }
   };

   // Định dạng ngày hiển thị
   const formatDate = (dateString) => {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("vi-VN", options);
   };

   // Định dạng giờ hiển thị
   const formatTime = (dateString) => {
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return new Date(dateString).toLocaleTimeString("vi-VN", options);
   };

   // Kiểm tra biểu mẫu
   const validateForm = () => {
      const newErrors = {};

      // Kiểm tra các trường thông tin cá nhân bắt buộc
      if (!formData.fullName) newErrors.fullName = "Tên là bắt buộc";
      if (!formData.email) newErrors.email = "Email là bắt buộc";
      if (!formData.phone) newErrors.phone = "Số điện thoại là bắt buộc";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Ngày sinh là bắt buộc";

      // Kiểm tra các câu hỏi động bắt buộc
      if (eventData && eventData.formData && eventData.formData.questions) {
         eventData.formData.questions.forEach((q) => {
            if (!formData[q.question] || (Array.isArray(formData[q.question]) && formData[q.question].length === 0)) {
               newErrors[q.question] = "Vui lòng trả lời câu hỏi này";
            }
         });
      }

      // Kiểm tra thỏa thuận
      if (!formData.agreeTerms) newErrors.agreeTerms = "Bạn phải đồng ý với các điều khoản và điều kiện";
      if (!formData.agreeCodeOfConduct) newErrors.agreeCodeOfConduct = "Bạn phải đồng ý với quy tắc ứng xử";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
   };

   // Xử lý gửi biểu mẫu
   const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (validateForm()) {
         try {
            // Lấy danh sách câu hỏi từ eventData
            const questions = eventData.formData?.questions || [];
            
            // Tạo object chứa câu trả lời cho từng câu hỏi
            const questionAnswers = {};
            questions.forEach(q => {
               questionAnswers[q.question] = formData[q.question];
            });

            // Chuẩn bị dữ liệu gửi theo đúng model
            const submitData = {
               answers: [JSON.stringify(questionAnswers)]
            };

            // Gửi yêu cầu với header Authorization
            const response = await axiosInstance.post(
               `/event/register-event/${id}`,
               submitData,
               {
                  headers: {
                     Authorization: `Bearer ${currentUser?.token}`,
                  },
               }
            );

            console.log("Đăng ký đã gửi:", response.data);
            setSubmitted(true);
            if(response.data && response.data.registration) CustomSuccessToast(response.data.message);
         } catch (error) {
            console.error("Lỗi khi gửi đăng ký:", error);
            CustomFailedToast(error.response?.data?.message || "Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại.");
         }
      } else {
         // Cuộn đến container của lỗi đầu tiên
         const firstError = document.querySelector(".is-invalid");
         if (firstError) {
            const formGroup = firstError.closest(".form-group");
            if (formGroup) {
               formGroup.scrollIntoView({ behavior: "smooth", block: "center" });
            } else {
               firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            document.activeElement.blur();
         }
      }
   };

   // Quay lại
   const goBack = () => {
      window.history.back();
   };

   // Lấy dữ liệu sự kiện khi component mount
   useEffect(() => {
      fetchEventDetail();
   }, []);

   // Nếu biểu mẫu được gửi thành công
   if (submitted) {
      return (
         <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
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
                     <h2>Đăng ký thành công!</h2>
                     <p className="text-muted">Cảm ơn bạn đã đăng ký làm tình nguyện viên cho sự kiện này.</p>
                  </div>

                  <Alert variant="success" className="mb-4">
                     <p className="mb-0">
                        Một email xác nhận đã được gửi đến <strong>{formData.email || currentUser.email}</strong> với tất cả thông tin chi tiết.
                     </p>
                     <p className="mb-0 mt-2">Ban tổ chức sẽ xem xét đăng ký của bạn và liên hệ với bạn sớm.</p>
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
                        Quay lại sự kiện
                     </Button>
                     <Button
                        style={{
                           backgroundColor: customStyles.primaryColor,
                           borderColor: customStyles.primaryColor,
                        }}
                        onClick={() => (window.location.href = "/events")}
                     >
                        Xem thêm sự kiện
                     </Button>
                  </div>
               </Card>
            </Container>
         </div>
      );
   }

   // Nếu chưa tải được dữ liệu sự kiện
   if (!eventData) {
      return (
         <div style={{ backgroundColor: customStyles.secondaryColor, minHeight: "100vh" }}>
            <Container className="py-4 text-center">
               <h4>Đang tải thông tin sự kiện...</h4>
            </Container>
         </div>
      );
   }

   return (
      <>
      <CustomToast/>
      <div style={{ backgroundColor: 'white', minHeight: "100vh" }}>
         <Container className="py-4 shadow-lg mt-5 rounded-4">
            <Button variant="link" className="mb-3 p-0" style={{ color: customStyles.primaryColor }} onClick={goBack}>
               <ChevronLeft size={16} className="me-1" />
               Quay lại sự kiện
            </Button>

            <h2 className="text-center mb-4">Mẫu đăng ký tình nguyện</h2>

            <Row>
               {/* Cột trái - Thông tin sự kiện */}
               <Col lg={4} className="mb-4 mb-lg-0">
                  <Card className="border-0 shadow-sm h-100">
                     <Card.Img
                        variant="top"
                        src={eventData.images && eventData.images.length > 0 ? eventData.images[0] : "https://via.placeholder.com/400x200"}
                        alt={eventData.title}
                        style={{ height: "200px", objectFit: "cover" }}
                     />

                     <Card.Body className="p-4">
                        <Badge className="mb-2" style={{ backgroundColor: customStyles.primaryColor }}>
                           {eventData.category || "Không xác định"}
                        </Badge>
                        <Card.Title as="h3">{eventData.title}</Card.Title>
                        <Card.Text>{eventData.description || "Không có mô tả"}</Card.Text>

                        <hr className="my-3" />

                        <div className="d-flex align-items-center mb-3">
                           <Calendar size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <div className="fw-bold">{formatDate(eventData.startAt)}</div>
                              <div className="text-muted">
                                 {formatTime(eventData.startAt)} - {formatTime(eventData.endAt)}
                              </div>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                           <MapPin size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <div className="fw-bold">{eventData.location.fullAddress || "Không xác định"}</div>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                           <Users size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <div className="fw-bold">{eventData.currentParticipants} người tham gia</div>
                           </div>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                           <Info size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                           <div>
                              <div className="fw-bold">Tổ chức bởi</div>
                              <div>{eventData.organizationId?.name || "Không xác định"}</div>
                           </div>
                        </div>

                        <hr className="my-3" />

                        <h5 className="mb-3">Kỹ năng yêu cầu</h5>
                        <ListGroup variant="flush" className="mb-4">
                           {eventData.skillNeeds && eventData.skillNeeds.length > 0 ? (
                              eventData.skillNeeds.map((skill, index) => (
                                 <ListGroup.Item key={index} className="px-0 py-2 border-0">
                                    <CheckCircle size={16} className="me-2" style={{ color: customStyles.primaryColor }} />
                                    {skill}
                                 </ListGroup.Item>
                              ))
                           ) : (
                              <ListGroup.Item className="px-0 py-2 border-0">Không yêu cầu kỹ năng cụ thể</ListGroup.Item>
                           )}
                        </ListGroup>
                     </Card.Body>

                     <Card.Footer
                        className="text-center p-3"
                        style={{ backgroundColor: customStyles.primaryColor, color: "white" }}
                     >
                        <Heart size={18} className="me-2" />
                        Cảm ơn bạn đã quan tâm đến hoạt động tình nguyện!
                     </Card.Footer>
                  </Card>
               </Col>

               {/* Cột phải - Biểu mẫu đăng ký */}
               <Col lg={8}>
                  <Card className="border-0 shadow-sm">
                     <Card.Body className="p-4">
                        <h4 className="mb-4 border-bottom pb-2">Đăng ký tình nguyện</h4>

                        <Form onSubmit={handleSubmit}>
                           {/* Phần thông tin cá nhân */}
                           <h5 className="mb-3">
                              <Info size={18} className="me-2" />
                              Thông tin cá nhân
                           </h5>

                           <Row className="mb-4">
                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Họ và tên <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                       type="text"
                                       name="fullName"
                                       value={formData.fullName}
                                       onChange={handleChange}
                                       isInvalid={!!errors.fullName}
                                       placeholder="Nhập họ và tên"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
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
                                          placeholder="Nhập email của bạn"
                                       />
                                       <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                                    </InputGroup>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Số điện thoại <span className="text-danger">*</span>
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
                                          placeholder Gaga="Nhập số điện thoại"
                                       />
                                       <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                                    </InputGroup>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>
                                       Ngày sinh <span className="text-danger">*</span>
                                    </Form.Label>
                                    <Form.Control
                                       type="date"
                                       name="dateOfBirth"
                                       value={formatDateVN(currentUser?.dob)}
                                       readOnly
                                       isInvalid={!!errors.dateOfBirth}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>Giới tính</Form.Label>
                                    <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                                       <option value="">Chọn giới tính</option>
                                       <option value="male">Nam</option>
                                       <option value="female">Nữ</option>
                                       <option value="non-binary">Không xác định</option>
                                       <option value="prefer-not-to-say">Không muốn tiết lộ</option>
                                    </Form.Select>
                                 </Form.Group>
                              </Col>

                              <Col md={6} className="mb-3">
                                 <Form.Group>
                                    <Form.Label>Kích cỡ áo</Form.Label>
                                    <Form.Select name="tShirtSize" value={formData.tShirtSize} onChange={handleChange}>
                                       <option value="">Chọn kích cỡ</option>
                                       {tShirtSizes.map((size) => (
                                          <option key={size} value={size}>
                                             {size}
                                          </option>
                                       ))}
                                    </Form.Select>
                                 </Form.Group>
                              </Col>
                           </Row>

                           {/* Phần câu hỏi động */}
                           <h5 className="mb-3">
                              <Info size={18} className="me-2" />
                              Câu hỏi bổ sung
                           </h5>

                           {eventData.formData && eventData.formData.questions && eventData.formData.questions.length > 0 ? (
                              eventData.formData.questions.map((q, index) => (
                                 <Row key={index} className="mb-3">
                                    <Col md={12}>
                                       <Form.Group>
                                          <Form.Label>
                                             {q.question} <span className="text-danger">*</span>
                                          </Form.Label>
                                          {q.type === "text" && (
                                             <Form.Control
                                                type="text"
                                                name={q.question}
                                                value={formData[q.question] || ""}
                                                onChange={(e) => handleChange(e, q.question, q.type)}
                                                isInvalid={!!errors[q.question]}
                                                placeholder={`Nhập câu trả lời cho "${q.question}"`}
                                             />
                                          )}
                                          {q.type === "checkbox" && (
                                             <div className="d-flex flex-wrap gap-2">
                                                {q.options.map((option, optIndex) => (
                                                   <Form.Check
                                                      key={optIndex}
                                                      type="checkbox"
                                                      id={`${q.question}-${optIndex}`}
                                                      name={q.question}
                                                      value={option}
                                                      label={option}
                                                      checked={formData[q.question]?.includes(option) || false}
                                                      onChange={(e) => handleChange(e, q.question, q.type)}
                                                   />
                                                ))}
                                             </div>
                                          )}
                                          {q.type === "radio" && (
                                             <div>
                                                {q.options.map((option, optIndex) => (
                                                   <Form.Check
                                                      key={optIndex}
                                                      type="radio"
                                                      id={`${q.question}-${optIndex}`}
                                                      name={q.question}
                                                      value={option}
                                                      label={option}
                                                      checked={formData[q.question] === option}
                                                      onChange={(e) => handleChange(e, q.question, q.type)}
                                                   />
                                                ))}
                                             </div>
                                          )}
                                          {q.type === "dropdown" && (
                                             <Form.Select
                                                name={q.question}
                                                value={formData[q.question] || ""}
                                                onChange={(e) => handleChange(e, q.question, q.type)}
                                                isInvalid={!!errors[q.question]}
                                             >
                                                <option value="">Chọn một tùy chọn</option>
                                                {q.options.map((option, optIndex) => (
                                                   <option key={optIndex} value={option}>
                                                      {option}
                                                   </option>
                                                ))}
                                             </Form.Select>
                                          )}
                                          <Form.Control.Feedback type="invalid">{errors[q.question]}</Form.Control.Feedback>
                                       </Form.Group>
                                    </Col>
                                 </Row>
                              ))
                           ) : (
                              <Alert variant="warning">Không có câu hỏi bổ sung nào được cấu hình cho sự kiện này.</Alert>
                           )}

                           {/* Phần thỏa thuận */}
                           <h5 className="mb-3">
                              <CheckCircle size={18} className="me-2" />
                              Thỏa thuận <span className="text-danger">*</span>
                           </h5>

                           <Row className="mb-4">
                              <Col md={12} className="mb-3">
                                 <Form.Group>
                                    <Form.Check
                                       type="checkbox"
                                       id="agreeTerms"
                                       name="agreeTerms"
                                       label="Tôi đồng ý với các điều khoản và điều kiện, bao gồm miễn trách nhiệm"
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
                                       label="Tôi đồng ý được chụp ảnh và cho phép sử dụng hình ảnh của tôi trong các tài liệu quảng cáo"
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
                                       label="Tôi đồng ý tuân theo quy tắc ứng xử của tình nguyện viên"
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

                           {/* Hiển thị lỗi gửi (nếu có) */}
                           {errors.submit && (
                              <Alert variant="danger" className="mb-4">
                                 {errors.submit}
                              </Alert>
                           )}

                           {/* Nút gửi */}
                           <div className="d-grid mt-4">
                              <Button
                                 type="submit"
                                 size="lg"
                                 style={{
                                    backgroundColor: customStyles.primaryColor,
                                    borderColor: customStyles.primaryColor,
                                 }}
                              >
                                 Gửi đăng ký
                              </Button>
                           </div>
                        </Form>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </Container>
      </div>
      </>
   );
}

export default RegisterForm;