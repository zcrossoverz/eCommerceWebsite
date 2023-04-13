import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  rating: number;
}

const initialState: ProductState = {
  rating: 0,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<{ rating: number }>) => {
      state.rating = action.payload.rating;
    },
  },
});
export const { setRating } = productSlice.actions;

export default productSlice.reducer;
