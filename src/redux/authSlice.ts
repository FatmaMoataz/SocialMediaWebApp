import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { LoginForm } from "../validation/loginSchema"
import type { SignupForm } from "../validation/signupSchema"

type AuthResponse = {
    token: string,
    user: {email: string}
}

type AuthState = {
    loading:boolean,
    user:null | {email:string},
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
    "auth/login", async(data: LoginForm, {rejectWithValue}) => {
try {
    const res = await fetch(`http://localhost:8000/sign-in?email=${encodeURIComponent(
          data.email
        )}&password=${encodeURIComponent(data.password)}`,{
            method:"GET",
            headers:{accept:"application/json"}
        })
        if(!res.ok) {

            return rejectWithValue("Invalid credentials");
        }

        const result:AuthResponse = await res.json()
        localStorage.setItem("token", result.token)
        return result
} catch (error: any) {
    return rejectWithValue(error.message || "Something went wrong");
}
    }
)

export const signup = createAsyncThunk(
    "auth/signup", async(data: SignupForm, {rejectWithValue}) => {
try {
    const res = await fetch(`http://localhost:8000/sign-up`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                accept:"application/json"},
            body: JSON.stringify(data),
        })
        
        if(!res.ok) {

            return rejectWithValue("Invalid credentials");
        }

        const result:AuthResponse = await res.json()
        localStorage.setItem("token", result.token)
        return result
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
        },
        loadToken: (state) => {
const token = localStorage.getItem("token")
if(token) {
    state.token = token
}
        }
    },
    extraReducers: (builder) => {
builder
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
    state.error = action.error.message || "Login failed";
})
    }
})

export const {logout, loadToken} = authSlice.actions
export default authSlice.reducer