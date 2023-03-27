import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { Drawer } from 'antd';
import { getCampaignLocation } from '../campaignLocation/camapaignLocationApi';
import { useAppDispatch } from 'src/store';

interface CampaignLocation {
  location: string;
  campaignName: string;
  // Ajoutez d'autres champs de données si nécessaire
}

const Affddestablesin = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCampaignLocation());
  }, [dispatch])
  console.log(dispatch);

  const campaignLocationData = useSelector(
    (state: { campaignLocation: unknown }) => state.campaignLocation as CampaignLocation[]
  );

  return (
    <div>
      <Drawer>
        {campaignLocationData.map((data, index) => (
          <div key={index}>
            <p>Location: {data.location}</p>
            <p>Campaign Name: {data.campaignName}</p>
            {/* Ajoutez d'autres champs de données si nécessaire */}
          </div>
        ))}
      </Drawer>
    </div>
  );
};

export default Affddestablesin;