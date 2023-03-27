import React, { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
import { Table, Button, Modal, Space } from 'antd';
import  { RootState,useAppDispatch  } from 'src/store';
import { getCampaign, deleteCampaign,} from './campaignApi';
import type { Campaign } from 'src/models/campaign';
import CampaignForm from './campaignForm';
import BtbaForm from './businessTypeAndBusinessActivityForm';
import LastForm from './LocationAndPlacementForm';
import StatusDropdown from './status';

enum Status {// Define CampaignTable component
  Active = 'active',
  Inactive = 'inactive',
  Pending = 'pending',
  Finished = 'finished'
}
const CampaignTable=()=>{
// State variables
const [part, setPart] = useState(1);
const dispatch = useAppDispatch();
const campaigns = useSelector((state: RootState) => state.campaign.values);
const isLoadingTable = useSelector((state: RootState) => state.campaign.isLoading);
const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
const [currentPart, setCurrentPart] = useState<any>();
const [FormData, setFormData] = useState({});
const [isEditing, setIsEditing] = useState(false);


// useEffect to fetch campaign data
useEffect(() => {
dispatch(getCampaign());
}, [dispatch]);

// Handle adding a new campaign
const handleAdd = () => {
setIsModalVisible(true);
setSelectedCampaignId(null);
setIsEditing(false);
};
const handleShowMore = (id: number) => {
  setSelectedCampaignId(id);
};// Handle editing an existing campaign
const handleEdit = (record: Campaign) => {
setIsModalVisible(true);
setSelectedCampaignId(record.id);
setIsEditing(true);
};// Handle deleting a campaign
const handleDelete = async (record: Campaign) => {
try {
  deleteCampaign(record.id);
} catch (error) {
console.error('Failed to delete campaign', error);
}
};
const handleNext = () => {
setPart(part + 1);
};
// Handle navigating back to the previous form section
const handleBack = () => {
setPart(part - 1);
};
const handleShow = () =>{ 
}
function handleStatusChange(id: number, value: Status){
  const possibleValues = Object.values(Status);
  if (!possibleValues.includes(value)) {
    console.error(`Invalid status value: ${value}`);
    return;
  }

  async function updateCampaignStatus(id: number, value: any) {
    try {
      await updateCampaign(id, { status: value });
      dispatch(getCampaign());
    } catch (error) {
      console.error('Failed to update campaign', error);
    }
  }
  updateCampaignStatus(id, value);
}

const handleSubmit = (data:any) => {
  // Save form data based on currentPart
  switch (currentPart) {
    case 1:
      setFormData({ ...FormData, ...data });
      setCurrentPart(2);
      break;
    case 2:
      setFormData({ ...FormData, ...data });
      setCurrentPart(3);
      break;
    case 3:
      setFormData({ ...FormData, ...data });
      // Submit all form data
      submitFormData(FormData);
      break;
    default:
      break;
  }
};
// Render the appropriate form section based on the current part of the form
const renderForm = () => {
switch (part) {
case 1:
return (
<>
<CampaignForm onSave={function (values: Campaign): void {
      throw new Error('Function not implemented.');
       } } />
<Button type="primary" onClick={handleNext} >Next</Button>
</>
);
case 2:
return (
<>
<BtbaForm
//  onSubmit={handleSubmit}
 />
<Button onClick={handleBack}>Back</Button>
<Button type="primary" onClick={handleNext}>Next</Button>
</>
);
case 3:
return (
<>
<LastForm  
// onSubmit={handleSubmit}
/>
<Button onClick={handleBack}>Back</Button>
</>
);
default:
return 1;
}
};

// Define the table columns
const columns = [
{
title: 'ID',
dataIndex: 'id',
key: 'id',
},
{
title: 'Nom',
dataIndex: 'name',
key: 'name',
},
{
title: 'Budget max',
dataIndex: 'budget_max',
key: 'budget_max',
},
{
title: 'Date de début',
dataIndex: 'begin_date',
key: 'begin_date',
},
    {
      title: 'Date de fin',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Statut',
      dataIndex: 'status',
      key: 'status',
      render: (text: string, record: any) => (
  <StatusDropdown
    value={record.status as string}
    onChange={(value: any) => handleStatusChange(record.id, value)}
  />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Campaign) => (
        <>
          <Button type="primary" onClick={() => handleEdit(record)}>Modifier</Button><Space/>
          <Space/> <Button type="primary" danger onClick={() => handleDelete(record)}>Supprimer</Button><Space/>
          <Space/>  <Button type="primary" onClick={() =>handleShow()}>Afficher plus</Button><Space/>
        </>
      ),
    },
  ];
  const handleCancel = () => {
    setIsModalVisible(false);
    };
  return (
    <>
      <Button type="primary" onClick={handleAdd}>Ajouter</Button>
      <Table
        dataSource={campaigns}
        columns={columns}
        loading={isLoadingTable}
      />
     <Modal
      open={isModalVisible}
      title={isEditing ? 'Modifier la campagne' : 'Ajouter une campagne'}
      onCancel={handleCancel}
      footer={null}
      destroyOnClose
        >
          {renderForm()}
</Modal>
    
 </> );
};
export default CampaignTable;
// function setCurrentPart(arg0: number) {
//   throw new Error('Function not implemented.');
// }
function updateCampaign(id: number, arg1: { status: Status; }) {
  throw new Error('Function not implemented.');
}
function setFormData(arg0: any) {
  throw new Error('Function not implemented.');
}
function submitFormData(formData: any) {
  throw new Error('Function not implemented.');
}
/*
function updateCampaignStatus(id: number, arg1: Status) {
  throw new Error('Function not implemented.');
}*/