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
  reducers: {},
});
// export const {  } = userSlice.actions;

export default userSlice.reducer;
