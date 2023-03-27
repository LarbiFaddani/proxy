import { createSlice } from '@reduxjs/toolkit'
import { addSchedule } from './scheduleApi'


    export const scheduleSlice = createSlice({
        name: "schedule",
        initialState: {
            isLoading: false,
            values : [],
            isSubmit : false,
            isRejected: false
        },
        reducers: {
            //vide
        },
        extraReducers: {
            [addSchedule.pending.type]: (state, action) => {
                state.isLoading = true
                state.isSubmit = false
            },
            [addSchedule.fulfilled.type]: (state, { payload }) => {
                state.isLoading=false
                state.isSubmit = true
                state.isRejected = false
            },
            [addSchedule.rejected.type]: (state, action) => {
                state.isLoading = false
                state.isRejected = true
                state.isSubmit = false
            },
        }
    })
//export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default scheduleSlice.reducer