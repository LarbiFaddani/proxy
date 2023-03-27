import  { parameters ,initialState } from 'src/models/parameters';
import { getParameters, updateParameters } from './parametersApi';
import { createSlice } from '@reduxjs/toolkit';


export const parametersSlice = createSlice({
  name: 'parameters',
  initialState: {
    isLoading: false,
    values: [],
  },
  reducers: {},
  extraReducers: {
    [getParameters.pending.type]: (state, action) => {
      state.isLoading = true;
    },
    [getParameters.fulfilled.type]: (state, { payload }) => {
      state.values = payload;
      state.isLoading = false;
    },
    [getParameters.rejected.type]: (state, action) => {
      state.isLoading = false;
    },
    [updateParameters.fulfilled.type]: (state: { values: parameters[] }= initialState, { payload }: { payload: parameters }) => {
      const index = state.values.findIndex((param) => param.id === payload.id);
      if (index !== -1) {
        state.values[index] = payload;
      }
    },
    },
  },
);

export default parametersSlice.reducer;
