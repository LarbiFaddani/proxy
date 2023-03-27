import { createSlice } from '@reduxjs/toolkit'
import { getBusiness
    //,addBusiness, deleteBusiness,  updateBusiness 
    } from "./businessApi";

    export const businessSlice = createSlice({
        name: "business",
        initialState: {
            isLoading: false,
            values : []
        },
        reducers: {
            //vide
        },
        extraReducers: {
            [getBusiness.pending.type]: (state, action) => {
                state.isLoading = true
            },
            [getBusiness.fulfilled.type]: (state, { payload }) => {
                state.values = payload
                state.isLoading = false
            },
            [getBusiness.rejected.type]: (state, action) => {
                state.isLoading = false
            },
        }
    })
    
//export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default businessSlice.reducer