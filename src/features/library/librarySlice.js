import { createSlice } from "@reduxjs/toolkit";

const librarySlice = createSlice({
  name: "library",
  initialState: { items: [] },
  reducers: {
    addItemsToLibrary(state, action) {
      action.payload.forEach((newItem) => {
        const alreadyInLibrary = state.items.some(
          (item) => item.movie.id === newItem.movie.id,
        );

        if (!alreadyInLibrary) {
          state.items.push(newItem);
        }
      });
    },

    clearLibrary(state) {
      state.items = [];
    },

    removeExpiredRentals(state, action) {
      const now = action.payload;

      state.items = state.items.filter(
        (item) =>
          item.type !== "rent" ||
          !item.rentalExpiresAt ||
          item.rentalExpiresAt > now,
      );
    },
  },
});

export const {
  addItemsToLibrary,
  clearLibrary,
  removeExpiredRentals,
} = librarySlice.actions;

export default librarySlice.reducer;