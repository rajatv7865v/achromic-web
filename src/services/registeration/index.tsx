import axiosObject from "../axios.config";

// Interface for registration event data
export interface RegistrationEvent {
  _id: string;
  name: string;
  description: string;
  industryPrice: number;
  industryStrikePrice: number;
  consultingPrice: number;
  consultingStrikePrice: number;
  benifits: string[];
  eventId: {
    _id: string;
    name: string;
    description: string;
    content: string;
    dateFrom: string;
    dateTo: string;
    bannerUrl: string;
    timeFrom: string;
    timeTo: string;
    slug: string;
    venue: string;
    location: string;
    categories: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  };
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface RegistrationResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  status: boolean;
  data: {
    message: string;
    data: RegistrationEvent[];
  };
}

export const getRegisteration = async (eventId: string): Promise<RegistrationResponse> => {
  try {
    const uri: string = `/registeration/event/${eventId}`;
    const response = await axiosObject.get(uri);
    if (response.status === 200) {
      console.log("response", response.data);
      return response.data;
    }
    throw new Error("Failed to load registration details");
  } catch (error) {
    throw error;
  }
};

// Legacy function for backward compatibility
export const getRegisterationLegacy = async (eventId: string) => {
  try {
    const uri: string = `/ticket?event=${eventId}?`;
    const response = await axiosObject.get(uri);
    if (response.status === 200) {
      console.log("response", response.data);
      return response.data.data;
    }
    throw new Error("Failed to load categories");
  } catch (error) {
    throw error;
  }
};
