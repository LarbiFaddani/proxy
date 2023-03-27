import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "src/api";
import type { ISchedule } from "src/models/schedule";

const url = `${baseUrl}/schedules`;
const urlDelAll = `${baseUrl}/schedules_business`;

export const addSchedule = createAsyncThunk('schedule/addSchedule',async (schedule: ISchedule) => {
    try {
      const response = await fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(schedule),
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
export const deleteSchedule = createAsyncThunk(
  "Schedule/deleteSchedule",
  async (id: number) => {
    try {
      await fetch(`${urlDelAll}/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);