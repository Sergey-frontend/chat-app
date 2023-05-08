import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, action) => {
      state.channels.push(action.payload);
    },
  },
});

export const { addChannels } = channelsSlice.actions;
export default channelsSlice.reducer;
