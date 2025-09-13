import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Post {

  id: number;

}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchUserPosts = createAsyncThunk(
  'posts/fetchUserPosts',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get-user-posts?user_id=${userId}`);
      if (!response.ok) {
        throw new Error('Server error');
      }
      const data: Post[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;