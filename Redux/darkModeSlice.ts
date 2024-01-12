import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DarkModeState {
  mode: 'dark' | 'light' | 'system' | null;
}

const initialState: DarkModeState = {
  mode: null,
};

export const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    setDarkMode: (state, action: PayloadAction<'dark' | 'light' | 'system'>) => {
      state.mode = action.payload;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export const selectDarkMode = (state: { darkMode: DarkModeState }) => state.darkMode.mode;

export default darkModeSlice.reducer;