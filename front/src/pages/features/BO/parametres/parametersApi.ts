import { createAsyncThunk} from  "@reduxjs/toolkit";
import { baseUrl } from "src/api";
import type { parameters } from "src/models/parameters";
const url = `${baseUrl}/parameters`;
export const getParameters = createAsyncThunk("parameters/getParameters", async () => {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
});

export const updateParameters = createAsyncThunk(
  'parameters/updateParameters',
  async (params: { id: number, data: parameters }) => {
    try {
      const response = await fetch(`${url}/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
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
  }
);
