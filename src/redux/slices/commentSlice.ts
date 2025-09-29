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

const fetchUserData = async (userId: number): Promise<{ name: string; email: string }> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/get-user_data?user_id=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    const userData = await response.json();
    return userData[0] || { name: `User ${userId}`, email: '' };
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { name: `User ${userId}`, email: '' };
  }
};

export const fetchPostComments = createAsyncThunk(
  'comments/fetchPostComments',
  async (postId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/get-post-comments?post_id=${postId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }
      const comments: Comment[] = await response.json();

      const uniqueUserIds = [...new Set(comments.map(comment => comment.user_id))];
      const userPromises = uniqueUserIds.map(userId => fetchUserData(userId));
      const userResponses = await Promise.all(userPromises);
      
      const userMap: { [key: number]: string } = {};
      uniqueUserIds.forEach((userId, index) => {
        userMap[userId] = userResponses[index].name;
      });

      const commentsWithUsernames = comments.map(comment => ({
        ...comment,
        username: userMap[comment.user_id] || `User ${comment.user_id}`
      }));

      return commentsWithUsernames;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async ({ postId, content, userId }: { postId: number; content: string; userId: number }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/create-comment?post_id=${postId}&user_id=${userId}&content=${encodeURIComponent(content)}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to add comment');
      }
      
      const data = await response.json();
      
      dispatch(fetchPostComments(postId));
      
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
   
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.loading = false;
   
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;