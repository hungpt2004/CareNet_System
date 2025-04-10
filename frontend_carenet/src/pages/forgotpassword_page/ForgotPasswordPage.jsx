import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const ForgotPasswordPage = () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <motion.div
        className="forgot-password-box"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="shadow-lg p-4 border-0 rounded" style={{ width: "350px" }}>
          <Card.Body>
            <div className="text-center">
              <motion.h2
                className="text-dark mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Quên mật khẩu
              </motion.h2>
              <motion.p
                className="text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Nhập email của bạn để đặt lại mật khẩu.
              </motion.p>
            </div>

            <Form>
              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label className="text-dark">Email</Form.Label>
                <Form.Control type="email" placeholder="Nhập email của bạn" className="rounded-pill" />
              </Form.Group>

              <motion.div
                className="text-center mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button
                  className="w-100 rounded-pill"
                  style={{ backgroundColor: "#1877F2", border: "none" }}
                >
                  Đặt lại mật khẩu
                </Button>
              </motion.div>
            </Form>

            <p className="text-center text-muted mt-3">
              <a href="/login" className="text-primary">
                Quay lại đăng nhập
              </a>
            </p>
          </Card.Body>
        </Card>
      </motion.div>

      {/* Custom Styles Inside JSX */}
      <style>{`
        .forgot-password-box {
          max-width: 100%;
        }
        .form-control {
          background: #f8f9fa;
          color: #333;
          border-radius: 50px;
          border: 1px solid #ced4da;
          padding: 10px;
        }
        .form-control:focus {
          background: #fff;
          color: #333;
          box-shadow: none;
          border: 1px solid #5DB996;
        }
      `}</style>
    </Container>
  );
};

export default ForgotPasswordPage;
