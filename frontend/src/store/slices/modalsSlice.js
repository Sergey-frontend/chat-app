/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: null,
  type: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.channelId = action.payload.channelId;
      state.type = action.payload.type;
    },
    hideModal: (state) => {
      state.channelId = null;
      state.type = null;
    },
  },
});

export default modalsSlice.reducer;
export const { showModal, hideModal } = modalsSlice.actions;
