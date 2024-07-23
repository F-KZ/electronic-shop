import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };


const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers : {
        addToCart: (state, action) => {
            const item = action.payload

            const existItem = state.cartItems.find((x) => x._id === item._id)

            if(existItem){
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x)
            } else {
                state.cartItems = [...state.cartItems,item]
            }

            return updateCart(state, item)
            
        },

        removeProduct : (state, action) => {
            const item = action.payload;
            state.cartItems = state.cartItems.filter((x) => x._id !== item._id);
            console.log(item);
            return updateCart(state);
        },

        resetCart : (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        },


    saveShippingAddress: (state, action) => {
        state.shippingAddress = action.payload;
        localStorage.setItem('cart', JSON.stringify(state));
      },

      savePaymentMethod: (state, action) => {
        state.paymentMethod = action.payload;
        localStorage.setItem('cart', JSON.stringify(state));
      },
      clearCartItems: (state, action) => {
        state.cartItems = [];
        localStorage.setItem('cart', JSON.stringify(state));
      },
      // NOTE: here we need to reset state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      resetoCart: (state) => (state = initialState),
    }
})

export const { addToCart, removeProduct, resetCart, saveShippingAddress, savePaymentMethod, clearCartItems, resetoCart } = CartSlice.actions

export default CartSlice.reducer;
