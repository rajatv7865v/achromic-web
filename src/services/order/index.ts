import axiosObject from "../axios.config";

export interface BillingAddress {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  company: string;
  designation: string;
  billingAddress: BillingAddress;
  gstIN?: string;
  currency: string;
  paymentMethod: string;
  totalAmount: number;
}

export interface OrderResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  status: boolean;
  data?: any;
}

export const createOrder = async (orderData: OrderData): Promise<OrderResponse> => {
  try {
    const response = await axiosObject.post("/order", orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};