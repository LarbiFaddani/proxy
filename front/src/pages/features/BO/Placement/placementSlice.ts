import { createSlice } from '@reduxjs/toolkit'
import { getPlacement } from './placementApi'


    export const placementSlice = createSlice({
        name: "placement",
        initialState: {
            isLoading: false,
            values : []
        },
        reducers: {
            //vide
        },
        extraReducers: {
            [getPlacement.pending.type]: (state, action) => {
                state.isLoading = true
            },
            [getPlacement.fulfilled.type]: (state, { payload }) => {
                state.values = payload
                state.isLoading = false
            },
            [getPlacement.rejected.type]: (state, action) => {
                state.isLoading = false
            },
        }
    })
//export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default placementSlice.reducer