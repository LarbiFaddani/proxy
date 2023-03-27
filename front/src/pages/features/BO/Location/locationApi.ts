import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "src/api";

const url = `${baseUrl}/locations`;


export const getLocation = createAsyncThunk("business/getLocation", async () => {
    try {
        const response = await fetch(`${url}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
});