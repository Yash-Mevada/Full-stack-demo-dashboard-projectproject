import axios from "axios";

export const apiCall = async (endpoint, method = "GET", data = null) => {
  const config = {
    method,
    url: `http://localhost:4000${endpoint}`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error during API call to ${endpoint}:`, error);
    throw error;
  }
};
