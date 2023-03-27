import {createSlice} from '@reduxjs/toolkit'
import {getCampaign} from "./campaignApi";

export const campaignSlice = createSlice({
    name:"campaign",
    initialState:{
        isLoading:false,
        values:[]
    },
    reducers:{

    },
    extraReducers: {
        [getCampaign.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [getCampaign.fulfilled.type]: (state, { payload }) => {
            state.values = payload
            state.isLoading = false
        },
        [getCampaign.rejected.type]: (state, action) => {
            state.isLoading = false
        },
    }

})
export default campaignSlice.reducer