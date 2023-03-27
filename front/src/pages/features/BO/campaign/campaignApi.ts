import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "src/api";
import type { Campaign } from "src/models/campaign";


const url = `${baseUrl}/campaign`;
const url1 = `${baseUrl}/advertiser`;


export const getCampaign = createAsyncThunk("campaign/getCampaign", async () => {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});
export const getAdvertisers = createAsyncThunk("advertiser/getAdvertiser", async () => {
    try {
      const response = await fetch(`${url1}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  });
  export const createCampaign = createAsyncThunk(
    "campaign/createCampaign",
    async (campaign: Campaign) => {
      try {
        const response = await fetch(`${url}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(campaign),
        });
        const data = await response.json();
        const campaignId = data.id; // retrieve the campaign ID from the response
        return { ...campaign, id: campaignId }; // return the campaign object with the ID added
      } catch (error) {
        console.log(error);
      }
    }
  );
  
export const updateCampaign = createAsyncThunk(
  "campaign/updateCampaign",
  async (campaign: Campaign) => {
    try {
      const response = await fetch(`${url}/${campaign.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaign),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const createCampaignLocation = createAsyncThunk(
  "campaign_location/createCampaign_location",
  async ({ campaignId, placementIds }: { campaignId: number; placementIds: number[] }) => {
    try {
      const response = await fetch(`${baseUrl}/campaign_location`, {
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
export async function deleteCampaign(id: number): Promise<void> {
  const response = await fetch(`/api/campaign/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete campaign with id ${id}`);
  }
}
/*
export async function updateCampaignStatus(campaignId: number, status: Status): Promise<boolean> {
  const response = await fetch(`/api/campaign/${campaignId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error(`Failed to update campaign status for campaign with id ${campaignId}`);
  }
  return true;
}*/