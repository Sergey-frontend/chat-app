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

export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
