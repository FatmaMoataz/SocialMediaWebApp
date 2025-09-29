import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Comment {
  id: number;
  post_id: number;
  user_id: number;
  username: string;
  text: string;
  created_at: string;
  likes_count: number;
}

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get-post-comments?post_id=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const data: Comment[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, text, userId }: { postId: number; text: string; userId: number }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/create-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post_id: postId,
          user_id: userId,
          text: text,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchPostComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchPostComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;