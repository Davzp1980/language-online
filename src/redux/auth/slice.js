import { createSlice } from '@reduxjs/toolkit';
import { logout, signInUser, signUpUser } from './operations';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    favorite: [],
    isLoggedIn: false,
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isBookModalOpen: false,
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(signUpUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, state => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(signInUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signInUser.rejected, state => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(logout.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.isLoggedIn = false;
        state.error = null;
        state.isLoading = false;
        state.user = {};
      });
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setUser } = authSlice.actions;
