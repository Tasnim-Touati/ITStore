// src/api/orderApi.js
import axiosClient from "./axiosClient";

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
