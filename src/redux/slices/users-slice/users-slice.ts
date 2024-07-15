import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../interface/user-interface';

export const getUsers = createAsyncThunk<IUser[], any, { rejectValue: string }>(
  'getUsers',
  async function (value, _) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users${
        value !== '' ? `?username=${value}` : ''
      }`
    );
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();

    return json;
  }
);

export const getUser = createAsyncThunk<IUser, any, { rejectValue: string }>(
  'getUsers',
  async function (id, _) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const json = await res.json();

    return json;
  }
);

interface IInitialState {
  users: IUser[];
  user: IUser;
  loading: boolean;
  error: null | string;
}

const initialState: IInitialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = null;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.error = `Error fetch`;
      state.loading = false;
    });
  },
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.error = `Error fetch`;
      state.loading = false;
    });
  },
});
