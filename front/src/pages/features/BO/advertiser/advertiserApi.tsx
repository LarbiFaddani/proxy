import { createAsyncThunk } from "@reduxjs/toolkit";
import type {Advertiser} from "../../../../models/Advertiser";


export const getAdvertiser=createAsyncThunk("advertiser/getAdvertiser",async()=>{
  try{
    const response = await fetch("http://127.0.0.1:8000/api/advertiser");
    const data = await response.json();
    return data
  }catch(error){
    console.log(error)
  }
});


export const addAdvertiser =createAsyncThunk("advertiser/addAdvertiser",async(adv:Advertiser)=>{

try {
  const response = await fetch("http://127.0.0.1:8000/api/advertiser",{
      method:'POST',
      body:JSON.stringify(adv),
      headers:{
        'Content-type':'application/json'
      },

    }); 
    const data =await response.json();
    return data;
  }catch (error) {
    throw error;
}
});

export const updateAdvertiser = createAsyncThunk('advertiser/updateAdvertiser',
async(adv:Advertiser)=>{
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/advertiser/${adv.id}`,
    {
      method:'PUT',
      body:JSON.stringify(adv),
      headers:{
        'Content-type':'application/json',
      },
    });
    const data =await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
    
  }
}
)








































































/*import { createAsyncThunk} from '@reduxjs/toolkit';
import type { Advertiser } from '../../model/advertiserM';
//import { baseUrl } from '../../../src/api';

//const url = `${baseUrl}/business_activity`;

export const getAdvertiser = createAsyncThunk('advertiser/getAdvertiser', async () => {
  try {
   const response = await fetch('http://127.0.0.1:8000/api/advertiser');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});








export const addAvertiser = createAsyncThunk('advertiser/addAvertiser', async (adv: Advertiser) => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/advertiser', {
      method: 'POST',
      body: JSON.stringify(adv),
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

export const updateAdvertiser = createAsyncThunk(
  'advertiser/updateAdvertiser ',
  async (id:number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/advertiser/${id}`, {
        method: 'PUT',
        body: JSON.stringify(id),
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
  },
);
export const deleteadvertiser = createAsyncThunk(
    "advertiser/deleteadvertiser ",
    async (id: number) => {
      try {
        await fetch(`http://127.0.0.1:8000/api/advertiser/${id}`, {
          method: "DELETE",
        });
        return id;
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  );*/