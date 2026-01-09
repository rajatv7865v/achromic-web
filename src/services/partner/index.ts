// For now, we'll use fetch for local API routes
// import { axiosInstance } from '../axios.config';
import axiosObject from "../axios.config";

export interface Partner {
  logo: string;
  companyUrl?: string;
  isActive: boolean;
  category?: "Bronze" | "Silver" | "Platinum" | "Gold" | "Other";
}

// New interface for the API response structure
export interface ApiPartner {
  _id: string;
  name: string;
  imagePath: string;
  companyUrl: string;
  partnerType:
    | "GOLD_PARTNER"
    | "PLATINUM_PARTNER"
    | "SILVER_PARTNER"
    | "BRONZE_PARTNER"
    | "OTHER_PARTNER"
    | "other";
  eventId: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ApiPartnersResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  status: boolean;
  data: {
    data: ApiPartner[];
    meta: {
      page: string;
      limit: string;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface PartnersResponse {
  partners: Partner[];
  total: number;
  page: number;
  limit: number;
}

export const partnerService = {
  // Get all partners
  getAllPartners: async (): Promise<PartnersResponse> => {
    try {
      const response = await axiosObject.get("/api/partners");
      return response.data;
    } catch (error) {
      console.error("Error fetching partners:", error);
      throw error;
    }
  },

  // Get featured partners (for homepage)
  getFeaturedPartners: async (): Promise<Partner[]> => {
    try {
      const response = await axiosObject.get("/api/partners/featured");
      return response.data;
    } catch (error) {
      console.error("Error fetching featured partners:", error);
      throw error;
    }
  },

  // Get partners by category (removed since Partner interface doesn't have category)
  getPartnersByCategory: async (category: string): Promise<Partner[]> => {
    try {
      const response = await axiosObject.get(
        `/api/partners?category=${category}`
      );
      return response.data.partners;
    } catch (error) {
      console.error("Error fetching partners by category:", error);
      throw error;
    }
  },

  // Get partners for specific event
  getEventPartners: async (eventId: string): Promise<Partner[]> => {
    try {
      // For now, return mock data filtered by event
      const { mockPartners } = await import("../../data/mockPartners");
      return mockPartners.filter((partner) => partner.isActive);
    } catch (error) {
      console.error("Error fetching event partners:", error);
      throw error;
    }
  },

  // Get partners from the new API with filters
  getPartnersFromApi: async (
    eventId: string,
    page: number = 1,
    limit: number = 10,
    sortBy: string = "createdAt",
    sortOrder: "asc" | "desc" = "desc",
    search: string = "",
    searchFields: string = "name,email"
  ): Promise<ApiPartnersResponse> => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
        search,
        searchFields,
        eventId, // Add event ID to search params
      });

      const response = await axiosObject.get(`/partner?${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching partners from API:", error);
      throw error;
    }
  },

  // Get partner by ID (Note: simplified Partner interface doesn't have id field)
  getPartnerById: async (id: string): Promise<Partner | null> => {
    try {
      // Since our simplified Partner interface doesn't have an id field,
      // this function is kept for API compatibility but returns null
      return null;
    } catch (error) {
      console.error("Error fetching partner:", error);
      throw error;
    }
  },

  // Create new partner (admin only)
  createPartner: async (partnerData: Partner): Promise<Partner> => {
    try {
      const response = await axiosObject.post("/api/partners", partnerData);
      return response.data;
    } catch (error) {
      console.error("Error creating partner:", error);
      throw error;
    }
  },

  // Update partner (admin only)
  updatePartner: async (
    id: string,
    partnerData: Partial<Partner>
  ): Promise<Partner | null> => {
    try {
      // Since our simplified Partner interface doesn't have an id field,
      // this function is kept for API compatibility but returns null
      return null;
    } catch (error) {
      console.error("Error updating partner:", error);
      throw error;
    }
  },

  // Delete partner (admin only)
  deletePartner: async (id: string): Promise<void> => {
    try {
      // For now, just log the action
      console.log("Partner deleted:", id);
    } catch (error) {
      console.error("Error deleting partner:", error);
      throw error;
    }
  },
};

// Re-export mockPartners for convenience
export { mockPartners } from "../../data/mockPartners";

// Legacy function for getting partners by event ID
export const getPartner = async (eventId: string) => {
  try {
    const uri: string = `/partner/${eventId}?page=1&limit=50`;
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

// Export axios for use in API routes
export { default as axiosObject } from "../axios.config";
