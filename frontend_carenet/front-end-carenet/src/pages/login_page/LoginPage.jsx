import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/styles.css";
import { Button, Form } from "react-bootstrap";
import { motion } from "framer-motion";

const LoginPage = () => {
  return (
    <div className="login-container">
      <motion.div 
        className="login-box" 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center">CareNet chào bạn</h2>
        <p className="text-center">Tham gia cùng CareNet</p>
        <div className="social-login">
          <Button className="google-btn w-100 mb-2">Đăng nhập với Google</Button>
          <Button className="facebook-btn w-100">Sign in with Facebook</Button>
        </div>
        <div className="or-divider">OR</div>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control type="email" placeholder="Nhập email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mt-2">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" placeholder="Nhập mật khẩu" />
          </Form.Group>
          <div className="remember-me d-flex justify-content-between mt-2">
            <Form.Check type="checkbox" label="Lưu tài khoản" />
            <a href="/forgotpassword">Quên mật khẩu?</a>
          </div>
          <Button variant="dark" className="w-100 mt-3">Đăng nhập</Button>
        </Form>
        <p className="text-center mt-3">Bạn chưa có tài khoản? <a href="/register">Đăng ký</a></p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
