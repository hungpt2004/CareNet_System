import { Flip, toast, ToastContainer } from "react-toastify";
import React from "react";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export const CustomToast = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      closeButton={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      transition={Flip}
      style={{ fontSize: "15px" }}
    />
  );
};

export const CustomSuccessToast = (msg) => {
  return toast.success(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: <AiOutlineCheckCircle size={24} color="green" />,
  });
};

export const CustomFailedToast = (msg) => {
  return toast.error(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    icon: <AiOutlineCloseCircle size={24} color="red" />,
  });
};
