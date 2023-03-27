import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Button, DatePicker, Select, TimePicker, message } from "antd";
import type { Campaign } from "src/models/campaign";
import Upload from "antd/es/upload/Upload";
import { UploadOutlined } from "@ant-design/icons";
import { createCampaign, getAdvertisers } from "./campaignApi";
import { useAppDispatch } from "src/store";
import type { Advertiser } from "src/models/Advertiser";

const { Option } = Select;
type Props = {
  campaign?: Campaign;
  onSave: (values: Campaign) => void;
};

const CampaignForm: React.FC<Props> = ({ campaign, onSave }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [advertiserList, setAdvertiserList] = useState<Advertiser[]>([]);

  const dispatch = useAppDispatch();

  const fetchAdvertisers = useCallback(async () => {
    try {
      const action = await dispatch(getAdvertisers());
      const advertisers = action.payload as Advertiser[];
      setAdvertiserList(advertisers);
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);
  
  useEffect(() => {
    fetchAdvertisers();
  }, [fetchAdvertisers])

  const handleSave = async (values: Campaign) => {
    setLoading(true);
    try {
      await dispatch(createCampaign(values));
      onSave(values);
    } catch (error) {
      console.error(error);
      message.error("Failed to create campaign.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (file: string) => {
    console.log("Upload file:", file);
    // handle upload here
    return true; // return false to stop upload
  };
/*
  const beforeUpload = (file: RcFile, fileList: RcFile[]): boolean => {
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage;
  };*/

  return (
    <>
      <Form form={form} initialValues={campaign} 
      onFinish={handleSave}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter campaign name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="budget_max"
          label="Max budget"
          rules={[{ required: true, message: "Please enter max budget" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="begin_date"
          label="Begin date"
          rules={[{ required: true, message: "Please select begin date" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="end_date"
          label="End date"
          rules={[{ required: true, message: "Please select end date" }]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item name="file" label="File" valuePropName="fileList" getValueFromEvent={handleUpload}>
          <Upload >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="display_hours"
          label="Display hours"
          rules={[{ required: true, message: "Please enter display hours" }]}
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          name="url"
          label="URL"
          rules={[{ required: true, message: 'Please enter URL' }]}
        >
          <Input />
      </Form.Item>

      <Form.Item
  name="advertiser_id"
  label="Advertiser ID"
  rules={[{ required: true, message: 'Please select advertiser ID' }]}
>
  <Select placeholder="Select an advertiser">
  {advertiserList && advertiserList.map((advertiser: any) => (
  <Option key={advertiser.id} value={advertiser.id}>
    {advertiser.user.name}
  </Option>
))}
  </Select>
</Form.Item>
<Button type="primary" loading={loading} 
//onClick={handleSave}
>
  Save
</Button>
    </Form>
</>);
};
export default CampaignForm;
