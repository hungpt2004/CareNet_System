import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json", //Dữ liệu gửi đi dạng JSON
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // Chỉ xóa localStorage khi token hết hạn hoặc không hợp lệ
      if (status === 401 && data?.message?.includes('token')) {
        console.log("Token expired or invalid:", data);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Xử lý lỗi 403 (Forbidden)
      if (status === 403) {
        console.log("Access forbidden:", data);
        return Promise.reject(error);
      }

      // Xử lý các lỗi khác
      console.log("API Error:", {
        status: status,
        data: data,
        message: data?.message || "Có lỗi xảy ra"
      });
    } else if (error.request) {
      // Lỗi không nhận được response từ server
      console.log("Network Error:", error.request);
    } else {
      // Lỗi khi setting up request
      console.log("Request Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
