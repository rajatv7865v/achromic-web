import axiosObject from "../axios.config";

export const getAgenda = async (eventId: string) => {
  try {
    const uri: string = `agenda/event/${eventId}`;
    const response = await axiosObject.get(uri);
    if (response.status === 200) {
      // Return the full response data, let the component handle extraction
      return response.data;
    }
    throw new Error("Failed to load agenda");
  } catch (error) {
    throw error;
  }
};

export const getAgendaBySlug = async (slug: string) => {
  try {
    const uri: string = `agenda/event/slug/${slug}`;
    const response = await axiosObject.get(uri);
    if (response.status === 200) {
      // Return the full response data, let the component handle extraction
      return response.data;
    }
    throw new Error("Failed to load agenda");
  } catch (error) {
    throw error;
  }
};
