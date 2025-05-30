import { create } from "zustand";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const useAuthStore = create((set) => ({
  currentUser: (() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null; // Parse plain JSON data from localStorage
  })(),
  token: (() => {
    const tokenData = localStorage.getItem("token");
    return tokenData ? tokenData : null; // Get token as plain text
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

      localStorage.setItem("user", JSON.stringify(user)); // Store user as plain JSON
      localStorage.setItem("token", token); // Store token as plain text

      set({ currentUser: user, token, successMessage: message });
    } catch (err) {
      console.log(err.response.data);
      set({ error: err.response?.data?.message || "Đăng nhập thất bại" });
      throw err.response.data.message;
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

      localStorage.setItem("user", JSON.stringify(user)); // Store user as plain JSON

      set({ currentUser: user, successMessage: message });
    } catch (err) {
      set({ error: err.response?.data?.message || "Đăng ký thất bại" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
  updateUser: (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    set({ currentUser: updatedUser });
  },

  updateUser: (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    set({ currentUser: updatedUser });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ currentUser: null, token: null, successMessage: null });
  },

  clearError: () => set({ error: null }),
  clearSuccess: () => set({ successMessage: null }),
}));

  

export default useAuthStore
