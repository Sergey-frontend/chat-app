import { createSlice } from '@reduxjs/toolkit';

const initialValues = {
  channels: [],
  currentChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialValues,
  reducers: {
    addChannels: (state, action) => {
      state.channels.push(action.payload);
    },
  },
});

export default channelsSlice.reducer;
export const { addChannels } = channelsSlice.actions;
