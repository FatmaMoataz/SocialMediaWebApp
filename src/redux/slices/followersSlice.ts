import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Followers {

  id: number;

}

interface FollowersState {
  followers: Followers[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowersState = {
  followers: [],
  loading: false,
  error: null,
};

export const fetchUserFollowers = createAsyncThunk(
  'posts/fetchUserFollowers',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get-user-followers?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data: Followers[] = await response.json();
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
      .addCase(fetchUserFollowers.fulfilled, (state, action: PayloadAction<Followers[]>) => {
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