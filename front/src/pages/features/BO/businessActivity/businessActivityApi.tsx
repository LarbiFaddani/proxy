import { createAsyncThunk} from '@reduxjs/toolkit';
import{baseUrl} from "src/api";
import type { BusinessActivity } from '../../../../models/businessActivity';
//import { baseUrl } from '../../../src/api';

const url = `${baseUrl}/business_activities`;

export const getBusinessActivity = createAsyncThunk('business_activities/getBusinessActivity', async () => {
  try {
   const response = await fetch(`${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const addBusinessActivity = createAsyncThunk('business_Activities/addBusinessActivity', async (businessActivity: BusinessActivity) => {
  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(businessActivity),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const updateBusinessActivity = createAsyncThunk(
  'business_Activity/updateBusinessActivity',
  async (businessact:BusinessActivity ) => {
    try {
      console.log(businessact.id)
      const response = await fetch(`${url}/${businessact.id}`, {
        method: 'PUT',
        body: JSON.stringify(businessact),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },)

export const deleteBusinessActivity = createAsyncThunk(
    "business_Activity/deleteBusinessActivity",
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