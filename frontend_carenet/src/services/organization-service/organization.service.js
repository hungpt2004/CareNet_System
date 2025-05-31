import axios from "axios";
import axiosInstance from "../../utils/AxiosInstance";

export default class OrganizationService {

   // 1. Fetch detail organization
   async fetchCurrentOrganization() {
      try {
         const response = await axiosInstance.get('organization/get-organization-info');
         if (response.data) {
            return response.data;
         }
      } catch (error) {
         console.error("Error fetching organization:", error);
         throw error;
      }
   }

   // 2. Calculate all revenue in 12 months
   async calculateRevenueIn12Months(year) {
      try {
         const response = await axiosInstance.get(`api/monthly-payment/calculate-full?year=${year}`);
         if (response.data) {
            return response.data; 
         }
      } catch (error) {
         console.error("Error calculating revenue in 12 months:", error);
         throw error;
      }
   }

   // 3. Fetch all organizations
   async fetchAllOrganizations() {
      try {
         const response = await axios.get('http://localhost:5000/admin/organizations');
         if (response.data) {
            return response.data; // organizationList
         }
      } catch (error) {
         console.error("Error fetching all organizations:", error);
         throw error;
      }
   }

}