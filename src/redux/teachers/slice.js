import { createSlice } from '@reduxjs/toolkit';
import { fetchTeachers } from './operations';

const teachersSlice = createSlice({
  name: 'teachers',
  initialState: {
    items: [],
    favorite: [],
    modalBookData: {},

    isLoginModalOpen: false,
    isRegisterModalOpen: false,
    isBookModalOpen: false,
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTeachers.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchTeachers.rejected, state => {
        console.log('rejected');
        state.error = true;
      });
  },
  reducers: {
    setLoginModalOpen(state, action) {
      state.isLoginModalOpen = action.payload;
    },
    setRegisterModalOpen(state, action) {
      state.isRegisterModalOpen = action.payload;
    },
    setBookModalOpen(state, action) {
      state.isBookModalOpen = action.payload;
    },

    setLoggedInlOpen(state, action) {
      state.isLoginedIn = action.payload;
    },

    addToFavorite(state, action) {
      state.favorite.push(action.payload);
    },
    deleteFromFavorite(state, action) {
      state.favorite = state.favorite.filter(
        teacher => teacher.avatar_url != action.payload
      );
    },
    addModalData(state, action) {
      state.modalBookData = action.payload;
    },
  },
});

export const {
  setLoginModalOpen,
  setRegisterModalOpen,
  setBookModalOpen,
  addToFavorite,
  deleteFromFavorite,
  addModalData,
} = teachersSlice.actions;

export const teachersReducer = teachersSlice.reducer;
