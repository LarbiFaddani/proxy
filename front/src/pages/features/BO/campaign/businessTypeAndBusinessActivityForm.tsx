import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import  { RootState ,useAppDispatch } from 'src/store';
import { getBusinessType } from '../businessType/businessTypeApi';
import { getBusinessActivity } from '../businessActivity/businessActivityApi';



const BtbaForm = () => {
  const businessTypes = useSelector((state: RootState) => state.businessType.values);
  const businessActivities = useSelector((state :RootState) =>state.businessActivity.values);
  interface BusinessType {
    id: number;
    name: string;
  }
  interface BusinessActivity {
    id:number;
    name:string;
  }
  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(getBusinessType());
    }, [dispatch]);
    const dispatch1 = useAppDispatch();
    useEffect(() => {
        dispatch1(getBusinessActivity());
      }, [dispatch1]);
  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const handleChange1 = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  const options: SelectProps<BusinessType>['options'] = businessTypes.map((bt: BusinessType) => ({
    value: bt.id,
    label: bt.name,
  }));
  const options1: SelectProps<BusinessActivity>['options'] = businessActivities.map((bt: BusinessActivity) => ({
    value: bt.id,
    label: bt.name,
  }));

  return (
    <>
    <Select
      mode="tags"
      style={{ width: '100%' }}
      placeholder="BUsiness Types"
      onChange={handleChange}
      options={options}
    />
   <Select 
    mode="tags"
    style={{ width: '100%' }}
    placeholder="BUsiness Activities"
    onChange={handleChange1}
    options={options1}
  />
  </>);
};

export default BtbaForm;
