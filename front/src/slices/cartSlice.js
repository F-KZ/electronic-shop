import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: []}


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
        }
    }
})

export const { addToCart, removeProduct } = CartSlice.actions

export default CartSlice.reducer;
