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

   
}