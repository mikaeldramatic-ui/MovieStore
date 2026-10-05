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
    },
});

export const { addItemsToLibrary } = librarySlice.actions;
export default librarySlice.reducer;