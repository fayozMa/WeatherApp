import axiosInstance from "./axios";

export const getCurrentWeather = async (city: string) => {
  try {
    const response = await axiosInstance.get("/current.json", {
      params: {
        q: city,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Ob-havo ma'lumotlarini olishda xatolik:", error.message);
    throw error;
  }
};
