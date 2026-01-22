// api/axiosClient.js

// Centralized Axios instance for API calls
import axios from "axios"; // library for making HTTP requests, Why not fetch? Axios is easier to use and has more features
export default axios.create({
  baseURL: "http://localhost:3001/api", //Creates a pre-configured version of axios with a base URL.
});
