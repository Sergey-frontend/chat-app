import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './slices/channelsSlice';
import messagesSlice from './slices/messagesSlice';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
  },
});

export default store;
