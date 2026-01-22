// src/api/orderApi.js
import axiosClient from "./axiosClient";

// Previews an order before submission
export const previewOrder = async (payload) => {
  try {
    const res = await axiosClient.post(`/orders/preview`, payload);
    return res.data;
  } catch (error) {
    console.error(
      "Error previewing order:",
      error.response?.data || error.message,
    );
    throw error;
  }
};

// Submits a new order to the backend
export const submitOrder = async (payload) => {
  try {
    const res = await axiosClient.post(`/orders`, payload);
    return res.data;
  } catch (error) {
    console.error(
      "Error submitting order:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
