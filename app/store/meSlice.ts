import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MeService } from "../services/MeService";

export const fetchMe = createAsyncThunk(
  "me/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const user = await MeService.getMe();
      return user;
    } catch (err: any) {
      return rejectWithValue("Erro ao buscar usuário");
    }
  }
);

interface MeState {
  data: {
    userUid: string;
    name: string;
    photoUrl: string;
    email: string;
  } | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: false;
  user: null;
}

const initialState: MeState = {
  data: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

const meSlice = createSlice({
  name: "me",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default meSlice.reducer;
