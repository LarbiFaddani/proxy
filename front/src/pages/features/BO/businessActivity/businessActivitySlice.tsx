import { createSlice } from '@reduxjs/toolkit'
import { getBusinessActivity
    //,addBusinessActivity, deleteBusinessActivity,  updateBusinessActivity 
    } from "./businessActivityApi";
    export const businessActivitySlice = createSlice({
        name:"businessActivity",
        initialState:{
            isLoading:false,
            values:[]
        },
        reducers :{
            //vide
        },
        extraReducers: {
            [getBusinessActivity.pending.type]: (state, action) => {
                state.isLoading = true
            },
            [getBusinessActivity.fulfilled.type]: (state, { payload }) => {
                state.values = payload
                state.isLoading = false
            },
            [getBusinessActivity.rejected.type]: (state, action) => {
                state.isLoading = false
            },

          
        }





        

    })
export default businessActivitySlice.reducer