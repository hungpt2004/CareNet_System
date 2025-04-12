import { create } from "zustand";
import axios from "axios";
import CryptoJS from "crypto-js"; // Import crypto-js

const BASE_URL = import.meta.env.VITE_SERVER_URL;
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; // Key để mã hóa dữ liệu

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    console.error("Error decrypting data: ", err);
    return null; // Trả về null nếu có lỗi giải mã
  }
};

const useAuthStore = create((set) => ({
  currentUser: (() => {
    const userData = localStorage.getItem("user");
    return userData ? decryptData(userData) : null; // Nếu không có dữ liệu, trả về null
  })(),
  token: (() => {
    const tokenData = localStorage.getItem("token");
    return tokenData ? decryptData(tokenData) : null; // Nếu không có token, trả về null
  })(),
  loading: false,
  error: null,
  successMessage: null,

  login: async (email, password) => {
    try {
      set({ loading: true, error: null, successMessage: null });

      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      const user = res.data.user;
      const token = res.data.accessToken;
      const message = res.data.message;

      const encryptedUser = encryptData(user);
      const encryptedToken = encryptData(token);

      localStorage.setItem("user", encryptedUser); // Mã hóa trước khi lưu
      localStorage.setItem("token", encryptedToken); // Mã hóa trước khi lưu

      set({ currentUser: user, token, successMessage: message });
    } catch (err) {
      console.log(err.response);
      set({ error: err.response.data.message || "Đăng nhập thất bại" });
      throw err;
    } finally {
      setTimeout(() => {
        set({ loading: false });
      }, 2000);
    }
  },

  register: async (userData) => {
    try {
      set({ loading: true, error: null, successMessage: null });

      const res = await axios.post(`${BASE_URL}/auth/register`, userData);

      const user = res.data.user;
      const message = res.data.message;

      const encryptedUser = encryptData(user);

      localStorage.setItem("user", encryptedUser);

      set({ currentUser: user, successMessage: message });
    } catch (err) {
      set({ error: err.response?.data?.message || "Đăng ký thất bại" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ currentUser: null, token: null, successMessage: null });
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ successMessage: null }),
}));

export default useAuthStore;
