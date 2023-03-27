import {createSlice} from '@reduxjs/toolkit'
import { getCampaignLocation } from './camapaignLocationApi'
export const CampaignlocationSlice = createSlice({
    name: "Campaignlocation",
    initialState: {
        isLoading: false,
        values : []
    },
    reducers: {
        //vide
    },  
    extraReducers: {
        [getCampaignLocation.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [getCampaignLocation.fulfilled.type]: (state, { payload }) => {
            state.values = payload
            state.isLoading = false
        },
        [getCampaignLocation.rejected.type]: (state, action) => {
            state.isLoading = false
        },
    }
})
//export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default CampaignlocationSlice.reducer