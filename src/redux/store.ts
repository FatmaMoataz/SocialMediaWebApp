import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import userReducer from "./slices/userSlice";
import postsReducer from './slices/postsSlice'
import followersReducer from './slices/followersSlice'
import followingReducer from './slices/followingSlice'
import followReducer from './slices/followSlice'
import notificationsReducer from "./slices/notificationSlice";
import chatReducer from "./slices/chatSlice";
import timelineReducer from "./slices/timelineSlice";
import interactionReducer from "./slices/interactionSlice";

export const store = configureStore ({
    reducer:{
        auth: authReducer,
        user: userReducer,
        posts: postsReducer,
        follow: followReducer,
        followers: followersReducer,
        following: followingReducer,
        notifications: notificationsReducer,
        chat: chatReducer,
        timeline: timelineReducer,
        interactions: interactionReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch