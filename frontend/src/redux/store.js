import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.js';
import localStorageMiddleware from './middleware/localStorageMiddleware';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;