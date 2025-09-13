import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { LoginForm } from "../../validation/loginSchema"
import type { SignupForm } from "../../validation/signupSchema"

type AuthResponse = {
    token: string,
    user: {email: string, id: number}
}

type AuthState = {
    loading:boolean,
    user:null | {email:string, id:number},
    error:string | null,
    token: string | null
}

const initialState: AuthState = {
    loading:false,
    user:null,
    error:null,
    token:null
}

export const login = createAsyncThunk(
  "auth/login",
  async (data: LoginForm, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8000/sign-in?email=${encodeURIComponent(data.email)}&password=${encodeURIComponent(data.password)}`,
        {
          method: "GET",
          headers: { accept: "application/json" },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        return rejectWithValue(errorData.detail || "Invalid credentials");
      }

      const userId = await res.json();

      const payload = {
        token: `user_token_${userId}`,
        user: { email: data.email, id: userId },
      };

      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", userId.toString()); 
      localStorage.setItem("userEmail", data.email); 

      return payload;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const signup = createAsyncThunk(
    "auth/signup", async(data: SignupForm, {rejectWithValue}) => {
        try {
            const res = await fetch(`http://localhost:8000/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"
                },
                body: JSON.stringify(data)
            })
            
            if(!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData.detail || "Signup failed");
            }

            const result = await res.json();
            localStorage.setItem("token", result.token);
            localStorage.setItem("userId", result.user.id.toString()); 
            localStorage.setItem("userEmail", result.user.email); 
            
            return result;
        } catch (error: any) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout: (state) => {
            state.user = null
            state.token = null
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
            localStorage.removeItem("userEmail")
        },
        loadToken: (state) => {
            const token = localStorage.getItem("token")
            const userId = localStorage.getItem("userId") 
            const userEmail = localStorage.getItem("userEmail") 
            
            if (token && userId) {
                state.token = token
                state.user = { 
                    id: parseInt(userId), 
                    email: userEmail || "" 
                }
            }
        },
        clearError: (state) => {
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Login cases
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string || "Login failed"
            })
            // Signup cases 
            .addCase(signup.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.token = action.payload.token
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string || "Signup failed"
            })
    }
})

export const {logout, loadToken, clearError} = authSlice.actions
export default authSlice.reducer