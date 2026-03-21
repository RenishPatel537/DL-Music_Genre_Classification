import axios from "axios";

// Using Vite's env vars if available, otherwise fallback to localhost
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const predictGenre = async (audioFile) => {
  try {
    const formData = new FormData();
    formData.append("file", audioFile);

    const response = await apiClient.post("/predict", formData);
    return response.data;
  } catch (error) {
    console.error("Error predicting genre:", error);
    throw error;
  }
};
