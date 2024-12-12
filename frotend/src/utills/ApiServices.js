import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";

export const apiCall = async (endpoint, method = "GET", data = null) => {
  const config = {
    method,
    url: `${BASE_URL}${endpoint}`,
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
