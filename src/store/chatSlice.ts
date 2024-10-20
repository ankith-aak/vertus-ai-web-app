import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

interface ChatSession {
  id: string;
  messages: ChatMessage[];
}

interface ChatState {
  sessions: ChatSession[];
  currentSessionId: string | null;
}

const initialState: ChatState = {
  sessions: [],
  currentSessionId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createSession: (state) => {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        messages: [],
      };
      state.sessions.push(newSession);
      state.currentSessionId = newSession.id;
    },
    setCurrentSession: (state, action: PayloadAction<string>) => {
      state.currentSessionId = action.payload;
    },
    addMessage: (state, action: PayloadAction<ChatMessage>) => {
      const currentSession = state.sessions.find(s => s.id === state.currentSessionId);
      if (currentSession) {
        currentSession.messages.push(action.payload);
      }
    },
  },
});

export const { createSession, setCurrentSession, addMessage } = chatSlice.actions;
export default chatSlice.reducer;