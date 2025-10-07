import axiosObject from "../axios.config";

export const getPartner = async (eventId:string) => {
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
