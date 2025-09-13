import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Follower {
  follower_id: number;
}

interface FollowersState {
  followers: Follower[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowersState = {
  followers: [],
  loading: false,
  error: null,
};

export const fetchUserFollowers = createAsyncThunk(
  'followers/fetchUserFollowers',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get-followers?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data: Follower[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const followersSlice = createSlice({
  name: 'followers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFollowers.fulfilled, (state, action: PayloadAction<Follower[]>) => {
        state.loading = false;
        state.followers = action.payload;
      })
      .addCase(fetchUserFollowers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default followersSlice.reducer;