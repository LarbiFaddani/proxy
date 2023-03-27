import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "src/api";
import type { IPlacement } from "src/models/placement";

const url = `${baseUrl}/placements`;

export const getPlacement = createAsyncThunk("placement/getPlacement", async () => {
  try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      return data
  } catch (error) {
      console.log(error)
  }
});

export const addPlacement = createAsyncThunk('placement/addPlacement',async (placement: IPlacement) => {
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(placement),
        headers: {
          'Content-type': 'application/json'
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
});
export const updatePlacement = createAsyncThunk('placement/updatePlacement',
  async (placement: IPlacement) => {
    try {
      const response = await fetch(`${url}/${placement.id}`, {
        method: 'PUT',
        body: JSON.stringify(placement),
        headers: {
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },);
  export const deletePlacement = createAsyncThunk(
    "business_type/deletePlacement",
    async (id: number) => {
      try {
        await fetch(`${url}/${id}`, {
          method: "DELETE",
        });
        return id;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );