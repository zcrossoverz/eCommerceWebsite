import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import userReducer from './slices/user.slice';
import cartReducer from './slices/cart.slice';
import navigationReducer from './slices/navigation.slice';
import modalReducer from './slices/modal.slice';
import productReducer from './slices/product.slice';
// ...

export const store = configureStore({
  reducer: {
    userReducer,
    cartReducer,
    navigationReducer,
    modalReducer,
    productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
