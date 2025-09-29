import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import eduAPI from "../../api/eduAPI";

export const createComment = createAsyncThunk(
  "interactions/createComment",
  async ({ user_id, post_id, content }: { user_id: number; post_id: number; content: string }) => {
    const res = await axios.post(`${eduAPI}/create-comment`, null, {
      params: { user_id, post_id, content },
    });
    return { post_id, comment: res.data };
  }
);

export const likePost = createAsyncThunk(
  "interactions/likePost",
  async ({ user_id, post_id }: { user_id: number; post_id: number }) => {
    const res = await axios.post(`${eduAPI}/like-post`, null, {
      params: { user_id, post_id },
    });
    return { post_id, user_id };
  }
);

export const unlikePost = createAsyncThunk(
  "interactions/unlikePost",
  async ({ user_id, post_id }: { user_id: number; post_id: number }) => {
    const res = await axios.delete(`${eduAPI}/delete-post-like`, {
      params: { user_id, post_id },
    });
    return { post_id, user_id };
  }
);

const interactionSlice = createSlice({
  name: "interactions",
  initialState: {
    comments: {} as Record<number, any[]>, 
    likes: {} as Record<number, number>,
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createComment.fulfilled, (state, action) => {
        const { post_id, comment } = action.payload;
        if (!state.comments[post_id]) state.comments[post_id] = [];
        state.comments[post_id].push(comment);
      })


      .addCase(likePost.fulfilled, (state, action) => {
        const { post_id } = action.payload;
        if (!state.likes[post_id]) state.likes[post_id] = 0;
        state.likes[post_id] += 1;
      })

     
      .addCase(unlikePost.fulfilled, (state, action) => {
        const { post_id } = action.payload;
        if (state.likes[post_id]) state.likes[post_id] -= 1;
      });
  },
});

export default interactionSlice.reducer;
