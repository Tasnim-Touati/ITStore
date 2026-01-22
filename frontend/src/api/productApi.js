// src/api/productApi.js
import axiosClient from "./axiosClient";

// Fetches the list of all products from the backend
export const fetchProducts = async () => {
  // Added async keyword to allow await usage
  try {
    const res = await axiosClient.get("/products"); // await ; pauses execution until the request completes
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Fetches a single product by ID
export const fetchProductById = async (id) => {
  try {
    const res = await axiosClient.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching product:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
