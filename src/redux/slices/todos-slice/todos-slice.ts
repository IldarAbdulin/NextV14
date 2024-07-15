import { ITodos } from '@/interface/todos-interface';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodos = createAsyncThunk('getTodos', async function () {
  const res = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=20'
  );
  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }
  const json = await res.json();
  return json;
});

interface IInitialState {
  loading: boolean;
  error: null | string;
  todos: ITodos[];
}

const initialState: IInitialState = {
  todos: [],
  error: null,
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getTodos.rejected, (state) => {
      state.error = `Fetch error`;
      state.loading = false;
    });
  },
});
