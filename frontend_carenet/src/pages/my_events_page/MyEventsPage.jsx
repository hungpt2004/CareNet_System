import { useState, useEffect, useRef } from "react";
import { Container, Button, Modal, Badge } from "react-bootstrap";
import { Calendar, MapPin, Users, Clock, Award, Eye, ChevronRight, X, ListCollapse } from "lucide-react";
import { Table, Tag, Space, Image, Breadcrumb } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../utils/AxiosInstance";
import useAuthStore from "../../hooks/authStore";
import { CustomFailedToast, CustomSuccessToast, CustomToast } from "../../components/toast/CustomToast";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import io from 'socket.io-client';
import { formatDateVN } from "../../utils/FormatDateVN";
import { formatTimeVN } from "../../utils/FormatTimeVN";
import { HomeOutlined, CalendarOutlined } from "@ant-design/icons";

// Custom styles
const customStyles = {
   primaryColor: "#5DB996",
   secondaryColor: "#FBF6E9",
};

// Animation variants
const containerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1
      }
   }
};

const itemVariants = {
   hidden: { y: 20, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 0.5
      }
   }
};

function MyEventsPage() {
   const [events, setEvents] = useState([]);
   const [selectedEvent, setSelectedEvent] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const [showCertificateModal, setShowCertificateModal] = useState(false);
   const [selectedCertificate, setSelectedCertificate] = useState(null);
   const [showCancelModal, setShowCancelModal] = useState(false);
   const [selectedEventForCancel, setSelectedEventForCancel] = useState(null);
   const [cancelReason, setCancelReason] = useState('');
   const socketRef = useRef(null);
   const currentUser = useAuthStore((state) => state.currentUser);

   useEffect(() => {
      // Kết nối Socket.IO
      socketRef.current = io('http://localhost:5000', {
         withCredentials: true
      });

      // Debug log khi kết nối thành công
      socketRef.current.on('connect', () => {
         console.log('Socket.IO connected successfully in MyEventsPage');
      });

      // Debug log khi có lỗi kết nối
      socketRef.current.on('connect_error', (error) => {
         console.error('Socket.IO connection error in MyEventsPage:', error);
      });

      // Join vào room của user
      if (currentUser?._id) {
         console.log('Joining user room in MyEventsPage:', currentUser._id);
         socketRef.current.emit('joinUserRoom', currentUser._id);
      }

      // Lắng nghe sự kiện requestApproved
      socketRef.current.on('requestApproved', (data) => {
         console.log('Received requestApproved event in MyEventsPage:', data);
         // Refresh danh sách sự kiện khi có thông báo mới
         fetchUserEvents();
      });

      return () => {
         if (currentUser?._id) {
            console.log('Leaving user room in MyEventsPage:', currentUser._id);
            socketRef.current.emit('leaveUserRoom', currentUser._id);
         }
         socketRef.current.disconnect();
      };
   }, [currentUser?._id]);

   useEffect(() => {
      fetchUserEvents();
   }, []);

   // Fetch user's registered events
   const fetchUserEvents = async () => {
      console.log('Fetching user events...');
      setIsLoading(true);
      try {
         const response = await axiosInstance.get("/event/get-my-events");
         console.log('Fetch user events response:', response.data);
         setEvents(response.data.events);
      } catch (error) {
         console.error("Error fetching events:", error);
      } finally {
         setTimeout(() => {
            setIsLoading(false);
         }, 1500);
      }
   };

   const handleGenerateCertificate = async (eventId) => {
      console.log("Generating certificate for event:", eventId);
      try {
         // First check if certificate exists
         const checkResponse = await axiosInstance.get(`/certificates/get-certificate/${eventId}`);
         console.log('Check certificate response:', checkResponse.data);

         if (checkResponse.data.status === 'success' && checkResponse.data.certificate) {
            // Certificate exists, show it
            setSelectedCertificate({
               ...checkResponse.data.certificate,
               isPaid: !!checkResponse.data.certifcatePurchase
            });
            setShowCertificateModal(true);
            setShowModal(false);
         } else if (checkResponse.data.status === 'fail') {
            // Certificate doesn't exist, create new one
            const response = await axiosInstance.post('/certificates/create-certificate', {
               eventId: eventId
            });

            if (response.data.status === 'success' && response.data.certificate) {
               setSelectedCertificate({
                  ...response.data.certificate,
                  isPaid: false
               });
               setShowCertificateModal(true);
               setShowModal(false);
               CustomSuccessToast('Tạo chứng chỉ thành công');
               fetchUserEvents();
            }
         }
      } catch (error) {
         console.error('Error with certificate:', error);
         CustomFailedToast('Không thể xử lý chứng chỉ');
      }
   };

   const handlePayment = async (certificateId) => {
      try {
         const response = await axiosInstance.post('/payment/create-payment-link', {
            certificateId: certificateId
         });

         if (response.data.status === 'success' && response.data.checkoutUrl) {
            window.location.href = response.data.checkoutUrl;
         } else {
            CustomFailedToast('Không thể tạo liên kết thanh toán');
         }
      } catch (error) {
         console.error('Error creating payment link:', error);
         CustomFailedToast('Không thể tạo liên kết thanh toán');
      }
   };

   useEffect(() => {
      fetchUserEvents();
   }, []);


   // Get status tag color based on historyEvent status
   const getStatusTag = (status) => {
      const statusColors = {
         waiting: "warning",    // chờ duyệt
         completed: "success",  // được phép feedback
         finished: "success",   // sau khi feedback
         processing: "processing", // sự kiện đang diễn ra
         rejected: "error",     // đã bị từ chối
         approved: "success",   // đã được chấp nhận
         pending: "warning",    // yêu cầu hủy tham gia
         cancelled: "default",  // sau khi được duyệt hủy tham gia
      };
      const vietnameseStatus = {
         waiting: "Chờ duyệt",
         completed: "Đã được phép feedback",
         finished: "Sau khi feedback",
         processing: "Đang diễn ra",
         rejected: "Đã bị từ chối",
         approved: "Đã được chấp nhận",
         pending: "Yêu cầu hủy tham gia",
         hiring: "Đang tuyển dụng",
         cancelled: "Đã được duyệt hủy tham gia",
      }
      return (
         <Tag color={statusColors[status]}>
            {vietnameseStatus[status]}
         </Tag>
      );
   };

   // Handle event click
   const handleEventClick = (record) => {
      setSelectedEvent(record.event);
      setShowModal(true);
   };

   // Handle cancel button click
   const handleCancelClick = (record) => {
      setSelectedEventForCancel(record);
      setShowCancelModal(true);
   };

   // Calculate reputation penalty based on time difference
   const calculateReputationPenalty = (startAt) => {
      const now = new Date();
      const eventStart = new Date(startAt);
      const hoursDiff = (eventStart - now) / (1000 * 60 * 60);

      if (hoursDiff > 48) return 0;
      if (hoursDiff > 24) return 2;
      if (hoursDiff > 0) return 10;
      return 15; // For no-show
   };

   // Handle cancel confirmation
   const handleCancelConfirm = async () => {
      if (!selectedEventForCancel || !cancelReason) return;

      try {
         const response = await axiosInstance.post('/volunteer/request-cancel-event', {
            eventId: selectedEventForCancel.event._id,
            cancelReason: cancelReason
         });

         if (response.data.status === 'success') {
            CustomSuccessToast('Yêu cầu hủy tham gia đã được gửi');
            fetchUserEvents();
         }
      } catch (error) {
         console.error('Error canceling event:', error);
         CustomFailedToast('Không thể gửi yêu cầu hủy tham gia');
      }

      setShowCancelModal(false);
      setCancelReason('');
      setSelectedEventForCancel(null);
   };



   // Table columns configuration
   const columns = [
      {
         title: "Hình ảnh",
         dataIndex: ["event", "images"],
         key: "images",
         width: 100,
         render: (images) => (
            <Image
               src={images?.[0] || "https://via.placeholder.com/100x100"}
               alt="Event"
               width={80}
               height={80}
               style={{ objectFit: "cover", borderRadius: "8px" }}
            />
         ),
      },
      {
         title: "Tên sự kiện",
         dataIndex: ["event", "title"],
         key: "title",
         render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
      },
      {
         title: "Thời gian",
         dataIndex: ["event", "startAt"],
         key: "startAt",
         render: (startAt, record) => (
            <Space direction="vertical" size="small">
               <div>{formatDateVN(startAt)}</div>
               <div style={{ color: "#666" }}>
                  {formatTimeVN(startAt)} - {formatTimeVN(record.event.endAt)}
               </div>
            </Space>
         ),
      },
      {
         title: "Địa điểm",
         dataIndex: ["event", "location", "province"],
         key: "location",
         render: (province, record) => (
            <Space>
               <MapPin size={16} style={{ color: customStyles.primaryColor }} />
               {record.event.location?.fullAddress || province || "Không xác định"}
            </Space>
         ),
      },
      {
         title: "Trạng thái",
         dataIndex: "status",
         key: "status",
         render: (status) => getStatusTag(status),
      },
      {
         title: "Thời gian đăng ký",
         dataIndex: "registeredAt",
         key: "registeredAt",
         render: (date) => formatDateVN(date),
      },
      {
         title: "Thao tác",
         key: "action",
         render: (_, record) => (
            <Space size="middle">
               <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleEventClick(record)}
               >
                  Chi tiết
               </Button>
               {record.status === "approved" || record.status === "waiting" && (
                  <Button
                     variant="outline-danger"
                     size="sm"
                     onClick={() => handleCancelClick(record)}
                  >
                     Hủy
                  </Button>
               )}
               {record.status === "approved" && (
                  <>
                     {showCertificateModal.isPaid ? (
                        <Button
                           variant="outline-info"
                           size="sm"
                           onClick={() => handleGenerateCertificate(record.event._id)}
                        >
                           Xem chứng chỉ
                        </Button>
                     ) : (
                        <Button
                           variant="outline-primary"
                           size="sm"
                           onClick={() => handleGenerateCertificate(record.event._id)}
                        >
                           Mua chứng chỉ tham gia
                        </Button>
                     )}
                  </>
               )}
            </Space>
         ),
      },
   ];

   return (
      <>
         <CustomToast />
         {isLoading ? (
            <CustomSpinner />
         ) : (
            <motion.div
               initial="hidden"
               animate="visible"
               variants={containerVariants}
               style={{ backgroundColor: 'white', minHeight: "100vh" }}
            >
               <Container className="py-4">
                  
                  <h2 className="text-center mb-4 mt-3">Quản Lý Ghi Danh</h2>
                  <motion.div variants={itemVariants}>
                     <Table
                        columns={columns}
                        dataSource={events}
                        rowKey="_id"
                        pagination={{
                           defaultPageSize: 4,
                           defaultCurrent: 4,
                           pageSize: 10,
                           showSizeChanger: true,
                           showTotal: (total) => `Tổng số ${total} sự kiện`,
                        }}
                        className="shadow-lg p-4 rounded-2"
                     />
                  </motion.div>

                  {/* Event Detail Modal */}
                  <AnimatePresence>
                     {showModal && (
                        <Modal
                           show={showModal}
                           onHide={() => setShowModal(false)}
                           size="lg"
                        >
                           <motion.div
                              initial={{ opacity: 0, y: 50 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 50 }}
                              transition={{ duration: 0.3 }}
                           >
                              <Modal.Header closeButton>
                                 <Modal.Title>{selectedEvent?.title}</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                 {selectedEvent && (
                                    <motion.div
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: 1 }}
                                       transition={{ delay: 0.2 }}
                                    >
                                       <div className="text-center mb-4">
                                          <motion.img
                                             initial={{ scale: 0.8, opacity: 0 }}
                                             animate={{ scale: 1, opacity: 1 }}
                                             transition={{ duration: 0.5 }}
                                             src={selectedEvent.images?.[0] || "https://via.placeholder.com/400x200"}
                                             alt={selectedEvent.title}
                                             className="img-fluid rounded"
                                             style={{ maxHeight: "300px", objectFit: "cover" }}
                                          />
                                       </div>

                                       <motion.div
                                          className="mb-4"
                                          initial={{ x: -20, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{ delay: 0.3 }}
                                       >
                                          <h5>Thông tin sự kiện</h5>
                                          <div className="d-flex align-items-center mb-2">
                                             <Calendar size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                                             <div>
                                                <div className="fw-bold">{formatDateVN(selectedEvent.startAt)}</div>
                                                <div className="text-muted">
                                                   {formatTimeVN(selectedEvent.startAt)} - {formatTimeVN(selectedEvent.endAt)}
                                                </div>
                                             </div>
                                          </div>

                                          <div className="d-flex align-items-center mb-2">
                                             <MapPin size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                                             <div>
                                                <div className="fw-bold">Địa điểm</div>
                                                <div>{(selectedEvent.location.province) || "Không xác định"}</div>
                                             </div>
                                          </div>

                                          <div className="d-flex align-items-center mb-2">
                                             <Users size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                                             <div>
                                                <div className="fw-bold">Số người tham gia</div>
                                                <div>{selectedEvent.currentParticipants} người</div>
                                             </div>
                                          </div>
                                       </motion.div>

                                       <motion.div
                                          className="mb-4"
                                          initial={{ x: 20, opacity: 0 }}
                                          animate={{ x: 0, opacity: 1 }}
                                          transition={{ delay: 0.4 }}
                                       >
                                          <h5>Trạng thái đăng ký</h5>
                                          {getStatusTag(selectedEvent.status)}
                                          {selectedEvent.status === "approved" && (
                                             <motion.div
                                                className="mt-3"
                                                initial={{ y: 20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                             >
                                                <Button
                                                   variant="outline-primary"
                                                   className="w-100"
                                                   onClick={() => handleGenerateCertificate(selectedEvent._id)}
                                                >
                                                   <Award size={18} className="me-2" />
                                                   {selectedEvent.certificate ? 'Xem chứng chỉ' : 'Mua chứng chỉ tham gia'}
                                                </Button>
                                             </motion.div>
                                          )}
                                       </motion.div>

                                       <motion.div
                                          initial={{ y: 20, opacity: 0 }}
                                          animate={{ y: 0, opacity: 1 }}
                                          transition={{ delay: 0.5 }}
                                       >
                                          <h5>Mô tả</h5>
                                          <p>{selectedEvent.description}</p>
                                       </motion.div>
                                    </motion.div>
                                 )}
                              </Modal.Body>
                              <Modal.Footer>
                                 <Button variant="secondary" onClick={() => setShowModal(false)}>
                                    Đóng
                                 </Button>
                              </Modal.Footer>
                           </motion.div>
                        </Modal>
                     )}
                  </AnimatePresence>

                  {/* Cancel Warning Modal */}
                  <Modal
                     show={showCancelModal}
                     onHide={() => {
                        setShowCancelModal(false);
                        setCancelReason('');
                        setSelectedEventForCancel(null);
                     }}
                     centered
                  >
                     <Modal.Header closeButton>
                        <Modal.Title>Cảnh báo hủy tham gia</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                        {selectedEventForCancel && (
                           <>
                              <div className="alert alert-warning">
                                 <h5 className="alert-heading">Lưu ý về điểm reputation!</h5>
                                 <p>Việc hủy tham gia sự kiện sẽ ảnh hưởng đến điểm reputation của bạn:</p>
                                 <ul>
                                    <li>Hủy trước 48 tiếng: <strong>0 điểm</strong></li>
                                    <li>Hủy từ 24-48 tiếng: <strong>-2 điểm</strong></li>
                                    <li>Hủy dưới 24 tiếng: <strong>-10 điểm</strong></li>
                                    <li>Vắng mặt không điểm danh: <strong>-15 điểm</strong></li>
                                 </ul>
                              </div>
                              <div className="mt-3">
                                 <p>Thời gian sự kiện: {formatDateVN(selectedEventForCancel.event.startAt)}</p>
                                 <p>Điểm reputation sẽ bị trừ: <strong>-{calculateReputationPenalty(selectedEventForCancel.event.startAt)} điểm</strong></p>
                              </div>
                              <div className="mt-3">
                                 <label className="form-label">Lý do hủy tham gia:</label>
                                 <textarea
                                    className="form-control"
                                    rows="3"
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    placeholder="Nhập lý do hủy tham gia..."
                                 />
                              </div>
                           </>
                        )}
                     </Modal.Body>
                     <Modal.Footer>
                        <Button
                           variant="secondary"
                           onClick={() => {
                              setShowCancelModal(false);
                              setCancelReason('');
                              setSelectedEventForCancel(null);
                           }}
                        >
                           Đóng
                        </Button>
                        <Button
                           variant="danger"
                           onClick={handleCancelConfirm}
                           disabled={!cancelReason.trim()}
                        >
                           Xác nhận hủy
                        </Button>
                     </Modal.Footer>
                  </Modal>

                  {/* Certificate Preview Modal */}
                  <Modal
                     show={showCertificateModal}
                     onHide={() => setShowCertificateModal(false)}
                     size="lg"
                     centered
                  >
                     <Modal.Header closeButton>
                        <Modal.Title>Xem trước chứng chỉ</Modal.Title>
                     </Modal.Header>
                     <Modal.Body>
                        {selectedCertificate && (
                           <div className="text-center">
                              <div className="position-relative mb-4">
                                 <Image
                                    src={selectedCertificate.certificateUrl}
                                    alt="Certificate Preview"
                                    style={{
                                       width: '100%',
                                       height: 'auto',
                                       filter: selectedCertificate.isPaid ? 'none' : 'blur(4px)',
                                       transition: 'filter 0.3s ease'
                                    }}
                                    preview={selectedCertificate.isPaid}
                                 />
                                 {!selectedCertificate.isPaid && (
                                    <div
                                       className="position-absolute top-50 start-50 translate-middle text-center w-100"
                                       style={{
                                          background: 'rgba(255, 255, 255, 0.95)',
                                          padding: '2rem',
                                          borderRadius: '1rem',
                                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                                       }}
                                    >
                                       <h4 className="mb-3" style={{ color: '#5DB996' }}>Chứng chỉ đã sẵn sàng</h4>
                                       <p className="text-muted mb-4">
                                          Để tải xuống và in chứng chỉ với chất lượng cao, vui lòng thanh toán phí 30.000đ
                                       </p>
                                       <div className="d-flex justify-content-center gap-3">
                                          <Button
                                             variant="primary"
                                             size="lg"
                                             onClick={() => handlePayment(selectedCertificate._id)}
                                             style={{
                                                backgroundColor: '#5DB996',
                                                borderColor: '#5DB996',
                                                padding: '0.5rem 2rem'
                                             }}
                                          >
                                             Thanh toán ngay
                                          </Button>
                                          <Button
                                             variant="outline-secondary"
                                             size="lg"
                                             disabled
                                             style={{
                                                padding: '0.5rem 2rem'
                                             }}
                                          >
                                             <i className="fas fa-download me-2"></i>
                                             Tải xuống
                                          </Button>
                                          <Button
                                             variant="outline-secondary"
                                             size="lg"
                                             disabled
                                             style={{
                                                padding: '0.5rem 2rem'
                                             }}
                                          >
                                             <i className="fas fa-print me-2"></i>
                                             In chứng chỉ
                                          </Button>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           </div>
                        )}
                     </Modal.Body>
                     <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowCertificateModal(false)}>
                           Đóng
                        </Button>
                     </Modal.Footer>
                  </Modal>
               </Container>
            </motion.div>
         )}
      </>
   );
}

export default MyEventsPage; 