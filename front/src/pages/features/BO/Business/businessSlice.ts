import { createSlice } from '@reduxjs/toolkit'
import { getBusiness
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
export default businessSlice.reducer
