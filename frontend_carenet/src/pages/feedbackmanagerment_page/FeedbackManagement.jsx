import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Button, Form, Container, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, user: "Nguyen Van A", event: "Hội chợ thú cưng", rating: 5, message: "Sự kiện rất tuyệt!", date: "2024-03-25" },
    { id: 2, user: "Tran Thi B", event: "Triển lãm chó mèo", rating: 3, message: "Cần tổ chức tốt hơn.", date: "2024-03-24" },
  ]);

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <motion.div
        className="feedback-box"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg p-4 border-0 rounded" style={{ width: "800px" }}>
          <Card.Body>
            <motion.h2
              className="text-center text-dark mb-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Quản lý phản hồi
            </motion.h2>

            <Table bordered hover responsive className="mt-3">
              <thead style={{ backgroundColor: "#0E606E", color: "white" }}>
                <tr>
                  <th>Người dùng</th>
                  <th>Sự kiện</th>
                  <th>Đánh giá</th>
                  <th>Nội dung</th>
                  <th>Ngày</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.length > 0 ? (
                  feedbacks.map((feedback) => (
                    <motion.tr
                      key={feedback.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <td>{feedback.user}</td>
                      <td>{feedback.event}</td>
                      <td>
                        {[...Array(5)].map((_, index) => (
                          <FaStar key={index} color={index < feedback.rating ? "#FFD700" : "#C0C0C0"} />
                        ))}
                      </td>
                      <td>{feedback.message}</td>
                      <td>{feedback.date}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          className="rounded-pill"
                          onClick={() => handleDelete(feedback.id)}
                        >
                          Xóa
                        </Button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      Không có phản hồi nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Custom Styles Inside JSX */}
      <style>{`
        .feedback-box {
          max-width: 100%;
        }
        .table th {
          text-align: center;
        }
        .table td {
          vertical-align: middle;
          text-align: center;
        }
      `}</style>
    </Container>
  );
};

export default FeedbackManagement;
    