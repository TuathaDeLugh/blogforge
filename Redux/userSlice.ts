// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: UserData | null;
}

interface UserData {
  _id:string|null;
  username: string | null;
  name: string | null;
  provider: string | null;
  email: string | null;
  avatar: string | null;
  isAdmin: Boolean | null;
} 

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData|null>) => {
      state.data = action.payload;
    }
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
