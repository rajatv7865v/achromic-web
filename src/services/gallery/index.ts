import axiosObject from "../axios.config";

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