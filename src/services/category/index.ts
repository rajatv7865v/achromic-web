import axiosObject from "../axios.config";



export const getCategories = async () => {
  try {
    const uri: string = `category?page=1&limit=10`;
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
