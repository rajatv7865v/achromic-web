import axiosObject from "../axios.config";

export const getEvent = async () => {
  try {
    const uri: string = `event?page=1&limit=50`;
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
export const getEventBySlug = async (slug:string) => {
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
