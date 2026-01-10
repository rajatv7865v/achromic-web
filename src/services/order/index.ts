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

export interface OrderDetails {
  _id: string;
  firstName: string;
  lastName: string;
  currency: string;
  email: string;
  phoneNumber: string;
  company: string;
  designation: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  orderNumber: string;
  paymentDetails?: {
    paymentUrl?: string;
    params?: any;
    payuResponse?: {
      status?: string;
      error_Message?: string;
      amount?: string;
      txnid?: string;
      bank_ref_num?: string;
      [key: string]: any;
    };
    verified?: boolean;
    verifiedAt?: string;
  };
  paymentTransactionId?: string;
}

export interface OrderDetailsResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  status: boolean;
  data: {
    message: string;
    data: OrderDetails;
  };
}

export const getOrderByOrderNumber = async (orderNumber: string): Promise<OrderDetailsResponse> => {
  try {
    const response = await axiosObject.get(`/order/number/${orderNumber}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by order number:", error);
    throw error;
  }
};