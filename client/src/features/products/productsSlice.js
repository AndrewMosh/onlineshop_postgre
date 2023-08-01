import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  fetchProducts,
} from "./productsAPI";

// Define an async thunk to fetch products from the backend
export const getProducts = createAsyncThunk("products/fetch", async () => {
  try {
    const fetchedProducts = await fetchProducts();
    return fetchedProducts;
  } catch (error) {
    throw error;
  }
});

// Async thunk for creating a new product
export const createNewProduct = createAsyncThunk(
  "products/create",
  async (newProductData, { rejectWithValue }) => {
    try {
      const createdProduct = await createProduct(newProductData);
      return createdProduct;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for deleting a product
export const deleteExistingProduct = createAsyncThunk(
  "products/delete",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteProduct(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for updating a product
export const updateExistingProduct = createAsyncThunk(
  "products/update",
  async ({ productId, updatedProductData }, { rejectWithValue }) => {
    try {
      const updatedProduct = await updateProduct(productId, updatedProductData);
      return updatedProduct;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Add other synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteExistingProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteExistingProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(deleteExistingProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateExistingProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(updateExistingProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
