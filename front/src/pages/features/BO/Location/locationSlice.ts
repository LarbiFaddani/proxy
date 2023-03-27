import { createSlice } from '@reduxjs/toolkit'
import { getLocation
    //,addBusiness, deleteBusiness,  updateBusiness 
    } from "./locationApi";

    export const locationSlice = createSlice({
        name: "location",
        initialState: {
            isLoading: false,
            values : []
        },
        reducers: {
            //vide
        },
        extraReducers: {
            [getLocation.pending.type]: (state, action) => {
                state.isLoading = true
            },
            [getLocation.fulfilled.type]: (state, { payload }) => {
                state.values = payload
                state.isLoading = false
            },
            [getLocation.rejected.type]: (state, action) => {
                state.isLoading = false
            },
        }
    })
//export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default locationSlice.reducer