import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface TimelinePost {
  id: number;
  user_id: number;
  username: string;
  avatar_url?: string;
  text: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
}

interface TimelineState {
  posts: TimelinePost[];
  loading: boolean;
  error: string | null;
}

const initialState: TimelineState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchTimelinePosts = createAsyncThunk(
  'timeline/fetchTimelinePosts',
  async (_, { rejectWithValue }) => {
    try {
      const postsResponse = await fetch('http://127.0.0.1:8000/get-all-posts');
      if (!postsResponse.ok) {
        throw new Error('Failed to fetch posts');
      }
      const posts: TimelinePost[] = await postsResponse.json();

      const uniqueUserIds = [...new Set(posts.map(post => post.user_id))];
      
      const userPromises = uniqueUserIds.map(userId => 
        fetch(`http://127.0.0.1:8000/get-user_data?user_id=${userId}`)
          .then(response => {
            if (!response.ok) throw new Error('Failed to fetch user data');
            return response.json();
          })
      );
      
      const userResponses = await Promise.all(userPromises);
      const userMap: { [key: number]: { name: string; email: string } } = {};
      
      userResponses.forEach((userData, index) => {
        if (userData && userData[0]) {
          const user = userData[0];
          userMap[uniqueUserIds[index]] = {
            name: user.name,
            email: user.email
          };
        }
      });

      const postsWithUsernames = posts.map(post => ({
        ...post,
        username: userMap[post.user_id]?.name || `User ${post.user_id}`,
        avatar_url: `https://i.pravatar.cc/150?u=${post.user_id}`
      }));

      return postsWithUsernames;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimelinePosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimelinePosts.fulfilled, (state, action: PayloadAction<TimelinePost[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchTimelinePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default timelineSlice.reducer;