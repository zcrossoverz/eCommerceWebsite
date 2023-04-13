import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { UserInfo } from 'src/types/user.type';
import { getAccessToken } from 'src/utils/auth';

interface UserState {
  userInfo: UserInfo;
}

function init() {
  const token = getAccessToken();
  if (token) {
    const user = jwtDecode<{
      firstName: string;
      lastName: string;
      user_id: number;
      iat: string;
      role: string;
    }>(token);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      id: user.user_id,
    };
  }
}
const initialState: UserState = {
  userInfo: (init() as UserInfo) || {},
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfor: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    reset: (state) => {
      state.userInfo = (init() as UserInfo) || {};
    },
  },
});
export const { setUserInfor, reset } = userSlice.actions;

export default userSlice.reducer;
