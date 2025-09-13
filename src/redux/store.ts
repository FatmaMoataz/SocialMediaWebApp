import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import userReducer from "./slices/userSlice";
import postsReducer from './slices/postsSlice'
import followersReducer from './slices/followersSlice'
import followingReducer from './slices/followingSlice'

export const store = configureStore ({
    reducer:{
        auth: authReducer,
        user: userReducer,
        posts: postsReducer,
        followers: followersReducer,
        following: followingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch