import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MenuModel, MenuPayloadModel } from "../../Models/RestaurantModel";
import menuService from "./menuService";

interface MenuState {
  menus: MenuModel[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: MenuState = {
  menus: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getMenuItems = createAsyncThunk("menu/getItems", async (id: string, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const menus = await menuService.getMenuItems(id, token)
    return menus;
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createMenuItem = createAsyncThunk(
  "menu/create",
  async (menuData: MenuPayloadModel, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const id = menuData.restaurant
      return await menuService.createMenuItem(menuData, id, token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  "menu/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await menuService.deleteMenuItem(id, token);
    } catch (error: any) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMenuItem = createAsyncThunk("menu/update", async (menuData: MenuModel, thunkAPI: any) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await menuService.updateMenuItem(menuData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenuItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMenuItems.fulfilled, (state, action: PayloadAction<MenuModel[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.menus = action.payload;
      })
      .addCase(getMenuItems.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createMenuItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMenuItem.fulfilled, (state, action: PayloadAction<MenuModel>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.menus.push(action.payload);
      })
      .addCase(createMenuItem.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteMenuItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.menus = state.menus.filter((menu) => menu.id !== action.payload);
      })
      .addCase(deleteMenuItem.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateMenuItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMenuItem.fulfilled, (state, action: PayloadAction<MenuModel>) => {
        state.isLoading = false;
        state.isSuccess = true;
        const idx = state.menus.findIndex((menu) => menu.id === action.payload.id)
        state.menus[idx] = action.payload;
      })
      .addCase(updateMenuItem.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = menuSlice.actions;
export default menuSlice.reducer;