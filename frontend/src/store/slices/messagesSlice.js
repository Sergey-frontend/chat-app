/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const { id } = action.payload;
        const restMessages = state.messages.filter((message) => message.channelId !== id);
        state.messages = restMessages;
      });
  },
});

export default messagesSlice.reducer;
export const { setMessages, addMessage } = messagesSlice.actions;
