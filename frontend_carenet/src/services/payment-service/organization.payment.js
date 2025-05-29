import axiosInstance from "../../utils/AxiosInstance";

export const handleUpgradeServiceForOrganization = async () => {
  try {
    const response = await axiosInstance.post(`/payment/create-payment-service`);

    if (response.data.status === "success" && response.data.checkoutUrl) {
      return response.data;
    }
  } catch (error) {
    console.error("Error upgrading organization:", error);
    throw error;
  }
};

