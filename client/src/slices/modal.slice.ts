import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

const initialState = {
  name: 'not set',
  open: false,
};

export const modalSlice = createSlice({
  name: 'dashboard_modal',
  initialState,
  reducers: {
    popup: (state, actions) => {
      state.name = actions.payload.name;
      state.open = !state.open;
    },
  },
});

export const { popup } = modalSlice.actions;
export const selectCurrentModal = (state: RootState) => {
  return { name: state.modalReducer.name, open: state.modalReducer.open };
};
export default modalSlice.reducer;
