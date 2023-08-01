import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // An array to store cart items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { productId, quantity, name, price } = action.payload;
      // Check if the product is already in the cart
      const existingItem = state.items.find((item) => item.id === productId);
      if (existingItem) {
        // If the product is in the cart, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add it to the cart
        state.items.push({ id: productId, quantity, name, price });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      // Remove the product from the cart based on its ID
      state.items = state.items.filter((item) => item.id !== productId);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      // Update the quantity of the product in the cart
      const itemToUpdate = state.items.find((item) => item.id === productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export the actions for use in components
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// Export a selector to access the cart state in components
export const selectCartItems = (state) => state.cart.items;

export default cartSlice.reducer;
