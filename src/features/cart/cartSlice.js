import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        addToCart(state, action) {
            const { movie,type = 'rent', price } = action.payload;
            
            const existingItem = state.items.find(
                (item) => item.movie.id === movie.id,
            );

            if (existingItem) {
                existingItem.type = type;
                existingItem.price = price;
            } else {
                state.items.push({movie, type, price});
            }
        },
        removeFromCart(state, action) {
            state.items = state.items.filter(
                (item) => item.movie.id !== action.payload,
            );
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;