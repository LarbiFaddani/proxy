import { createAsyncThunk} from "@reduxjs/toolkit";
import { baseUrl } from "src/api";

const url = `${baseUrl}/campaign_placement`;

export const getCampaignPlacement = createAsyncThunk("campaign/getCampaignPlacement", async () => {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
});
export const createCampaignPlacement = createAsyncThunk(
    "campaign_Placement/createCampaign_Placement",
    async ({ campaignId, placementIds }: { campaignId: number; placementIds: number[] }) => {
      try {
        const response = await fetch(`${baseUrl}/campaign_Placement`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId,
            placementIds,
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );
