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
}