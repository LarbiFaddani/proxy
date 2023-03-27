import { createSlice } from '@reduxjs/toolkit'
import { getBusinessType
    //,addBusinessType, deleteBusinessType,  updateBusinessType 
    } from "./businessTypeApi";
    export const businessTypeSlice = createSlice({
        name:"businessType",
        initialState:{
            isLoading:false,
            values:[]
        },
        reducers :{
            //vide
        },
        extraReducers: {
            [getBusinessType.pending.type]: (state, action) => {
                state.isLoading = true
            },
            [getBusinessType.fulfilled.type]: (state, { payload }) => {
                state.values = payload
                state.isLoading = false
            },
            [getBusinessType.rejected.type]: (state, action) => {
                state.isLoading = false
            },
        }

    })
export default businessTypeSlice.reducer