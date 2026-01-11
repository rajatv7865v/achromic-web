import axiosObject from "../axios.config";

export interface Banner {
  _id: string;
  type: "image" | "video";
  image?: string;
  video?: string;
  title: string;
  subtitle: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ActiveBannersResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  status: boolean;
  data: {
    message: string;
    data: Banner[];
  };
}

export const getActiveBanners = async (): Promise<Banner[]> => {
  try {
    const response = await axiosObject.get<ActiveBannersResponse>("/banner/active");
    
    // API response structure: { statusCode, message, data: { data: [...] } }
    if (!response?.data?.data?.data) {
      throw new Error(response?.data?.message || "Failed to fetch banners");
    }

    return response.data.data.data ?? [];
  } catch (error) {
    console.error("Error fetching active banners:", error);
    throw error;
  }
};
