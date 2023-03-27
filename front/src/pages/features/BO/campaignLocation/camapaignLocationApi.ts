import { createAsyncThunk} from "@reduxjs/toolkit";
import { baseUrl } from "src/api";

const url = `${baseUrl}/campaign_location`;

export const getCampaignLocation = createAsyncThunk("campaign/getCampaignLocation", async () => {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
});
export const createCampaignLocation = createAsyncThunk(
    "campaign_location/createCampaign_location",
    async ({ campaignId, locationIds }: { campaignId: number; locationIds: number[] }) => {
      try {
        const response = await fetch(`${baseUrl}/campaign_location`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            campaignId,
            locationIds,
          }),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  );
