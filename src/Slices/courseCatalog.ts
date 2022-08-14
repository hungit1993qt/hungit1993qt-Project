import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DanhMucKhoaHoc } from "../Interface/courseCatalog";
import courseAPI from "../Services/courseAPI";

interface State {
  danhMucKhoaHoc: DanhMucKhoaHoc[];
  isLoading: boolean;
  error: string | null;
}

const initialState: State = {
  danhMucKhoaHoc: [],
  isLoading: false,
  error: null,
};

// thunk actions
export const getDanhMucKhoaHoc = createAsyncThunk(
  "course/getDanhMucKhoaHoc",
  async () => {
    try {
      const data: DanhMucKhoaHoc[] = await courseAPI.getDanhMucKhoaHoc();
      return data;
    } catch (error) {
      throw error;
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDanhMucKhoaHoc.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDanhMucKhoaHoc.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.danhMucKhoaHoc = payload;
    });
    builder.addCase(getDanhMucKhoaHoc.rejected, (state, { error }) => {
      state.isLoading = false;
      state.error = error as any;
    });
  },
});

// export actions

// export reducer
export default courseSlice.reducer;
