import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

// 2. The Prediction Function
export const analyzeImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  try {
    const response = await axios.post(`${API_URL}/predict`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // Returns { class: "...", confidence: "...", ... }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
