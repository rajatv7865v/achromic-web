import axiosObject from "../axios.config";

export interface GetEventsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  search?: string;
  searchFields?: string;
  eventType?: string;
}

export async function getEvents(params?: GetEventsParams) {
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

    if (params?.eventType) queryParams.append("eventType", params.eventType);

    const uri = `event${queryParams.toString() ? `?${queryParams}` : ""}`;

    const response = await axiosObject.get(uri);

    if (!response?.data?.data) {
      throw new Error(response?.data?.message || "Failed to fetch events");
    }

    // API response: { ok, message, data }
    return {
      data: response.data.data ?? [],
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

export const getEventBySlug = async (slug: string) => {
  try {
    const uri: string = `event/slug/${slug}`;
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
