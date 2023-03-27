import { createSlice} from "@reduxjs/toolkit";
import {getAdvertiser} from "./advertiserApi";



export const SliceAdvertiser =createSlice({
 name:"advertiser",
 initialState:{
    isLoading: false,
            values : []
},
reducers:{

},
extraReducers:{
    [getAdvertiser.pending.type]:(state,action)=>{
        state.isLoading = true
    },
 
    [getAdvertiser.fulfilled.type]:(state,{payload})=>{
        state.values = payload
        state.isLoading = false
    },
    [getAdvertiser.rejected.type]:(state,action)=>{
        state.isLoading=false
    },
}

})

export default SliceAdvertiser.reducer







































































/*import { createSlice } from '@reduxjs/toolkit'
import { getAdvertiser
    //,addBusinessActivity, deleteBusinessActivity,  updateBusinessActivity 
    } from "./advertiserApi";
    export const businessAdvertiserSlice = createSlice({
        name:"advertiser",
        initialState:{
            isLoading:false,
            values:[]
        },
        reducers :{
            //vide
        },
        extraReducers: {
            [getAdvertiser.pending.type]: (state, action) => {
                state.isLoading = true
            },
            [getAdvertiser.fulfilled.type]: (state, { payload }) => {
                state.values = payload
                state.isLoading = false
            },
            [getAdvertiser.rejected.type]: (state, action) => {
                state.isLoading = false
            },

          
        }

    })
export default businessAdvertiserSlice.reducer*/