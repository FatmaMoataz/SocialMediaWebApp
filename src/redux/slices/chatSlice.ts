import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'bot';
  timestamp?: string;
}

export interface ChatState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

export interface SendMessagePayload {
  user_id: string;
  content: string;
}

export interface DeleteMessagePayload {
  user_id: string;
  message_id: number;
}

//In LocalStorage
const MESSAGES_KEY = "chat_messages";

const saveMessagesToLocalStorage = (messages: Message[]) => {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
};

const loadMessagesFromLocalStorage = (): Message[] => {
  const data = localStorage.getItem(MESSAGES_KEY);
  return data ? JSON.parse(data) : [];
};

const initialState: ChatState = {
  messages: loadMessagesFromLocalStorage(),
  loading: false,
  error: null,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ user_id, content }: SendMessagePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/send-prompt?user_id=${user_id}&content=${encodeURIComponent(content)}`
      );

      return { 
        sentMessage: { 
          id: Date.now(), 
          text: content, 
          sender: 'me' as const,
          timestamp: new Date().toISOString()
        },
        botMessage: { 
          id: Date.now() + 1, 
          text: response.data.response, 
          sender: 'bot' as const,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error sending message');
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async ({ user_id, message_id }: DeleteMessagePayload, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/delete-message?user_id=${user_id}&message_id=${message_id}`
      );
      return message_id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Error deleting message');
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessageLocal: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
      saveMessagesToLocalStorage(state.messages);
    },
    clearError: (state) => {
      state.error = null;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
      saveMessagesToLocalStorage(state.messages);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload.sentMessage);
        state.messages.push(action.payload.botMessage);
        saveMessagesToLocalStorage(state.messages);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(msg => msg.id !== action.payload);
        saveMessagesToLocalStorage(state.messages);
      });
  },
});

export const { addMessageLocal, clearError, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
