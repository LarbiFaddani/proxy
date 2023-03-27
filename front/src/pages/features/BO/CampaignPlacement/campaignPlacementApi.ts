import { createAsyncThunk } from "@reduxjs/toolkit";
//import type { ICampaignPlacement } from "src/models/CampaignPlacement";
import { baseUrl } from "src/api";

const url = `${baseUrl}/campaign_placements`;


export const getCampaignPlacement = createAsyncThunk("campaignPlacement/getCampaignPlacement", async () => {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      return data
    } catch (error) {
        console.log(error)
    }
});