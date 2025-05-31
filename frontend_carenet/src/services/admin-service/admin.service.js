import axios from "axios";

export default class AdminService {
  BASE_URL = "http://localhost:5000/api/monthly-payment";

  // 1. Fetch data refund
  async fetchRefundData(organizationId, month = null, year) {
    try {
      const response = await axios.get(`${this.BASE_URL}/get-revenue-table`, {
        params: {
          organizationId,
          month,
          year,
        },
      });

      if (response.data) {
        return response.data; // Return the data directly
      }
    } catch (error) {
      console.error("Lỗi lấy thông tin hoàn tiền:", error);
    }
  }

  // 2. Pay refund
  async payRefund(organizationId, month = null, year) {
    try {
      const response = await axios.post(`${this.BASE_URL}/pay-refund`, {
         organizationId,
        month,
        year,
      });

      if (response.data) {
        return response.data; // Return the data directly
      }
    } catch (error) {
      console.error("Lỗi thanh toán hoàn tiền:", error);
    }
  }
}
