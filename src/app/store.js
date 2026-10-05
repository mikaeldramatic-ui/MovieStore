import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import libraryReducer from "../features/library/librarySlice.js"; 

export const store = configureStore ({
    reducer: {
        cart: cartReducer,
        library: libraryReducer,
    },
});
