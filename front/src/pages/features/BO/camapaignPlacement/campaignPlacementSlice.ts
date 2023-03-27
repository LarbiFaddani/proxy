import {createSlice} from '@reduxjs/toolkit'
import { getCampaignPlacement } from './campaignPlacementApi'
export const CampaignPlacementSlice = createSlice({
    name: "CampaignPlacement",
    initialState: {
        isLoading: false,
        values : []
    },
    reducers: {
        //vide
    },  
    extraReducers: {
        [getCampaignPlacement.pending.type]: (state, action) => {
            state.isLoading = true
        },
        [getCampaignPlacement.fulfilled.type]: (state, { payload }) => {
            state.values = payload
            state.isLoading = false
        },
        [getCampaignPlacement.rejected.type]: (state, action) => {
            state.isLoading = false
        },
    }
})
//export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default CampaignPlacementSlice.reducer