import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Country } from "../types/countryCardType";

interface CountryState {
  countries: Country[];
  favorites: Country[];
}

const initialState: CountryState = {
  countries: [],
  favorites: [],
};

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountries: (state, action: PayloadAction<Country[]>) => {
      state.countries = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<Country>) => {
      const newFavorites = [...state.favorites, action.payload];
      state.favorites = newFavorites;
    },
    removeFromFavorites: (state, action: PayloadAction<Country>) => {
      const updatedFavorites = state.favorites.filter(
        (fav) => fav.name.common !== action.payload.name.common
      );
      state.favorites = updatedFavorites;
    },
  },
});

export const { setCountries, addToFavorites, removeFromFavorites } =
  countrySlice.actions;

export default countrySlice.reducer;
