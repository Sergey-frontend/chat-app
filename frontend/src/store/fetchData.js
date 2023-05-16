import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../utils/routes';

const fetchData = createAsyncThunk(
  'channels/fetchData',
  async (authHeaders, { rejectWithValue }) => {
    try {
      const response = axios.get(routes.dataPath(), authHeaders);
      const { data } = response;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default fetchData;
