"use client"

import { useState, useEffect, createContext, useContext } from "react"
import { Toast, ToastContainer } from "react-bootstrap"

// Tạo context để quản lý toast
const ToastContext = createContext()

// Hook để sử dụng toast
export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  // Thêm toast mới
  const showToast = (message, variant = "success", duration = 3000) => {
    const id = Date.now()
    setToasts((prevToasts) => [...prevToasts, { id, message, variant, duration }])
    return id
  }

  // Hiển thị toast thành công
  const showSuccess = (message, duration = 3000) => {
    return showToast(message, "success", duration)
  }

  // Hiển thị toast lỗi
  const showError = (message, duration = 3000) => {
    return showToast(message, "danger", duration)
  }

  // Hiển thị toast cảnh báo
  const showWarning = (message, duration = 3000) => {
    return showToast(message, "warning", duration)
  }

  // Hiển thị toast thông tin
  const showInfo = (message, duration = 3000) => {
    return showToast(message, "info", duration)
  }

  // Xóa toast
  const hideToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  // Tự động xóa toast sau khi hiển thị đủ thời gian
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1))
      }, toasts[0].duration)

      return () => clearTimeout(timer)
    }
  }, [toasts])

  return (
    <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo, hideToast }}>
      {children}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
        {toasts.map((toast) => (
          <Toast key={toast.id} onClose={() => hideToast(toast.id)} bg={toast.variant} className="mb-2">
            <Toast.Header closeButton>
              <strong className="me-auto">
                {toast.variant === "success" && "Thành công"}
                {toast.variant === "danger" && "Lỗi"}
                {toast.variant === "warning" && "Cảnh báo"}
                {toast.variant === "info" && "Thông tin"}
              </strong>
            </Toast.Header>
            <Toast.Body className={toast.variant === "danger" || toast.variant === "dark" ? "text-white" : ""}>
              {toast.message}
            </Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  )
}

// Component Toast riêng biệt để sử dụng trực tiếp
export const ToastNotification = ({ show, onClose, variant, title, message, delay = 3000 }) => {
  return (
    <Toast show={show} onClose={onClose} delay={delay} autohide bg={variant}>
      <Toast.Header closeButton>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body className={variant === "danger" || variant === "dark" ? "text-white" : ""}>{message}</Toast.Body>
    </Toast>
  )
}

export default ToastNotification

