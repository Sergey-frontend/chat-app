import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './slices/channelsSlice';
import messagesSlice from './slices/messagesSlice';
import modalsSlice from './slices/modalsSlice';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    modal: modalsSlice,
  },
});

export default store;
