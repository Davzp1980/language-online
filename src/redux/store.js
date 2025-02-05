import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { teachersReducer } from './teachers/slice';
import { authReducer } from './auth/slice';

const authPersistConfig = {
  key: 'favorite',
  storage,
  whitelist: ['favorite'],
};

export const store = configureStore({
  reducer: {
    teachers: persistReducer(authPersistConfig, teachersReducer),
    // filters: persistReducer(authPersistConfig, filterReducer),
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
