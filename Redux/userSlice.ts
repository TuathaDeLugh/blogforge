// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store'; // Assuming you have a store with AppThunk type

interface UserState {
  data: UserData | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
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
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setUser, setError } = userSlice.actions;
export default userSlice.reducer;
