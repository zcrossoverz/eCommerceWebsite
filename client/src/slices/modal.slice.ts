import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

const initialState = {
  name: 'not set',
  open: false,
  nameDefault: '',
  descriptionDefault: '',
  id: 0,
};

export const brandModalSlice = createSlice({
  name: 'dashboard_brand_modal',
  initialState,
  reducers: {
    popup: (state, actions) => {
      state.name = actions.payload.name;
      state.open = !state.open;
      state.nameDefault = actions.payload.nameDefault;
      state.descriptionDefault = actions.payload.descriptionDefault;
      state.id = actions.payload.id;
    },
  },
});

export const { popup } = brandModalSlice.actions;
export const selectCurrentModal = (state: RootState) => {
  return {
    name: state.modalReducer.name,
    open: state.modalReducer.open,
    nameDefault: state.modalReducer.nameDefault,
    descriptionDefault: state.modalReducer.descriptionDefault,
    id: state.modalReducer.id,
  };
};
export default brandModalSlice.reducer;
