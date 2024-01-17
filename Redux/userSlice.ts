// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: UserData | null;
}

interface UserData {
  username: string;
  name: string;
  provider: string;
  email: string;
  avatar: string;
  role: string;
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
