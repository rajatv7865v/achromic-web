import axiosObject from "../axios.config";

// Interface for contact form data
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}

// Interface for contact API response
export interface ContactResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  status: boolean;
  data?: any;
}

// Interface for newsletter subscription
export interface SubscribeData {
  email: string;
}

// Submit contact form
export const submitContactForm = async (
  formData: ContactFormData
): Promise<ContactResponse> => {
  try {
    const response = await axiosObject.post("/contact", formData);
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

// Subscribe to newsletter
export const subscribeNewsletter = async (
  subscribeData: SubscribeData
): Promise<ContactResponse> => {
  try {
    const response = await axiosObject.post("/contact/subscribe", subscribeData);
    return response.data;
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    throw error;
  }
};
