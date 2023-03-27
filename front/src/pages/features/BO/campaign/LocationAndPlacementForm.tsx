import React, { useState, useEffect } from 'react';
import { useSelector} from 'react-redux';
import { getLocation } from '../Location/locationApi';
import { Tree, Button } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { RootState, useAppDispatch } from 'src/store';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import { getPlacement } from '../Placement/placementApi';
import {
  createCampaignPlacement,
  getCampaignPlacement,
} from '../camapaignPlacement/campaignPlacementApi';
import {
  createCampaignLocation,
  getCampaignLocation,
} from '../campaignLocation/camapaignLocationApi';
//import { Campaign } from '../../../models/campaign';
//import { ThunkAction } from 'redux-thunk';
//import { AnyAction } from 'redux';
interface ILocation {
  id: number;
  region: string;
  city: string;
  secteur: string;
}

interface Placement {
  id: number;
  name: string;
}

interface CampaignPlacement {
  campaignId: number;
  placementIds: number[];
}

interface CampaignLocation {
  campaignId: number;
  locationIds: number[];
}

type formValuesState = { campaignPlacement: CampaignPlacement, campaignLocation: CampaignLocation }

const LastForm = () => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState<formValuesState>({
    campaignPlacement: {
      campaignId: 0,
      placementIds: []
    }, campaignLocation: {
      campaignId: 0,
      locationIds: []
    }
  })
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);

  const { values } = useSelector((state: RootState) => state.location);
  const placements = useSelector((state: RootState) => state.placement.values);

  useEffect(() => {
    dispatch(getLocation());
    dispatch(getPlacement());
  }, [dispatch]);

  const handleSubmit = () => {
    if (formValues.campaignPlacement.placementIds.length > 0) {
      dispatch(createCampaignPlacement(formValues.campaignPlacement)).then(() => {
        dispatch(getCampaignPlacement());
      });
    }
  };
/*
  const handleSubmit1 = () => {
    if (formValues.campaignLocation.locationIds.length > 0) {
      dispatch(createCampaignLocation(formValues.campaignLocation)).then(() => {
        dispatch(getCampaignLocation());
      });
    }
  };
*/
  const handleChange = (name:string , data:CampaignPlacement| CampaignLocation)=>{
    setFormValues((state)=> ({...state , [name]: data}))
  }
/*
  const handleCreate = (data:formValuesState) => {
    const {campaignLocation,campaignPlacement} = data
    const locationIds = checkedKeys;
    handleSubmit();
    handleSubmit1();
  };*/

  // Transform the data into a tree
  const data: DataNode[] = values.reduce((tree: DataNode[], location: ILocation) => {
    // Get the node of the corresponding region
    let regionNode = tree.find((node) => node.title === location.region);
    if (!regionNode) {
      regionNode = { title: location.region, key: location.region, children: [] };
      tree.push(regionNode);
    }

    // Récupère le noeud de la ville correspondante
    let cityNode = regionNode.children?.find(node => node.title === location.city);
    if (!cityNode) {
      cityNode = { title: location.city, key: `${location.region}-${location.city}`, children: [] };
      regionNode.children?.push(cityNode);
    }

    // Ajoute le secteur à la ville
    const secteurNode = { title: location.secteur, key: `${location.region}-${location.city}-${location.secteur}` };
    cityNode.children?.push(secteurNode);

    return tree;
  }, []);

  const options: SelectProps<Placement>['options'] = placements ? placements.map((bt: Placement) => ({
    value: bt.id,
    label: bt.name,
  })) : [];
  const onCheck = (checked: React.Key[] | { checked: React.Key[], halfChecked: React.Key[] }, info: any) => {
    const checkedKeys = (checked as React.Key[]).map(key => key.toString());
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  console.log('formValues', formValues)

  return (
    <div>
      <Tree
        showLine
        defaultExpandAll
        checkable
        checkedKeys={formValues.campaignLocation.locationIds}
        treeData={data}
        onCheck={(keys)=> handleChange( "campaignLocation",{ locationIds:keys as any ,campaignId:0}) }
      />
      <Select
        mode="tags"
        style={{ width: '100%' }}
        placeholder="Placements"
        onChange={(keys)=> handleChange( "campaignPlacement",{ placementIds:keys ,campaignId:0})}
        options={options}

      />
      <Button onClick={handleSubmit}>Créer</Button>
    </div>
  );
};

export default LastForm;
