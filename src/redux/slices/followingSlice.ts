import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Following {
  id: number;
}

interface FollowingState {
  following: Following[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowingState = {
  following: [],
  loading: false,
  error: null,
};

export const fetchUserFollowing = createAsyncThunk(
  'following/fetchUserFollowing',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get-followings?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data: Following[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const followingSlice = createSlice({
  name: 'following',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFollowing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFollowing.fulfilled, (state, action: PayloadAction<Following[]>) => {
        state.loading = false;
        state.following = action.payload;
      })
      .addCase(fetchUserFollowing.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followingSlice.reducer;