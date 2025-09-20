import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import eduAPI from "../../api/eduAPI";
import axios from "axios";

const savedUserId = localStorage.getItem("userId");
const savedUserName = localStorage.getItem("userName");
const savedUserEmail = localStorage.getItem("userEmail");

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await eduAPI.get(`/get-user_data?user_id=${userId}`);
      const user = response.data[0];

      localStorage.setItem("userId", user.id.toString()); 
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);

      return user;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Failed to fetch user data"
      );
    }
  }
);

// const userSlice = createSlice({
//   name: "user",
//   initialState: {
//     data: savedUserId
//       ? {
//           id: Number(savedUserId),
//           name: savedUserName || "",
//           email: savedUserEmail || "",
//         }
//       : null,
//     loading: false,
//     error: null,
//   } as {
//     data: null | { id: number; name: string; email: string };
//     loading: boolean;
//     error: string | null;
//   },
//   reducers: {
//     logout: (state) => {
//       state.data = null;
//       localStorage.removeItem("userId");
//       localStorage.removeItem("userName");
//       localStorage.removeItem("userEmail");
//       localStorage.removeItem("user_token_2");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(getUserData.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(getUserData.fulfilled, (state, action) => {
//         state.loading = false;
//         state.data = action.payload;
//       })
//       .addCase(getUserData.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: savedUserId
      ? {
          id: Number(savedUserId),
          name: savedUserName || "",
          email: savedUserEmail || "",
        }
      : null,
    loading: false,
    error: null,
  } as {
    data: null | { id: number; name: string; email: string };
    loading: boolean;
    error: string | null;
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("user_token_2");
    },
    updateUser: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };

        // حفظ التغييرات في localStorage
        localStorage.setItem("userName", action.payload.name);
        localStorage.setItem("userEmail", action.payload.email);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateUser } = userSlice.actions;
export default userSlice.reducer;


// export const { logout } = userSlice.actions;
// export default userSlice.reducer;
