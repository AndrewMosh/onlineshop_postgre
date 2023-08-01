import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

export const fetchProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createProduct = async (product) => {
  const response = await axios.post(BASE_URL, product);
  return response.data;
};

export const deleteProduct = async (productId) => {
  const response = await axios.delete(`${BASE_URL}/${productId}`);
  return response.data;
};

export const updateProduct = async (productId, updatedProduct) => {
  const response = await axios.put(`${BASE_URL}/${productId}`, updatedProduct);
  return response.data;
};
