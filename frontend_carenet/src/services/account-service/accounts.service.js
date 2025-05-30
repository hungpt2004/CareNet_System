import axios from "axios";

export default class AccountsService {
  async getAllAccounts() {
    try {
      const response = await axios(`http://localhost:5000/admin/accounts`);
      return response.data; //userList, organizationList, eventList
    } catch (error) {
      console.error('Error fetching accounts:', error);
      throw error;
    }
  }
}