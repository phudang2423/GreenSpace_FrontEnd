import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch Cart Items
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (username) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/cart/${username}`);
      return response.data;  // Return the cart items from the backend
    } catch (error) {
      throw Error('Failed to fetch cart items');
    }
  }
);

// Update Cart Item on Backend
export const updateCartItemOnBackend = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, newQuantity, username }) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/cart/update`, {
        username,
        productId,
        newQuantity,
      });
      return response.data; // Return updated cart item
    } catch (error) {
      throw Error('Failed to update cart item');
    }
  }
);

// Delete Cart Item
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',  
  async ({ productId, username }) => {
    try {
      await axios.delete(`http://localhost:8080/api/cart/remove/${username}/${productId}`);
      return productId; // Return productId to delete from the state
    } catch (error) {
      throw Error('Failed to remove item from cart');
    }
  }
);

// Action to add product to cart (newly added)
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (cartItem) => {
    try {
      const response = await axios.post('http://localhost:8080/api/cart/add', cartItem);
      return response.data; // Return the added cart item
    } catch (error) {
      throw Error('Failed to add item to cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;  // Set items from backend
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCartItemOnBackend.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const index = state.items.findIndex(
          (item) => item.productId === updatedItem.productId
        );
        if (index !== -1) {
          state.items[index] = updatedItem; // Update cart item in local state
        }
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        // Filter out the item with the given productId to update the state
        state.items = state.items.filter(item => item.productId !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handling the `addToCart` action
      .addCase(addToCart.fulfilled, (state, action) => {
        const newItem = action.payload;
        const existingItem = state.items.find(item => item.productId === newItem.productId);
      
        if (existingItem) {
          existingItem.quantity += newItem.quantity; // Tăng số lượng sản phẩm
        } else {
          state.items.push(newItem); // Thêm sản phẩm mới nếu chưa có trong giỏ
        }
      });
      
  },
});

export default cartSlice.reducer;
