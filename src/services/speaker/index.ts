import axiosObject from "../axios.config";

export const getSpeaker = async (eventId:string) => {
  try {
    const uri: string = `/speaker/${eventId}?page=1&limit=50`;
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
