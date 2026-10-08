import { createSlice } from '@reduxjs/toolkit';
const librarySlice = createSlice ({
    name: "library",
    initialState: {items: [] },
    reducers: {
        addItemsToLibrary(state,action) {
            action.payload.forEach((newItem) => {
                const alreadyOwned = state.items.some((item) => item.movie.id === newItem.movie.id,
            );

            if (!alreadyOwned) {
                state.items.push(newItem);
            }
            });
        },

        clearLibrary(state) {
            state.items = [];
        },
    },
});

export const { addItemsToLibrary, clearLibrary } = librarySlice.actions;
export default librarySlice.reducer;