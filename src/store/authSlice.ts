import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface User {
  id: string;
  username: string;
  isAdmin: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;