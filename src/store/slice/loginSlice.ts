import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAuth } from '../../service/loginService';

import { RootState } from '../store';
import type { User } from '../../types/API';

export const authenticateUser = createAsyncThunk(
  'authentication/authenticateUser',
  async (credentials: { username: string; password: string }) => {
    const response = await userAuth(credentials);

    return response;
  }
);

interface AuthenticationState {
  user: User;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: AuthenticationState = {
  user: {} as User,
  loading: 'idle',
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state) => {
      state.loading = 'pending';
    });
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.user = action.payload;
    });
    builder.addCase(authenticateUser.rejected, (state) => {
      state.loading = 'failed';
    });
  },
});

export const selectUser = (state: RootState) => state.authentication;
export default authenticationSlice.reducer;
