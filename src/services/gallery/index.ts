import axiosObject from "../axios.config";

export interface GetAllGalleriesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  searchFields?: string;
}

export const getAllGalleries = async (params?: GetAllGalleriesParams) => {
  try {
    const queryParams = new URLSearchParams();

    if (params?.page !== undefined)
      queryParams.append("page", String(params.page));

    if (params?.limit !== undefined)
      queryParams.append("limit", String(params.limit));

    if (params?.sortBy) queryParams.append("sortBy", params.sortBy);

    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);

    if (params?.search) queryParams.append("search", params.search);

    if (params?.searchFields)
      queryParams.append("searchFields", params.searchFields);

    const uri = `gallery/all${queryParams.toString() ? `?${queryParams}` : ""}`;

    const response = await axiosObject.get(uri);

    // API response structure: { statusCode, message, data: { data: [...], meta: {...} } }
    if (!response?.data?.data?.data) {
      throw new Error(response?.data?.message || "Failed to fetch galleries");
    }

    return {
      data: response.data.data.data ?? [],
      meta: response.data.data.meta ?? {},
    };
  } catch (error) {
    console.error("Error fetching galleries:", error);
    throw error;
  }
};

export const getGalleryByEvent = async (eventId: string) => {
    try {
      const uri: string = `gallery/${eventId}`;
      const response = await axiosObject.get(uri);
      if (response.status === 200) {
        console.log("response", response.data);
        return response.data.data;
      }
      throw new Error("Failed to load Gallery");
    } catch (error) {
      throw error;
    }
  };
export const getGalleryByEventSlug = async (slug: string) => {
    try {
      const uri: string = `gallery/slug/${slug}`;
      const response = await axiosObject.get(uri);
      if (response.status === 200) {
        console.log("response", response.data);
        return response.data.data;
      }
      throw new Error("Failed to load Gallery");
    } catch (error) {
      throw error;
    }
  };