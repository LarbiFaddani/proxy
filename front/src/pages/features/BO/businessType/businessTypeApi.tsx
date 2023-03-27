import { createAsyncThunk} from '@reduxjs/toolkit';
import type { BusinessType } from 'src/models/BusinessType';
import { baseUrl } from 'src/api';

const url = `${baseUrl}/business_types`;

export const getBusinessType = createAsyncThunk('business_type/getBusinessType', async () => {
  try {
    const response = await fetch(`${url}`);
    const data = await response.json();
    return data
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const addBusinessType = createAsyncThunk('business_type/addBusinessType', async (businessType: BusinessType) => {
  try {
    const response = await fetch(`${url}`, {
      method: 'POST',
      body: JSON.stringify(businessType),
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
});

export const updateBusinessType = createAsyncThunk(
  'business_type/updateBusinessType',
  async (businessType: BusinessType) => {
    try {
      const response = await fetch(`${url}/${businessType.id}`, {
        method: 'PUT',
        body: JSON.stringify(businessType),
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
  },
);export const deleteBusinessType = createAsyncThunk(
    "business_type/deleteBusinessType",
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

