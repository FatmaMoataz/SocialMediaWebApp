import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import userReducer from "./slices/userSlice";
import postsReducer from './slices/postsSlice'
import followersReducer from './slices/followersSlice'
import followingReducer from './slices/followingSlice'
import followReducer from './slices/followSlice'
import notificationsReducer from "./slices/notificationSlice";

export const store = configureStore ({
    reducer:{
        auth: authReducer,
        user: userReducer,
        posts: postsReducer,
        follow: followReducer,
        followers: followersReducer,
        following: followingReducer,
        notifications: notificationsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch