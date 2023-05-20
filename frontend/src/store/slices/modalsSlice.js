/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelId: null,
  modalType: null,
};

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.channelId = action.payload.channelId;
      state.modalType = action.payload.modalType;
    },
    hideModal: (state) => {
      state.channelId = null;
      state.modalType = null;
    },
  },
});

export default modalsSlice.reducer;
export const { showModal, hideModal } = modalsSlice.actions;
