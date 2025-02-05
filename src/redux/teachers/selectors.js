export const selectAllTeachers = state => state.teachers.items;

export const selectIsLoginModalOpen = state => state.teachers.isLoginModalOpen;

export const selectIsRegisterModalOpen = state =>
  state.teachers.isRegisterModalOpen;

export const selectIsBookModalOpen = state => state.teachers.isBookModalOpen;

export const selectFavorites = state => state.teachers.favorite;

export const selectModalBookData = state => state.teachers.modalBookData;
