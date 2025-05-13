import { useState, useEffect, useRef } from "react";
import { Container, Button, Modal, Badge } from "react-bootstrap";
import { Calendar, MapPin, Users, Clock, Award, Eye, ChevronRight } from "lucide-react";
import { Table, Tag, Space, Image } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "../../utils/AxiosInstance";
import useAuthStore from "../../hooks/authStore";
import { CustomToast } from "../../components/toast/CustomToast";
import CustomSpinner from "../../components/spinner/CustomSpinner";
import io from 'socket.io-client';

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
   const socketRef = useRef(null);
   const currentUser = useAuthStore((state) => state.currentUser);

   // Fetch user's registered events
   const fetchUserEvents = async () => {
      setIsLoading(true);
      try {
         const response = await axiosInstance.get("/event/get-my-events");
         setEvents(response.data.events);
      } catch (error) {
         console.error("Error fetching events:", error);
      } finally {
         setTimeout(() => {
            setIsLoading(false);
         }, 1500);
      }
   };

   // Socket.IO setup
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

   // Format date for display
   const formatDate = (dateString) => {
      const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      return new Date(dateString).toLocaleDateString("vi-VN", options);
   };

   // Format time for display
   const formatTime = (dateString) => {
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return new Date(dateString).toLocaleTimeString("vi-VN", options);
   };

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

   // Handle certificate purchase
   const handlePurchaseCertificate = async (eventId) => {
      // Implement certificate purchase logic here
      console.log("Purchase certificate for event:", eventId);
   };

   const fullAddressGenerate = (address) => {
      return `${address.street}, ${address.ward}, ${address.district}, ${address.province}`;
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
               <div>{formatDate(startAt)}</div>
               <div style={{ color: "#666" }}>
                  {formatTime(startAt)} - {formatTime(record.event.endAt)}
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
         render: (date) => formatDate(date),
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
                  <Eye size={16} className="me-1" /> Chi tiết
               </Button>
               {record.status === "approved" && (
                  <Button
                     variant="outline-success"
                     size="sm"
                     onClick={() => handlePurchaseCertificate(record._id)}
                  >
                     <Award size={16} className="me-1" /> Chứng chỉ
                  </Button>
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
                                                <div className="fw-bold">{formatDate(selectedEvent.startAt)}</div>
                                                <div className="text-muted">
                                                   {formatTime(selectedEvent.startAt)} - {formatTime(selectedEvent.endAt)}
                                                </div>
                                             </div>
                                          </div>

                                          <div className="d-flex align-items-center mb-2">
                                             <MapPin size={18} className="me-2" style={{ color: customStyles.primaryColor }} />
                                             <div>
                                                <div className="fw-bold">Địa điểm</div>
                                                <div>{fullAddressGenerate(selectedEvent.location) || "Không xác định"}</div>
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
                                                   onClick={() => handlePurchaseCertificate(selectedEvent._id)}
                                                >
                                                   <Award size={18} className="me-2" />
                                                   Mua chứng chỉ tham gia
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
               </Container>
            </motion.div>
         )}
      </>
   );
}

export default MyEventsPage; 