import axiosObject from "../axios.config";

export const getRegisteration= async (eventId:string) => {
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
