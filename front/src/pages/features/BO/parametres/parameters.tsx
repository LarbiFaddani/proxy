import { useState, useEffect } from 'react';
import { Table, InputNumber, Button, Space } from 'antd';
import { getParameters, updateParameters } from '../parametres/parametersApi';
import type { parameters } from 'src/models/parameters';
import { useAppDispatch } from 'src/store';

const Params = () => {
  const [data, setData] = useState<parameters[]>([]);
  const [loading, setLoading] = useState(true);

  
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getParameters()).then((response: any) => {
      setData(response.payload);
      setLoading(false);
    }).catch((error: any) => {
      console.log(error);
    });
  }, [dispatch]);

  const handleUpdate = async (record: parameters) => {
    try {
      const response = await dispatch(updateParameters({ id: record.id, data: record }));
      console.log(response.payload);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    
    {
      title: 'Ad price (advertiser)',
      dataIndex: 'ad_price_advertiser',
      key: 'ad_price_advertiser',
      render: (text: string, record: parameters) => (
<InputNumber defaultValue={record.ad_price_advertiser !== null && record.ad_price_advertiser !== undefined ? record.ad_price_advertiser : 0} onChange={(value) => handleUpdate({...record, ad_price_advertiser: value !== null ? value : 0})} />      )
    },
    {
      title: 'Ad price (business)',
      dataIndex: 'ad_price_business',
      key: 'ad_price_business',
      render: (text: string, record: parameters) => (
<InputNumber defaultValue={record.ad_price_business !== null && record.ad_price_business !== undefined ? record.ad_price_business : 0} onChange={(value) => handleUpdate({...record, ad_price_business: value !== null ? value : 0})} />      )
    },
    {
      title: 'prix d\'ads',
      dataIndex: 'com_display_time',
      key: 'com_display_time',
      render: (text: string, record: parameters) => (
<InputNumber defaultValue={record.com_display_time !== null && record.com_display_time!== undefined ? record.com_display_time : 0} onChange={(value) => handleUpdate({...record, com_display_time: value !== null ? value : 0})} />      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: parameters) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleUpdate(record)}>Save</Button>
          <Button type="ghost" onClick={() => console.log(record)}>Cancel</Button>
        </Space>
      )
    }
  ];

  return (
    <Table dataSource={data} columns={columns} loading={loading} />
  );
};

export default Params;
