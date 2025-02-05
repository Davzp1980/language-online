import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutUser, signIn, signUp } from '../../firebaseConfig';

export const signUpUser = createAsyncThunk(
  'auth/signUp',
  async ({ email, password, displayName }, thunkAPI) => {
    try {
      const user = await signUp(email, password, displayName);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await signIn(email, password);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const user = await logoutUser();

    return user;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
