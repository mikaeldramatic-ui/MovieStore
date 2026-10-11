import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice.js";
import libraryReducer from "../features/library/librarySlice.js";

const STORAGE_KEY = "movieStoreState";

function getItemsOrEmpty(slice) {
  return Array.isArray(slice?.items) ? slice.items : [];
}

function loadPersistedState() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
      return undefined;
    }

    const parsedState = JSON.parse(savedState);

    return {
      cart: {
        items: getItemsOrEmpty(parsedState?.cart),
      },
      library: {
        items: getItemsOrEmpty(parsedState?.library),
      },
    };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    library: libraryReducer,
  },
  preloadedState: loadPersistedState(),
});

store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch (error) {
    console.error("Could not save MovieStore state:", error);
  }
});