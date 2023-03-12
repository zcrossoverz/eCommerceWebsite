import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from 'src/types/user.type';

interface UserState {
  userInfo: UserInfo;
}
const initialState: UserState = {
  userInfo: {
    firstName: '',
    lastName: '',
    role: '',
  },
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfor: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
  },
});
export const { setUserInfor } = userSlice.actions;

export default userSlice.reducer;
