import { configureStore } from '@reduxjs/toolkit'
import businessReducer from '../src/pages/features/BO/Business/businessSlice'
import locationReducer from '../src/pages/features/BO/Location/locationSlice'
import scheduleReducer from './pages/features/BO/Schedule/scheduleSlice'
import businessTypeReducer from '../src/pages/features/BO/businessType/businessTypeSlice'
import campaignReducer from '../src/pages/features/BO/campaign/campaignSlice'
import PlacementReducer from './pages/features/BO/Placement/placementSlice'
import AdvertiserReducer from'./pages/features/BO/advertiser/advertiserSlice'
import parametersReducer from '../src/pages/features/BO/parametres/parametersSlice';
import CampaignLocationReducer from '../src/pages/features/BO/campaignLocation/campaignLocationSlice';
import CampaignPlacementReducer from './pages/features/BO/camapaignPlacement/campaignPlacementSlice';
import businessActivityReducer  from './pages/features/BO/businessActivity/businessActivitySlice';

import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    business: businessReducer,
    location: locationReducer,
    businessType: businessTypeReducer,
    campaign: campaignReducer,
    businessActivity: businessActivityReducer,
    placement:PlacementReducer,
    advertiser:AdvertiserReducer,
    parameters:parametersReducer,
    Campaignlocation:CampaignLocationReducer,
    Campaignplacement:CampaignPlacementReducer,
    schedule: scheduleReducer,
  }
})
// dispatch does not take types for thunks into account and thus the return type is typed incorrectly. Please use the actual Dispatch type from the store as decsribed in the documentation. Ref: https://stackoverflow.com/questions/63811401/property-then-does-not-exist-on-type-asyncthunkaction-redux-toolkit
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
