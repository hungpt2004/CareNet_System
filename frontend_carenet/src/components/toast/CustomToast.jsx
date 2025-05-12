import { Flip, toast, ToastContainer } from "react-toastify";
import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

export const CustomToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={true}
      closeOnClick={false}
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      transition={Flip}
      style={{ 
        fontSize: "14px",
        fontWeight: "500",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }}
      toastStyle={{
        backgroundColor: "white",
        color: "#333",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        borderRadius: "8px",
        padding: "12px 16px",
        margin: "8px 0"
      }}
    />
  );
};

export const CustomSuccessToast = (msg) => {
  return toast.success(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: <AiOutlineCheckCircle size={22} color="#10B981" />,
    style: {
      backgroundColor: "#ECFDF5",
      color: "#065F46",
      borderLeft: "4px solid #10B981"
    }
  });
};

export const CustomFailedToast = (msg) => {
  return toast.error(msg, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: <AiOutlineCloseCircle size={22} color="#EF4444" />,
    style: {
      backgroundColor: "#FEF2F2",
      color: "#991B1B",
      borderLeft: "4px solid #EF4444"
    }
  });
};
