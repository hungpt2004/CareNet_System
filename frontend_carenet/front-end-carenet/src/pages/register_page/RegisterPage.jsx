import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Container } from "react-bootstrap";
import { motion } from "framer-motion";

const RegisterPage = () => {
  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <motion.div 
        className="register-box shadow rounded p-4 mt-5"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-box text-center">
          <h2 className="text-primary">CareNet chào bạn</h2>
          <p className="text-muted">Tham gia cùng CareNet</p>
        </div>

        {/* Google & Facebook Buttons */}
        <Button variant="danger" className="w-100 mb-2">
          Đăng nhập với Google
        </Button>
        <Button variant="primary" className="w-100 mb-3">
          Sign in with Facebook
        </Button>

        <div className="text-center text-muted">OR</div>

        {/* Registration Form */}
        <Form>
          <Form.Group controlId="formBasicEmail" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Nhập email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mt-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" placeholder="Nhập mật khẩu" />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control type="password" placeholder="Nhập lại mật khẩu" />
          </Form.Group>

          <Form.Group controlId="formBirthDay" className="mt-3">
            <Form.Label>Ngày sinh</Form.Label>
            <Form.Control type="date" />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mt-3">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="tel" placeholder="Nhập số điện thoại" />
          </Form.Group>

          <Button variant="dark" className="w-100 mt-4">Đăng ký</Button>
        </Form>

        <p className="text-center text-muted mt-3">
          Bạn đã có tài khoản? <a href="#" className="text-primary">Đăng nhập</a>
        </p>
      </motion.div>

      {/* Custom CSS */}
      <style>{`
        .register-box {
          background: white;
          width: 100%;
          max-width: 400px;
          border-radius: 8px;
          padding: 30px;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        }
        .form-control {
          background: #f8f9fa;
          border: 1px solid #ced4da;
        }
        .form-control:focus {
          border-color: #0E4D64;
          box-shadow: 0 0 0 2px rgba(14, 77, 100, 0.2);
        }
        .btn-danger {
          background-color: #DB4437;
          border: none;
        }
        .btn-primary {
          background-color: #1877F2;
          border: none;
        }
      `}</style>
    </Container>
  );
};

export default RegisterPage;
