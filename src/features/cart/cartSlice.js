import { createSlice } from '@reduxjs/toolkit';

const cartSLice = createSlice({
    name: 'cart',
    initialState: { items: [] },
    reducers: {
        addToCart(state, action) {
            const { movie,type = 'rent' } = action.payload;
            const alreadyAdded = state.items.some(
                (item) => item.movie.id === movie.id,
            );

            if (!alreadyAdded) {
                state.items.push({movie, type});
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

export const { addToCart, removeFromCart, clearCart } = cartSLice.actions;
export default cartSLice.reducer;