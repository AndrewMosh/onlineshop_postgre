import axios from "axios";

const BASE_URL = "/api/cart"; // Assuming the backend has cart-related routes under '/api/cart'

// Function to add a product to the cart
export const addToCart = async (productId, quantity) => {
  const response = await axios.post(`${BASE_URL}/add`, { productId, quantity });
  return response.data;
};

// Function to remove a product from the cart
export const removeFromCart = async (productId) => {
  const response = await axios.delete(`${BASE_URL}/remove/${productId}`);
  return response.data;
};

// Function to update the quantity of a product in the cart
export const updateCartQuantity = async (productId, quantity) => {
  const response = await axios.put(`${BASE_URL}/update/${productId}`, {
    quantity,
  });
  return response.data;
};
