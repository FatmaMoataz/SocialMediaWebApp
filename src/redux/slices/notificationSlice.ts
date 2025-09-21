import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eduAPI from "../../api/eduAPI";
import axios from "axios";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await eduAPI.get(`/get-notifications?user_id=${userId}`);
      return response.data;
    } catch (err: any) {
      const msg = err.response?.data?.detail;

      if (msg && msg.includes("no notification")) {
        return [];
      }

      return rejectWithValue(msg || "Failed to fetch notifications");
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (notificationId: number, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/mark-notification-as-read?notification_id=${notificationId}`
      );
      return res.data; // { id: 1 }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    data: [] as any[],
    loading: false,
    error: null as string | null,
  },
   reducers: {
    markAllAsRead(state) {
      state.data = state.data.map((n) => ({ ...n, read: true }));
    },
  },
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // mark as read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const id = action.payload.id; 
        state.data = state.data.map((n) =>
          n.id === id ? { ...n, read: true } : n
        );
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { markAllAsRead } = notificationsSlice.actions;
export default notificationsSlice.reducer;
