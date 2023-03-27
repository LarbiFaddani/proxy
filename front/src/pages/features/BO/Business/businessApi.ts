import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IBusiness } from "src/models/Business";
import { baseUrl } from "src/api";

const url = `${baseUrl}/businesses`;


export const getBusiness = createAsyncThunk("business/getBusiness", async () => {
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      return data
    } catch (error) {
        console.log(error)
    }
});

export const addBusiness = createAsyncThunk('business/addBusiness',async (business: IBusiness) => {
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(business),
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
export const updateBusiness = createAsyncThunk('business/updateBusiness',
  async (business: IBusiness) => {
    try {
      const response = await fetch(`${url}/${business.id}`, {
        method: 'PUT',
        body: JSON.stringify(business),
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
//le reste des methodes CRUD