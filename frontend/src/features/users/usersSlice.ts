import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../Models/UserModel";
import usersService from "./usersService";

interface UsersState {
  users: UserModel[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}


const initialState: UsersState = {
  users: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUsers = createAsyncThunk("users/getAll", async (_, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await usersService.getUsers(token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteUser = createAsyncThunk("users/delete", async (id: string, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const response = await usersService.deleteUser(id, token);
    console.log(response);
    return response;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action: PayloadAction<UserModel[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.users = [];
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = usersSlice.actions;
export default usersSlice.reducer;
