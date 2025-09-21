import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store";

interface FollowState {
  isProcessing: boolean;
  error: string | null;
}

const initialState: FollowState = {
  isProcessing: false,
  error: null,
};

// Follow user
export const followUser = createAsyncThunk(
  "follow/followUser",
  async ({ senderId, receiverId }: { senderId: number; receiverId: number }) => {
    const res = await axios.post(
      `http://127.0.0.1:8000/follow?sender_id=${senderId}&receiver_id=${receiverId}`
    );
    return { ...res.data, receiverId };
  }
);

// Unfollow user
export const unfollowUser = createAsyncThunk(
  "follow/unfollowUser",
  async ({ senderId, receiverId }: { senderId: number; receiverId: number }) => {
    const res = await axios.post(
      `http://127.0.0.1:8000/unfollow?sender_id=${senderId}&receiver_id=${receiverId}`
    );
    return { ...res.data, receiverId };
  }
);

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(followUser.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.isProcessing = false;

        const rootState = (state as any) as RootState;
        rootState.following.following.push({
          following_id: action.payload.receiverId,
        });
      })
      .addCase(followUser.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.error.message || "Follow failed";
      })
      .addCase(unfollowUser.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.isProcessing = false;

        const rootState = (state as any) as RootState;
        rootState.following.following = rootState.following.following.filter(
          (f) => f.following_id !== action.payload.receiverId
        );
      })
      .addCase(unfollowUser.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.error.message || "Unfollow failed";
      });
  },
});

export default followSlice.reducer;
