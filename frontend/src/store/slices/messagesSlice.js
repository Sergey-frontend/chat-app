import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export default messagesSlice.reducer;
export const { addMessages } = messagesSlice.actions;
