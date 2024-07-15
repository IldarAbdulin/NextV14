import { configureStore } from '@reduxjs/toolkit';
import { userSlice, usersSlice } from './slices/users-slice/users-slice';
import { todosSlice } from './slices/todos-slice/todos-slice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    user: userSlice.reducer,
    todos: todosSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
