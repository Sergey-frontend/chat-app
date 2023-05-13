/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  channels: [],
  currentChannelId: DEFAULT_CHANNEL_ID,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
  },
});

export default channelsSlice.reducer;
export const { setCurrentChannelId, setChannels, addChannel } = channelsSlice.actions;
