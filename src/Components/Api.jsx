// api.js
import axios from "axios";

// Base URL for the API
const API_BASE_URL = "http://localhost:3000/api/";

export const apiRequest = async (
  method,
  endpoint,
  data = null,
  headers = {}
) => {
  const url = `${API_BASE_URL}${endpoint}`; // Construct the full URL
  try {
    const response = await axios({
      method,
      url,
      data,
      headers,
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("API request failed:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};
