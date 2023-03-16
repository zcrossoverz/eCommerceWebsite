import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

const initialState = {
  name: 'home',
};

export const navigationSlice = createSlice({
  name: 'dashboard_navigation',
  initialState,
  reducers: {
    navigate: (state, actions) => {
      state.name = actions.payload;
    },
  },
});

export const { navigate } = navigationSlice.actions;
export const selectCurrentTab = (state: RootState) => state.navigationReducer.name;
export default navigationSlice.reducer;
