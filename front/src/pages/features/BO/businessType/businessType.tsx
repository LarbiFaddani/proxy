import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Spin, Button, Modal, Form, Input } from "antd";
import { RootState, useAppDispatch } from "src/store";
import {
  getBusinessType,
  addBusinessType,
  deleteBusinessType,
  updateBusinessType,
} from "../businessType/businessTypeApi";
import type { BusinessType } from "src/models/BusinessType";

const BusinessTypeManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingBusinessType, setEditingBusinessType] = useState<
      BusinessType | undefined
    >(undefined);
    const [businessType, setBusinessType] = useState<BusinessType>({
      id: 0,
      name: "",
    });
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getBusinessType());
    }, [dispatch]);
  
    const businessTypeList = useSelector(
      (state: RootState) => state.businessType.values
    );
    const isLoadingTable = useSelector(
      (state: RootState) => state.businessType.isLoading
    );
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const columns = [    {      title: "ID",      dataIndex: "id",      key: "id",    },    {      title: "Name",      dataIndex: "name",      key: "name",    },    {      title: "Actions",      key: "actions",      render: (text: any, record: BusinessType) => (        <>          <Button            onClick={() => {              setEditingBusinessType(record);              setIsModalOpen(true);            }}          >            Edit          </Button>          <Button type="primary" danger onClick={() => handleDelete(record.id)}>            Delete          </Button>        </>      ),    },  ];
  
    const handleSubmit = () => {
      console.log(businessType);
      dispatch(addBusinessType(businessType)).then(() => {
        dispatch(getBusinessType());
      });
    };
  
    const handleCreate = (data: BusinessType) => {
      console.log(data);
      setBusinessType({
        id: Math.round(Math.random() * 10000),
        name: data.name,
      });
      handleSubmit();
      setIsModalOpen(false);
    };
  
    const handleEdit = (data: BusinessType) => {
      if (editingBusinessType && editingBusinessType.id) {
        data.id = editingBusinessType.id;
        dispatch(updateBusinessType(data)).then(() => {
          dispatch(getBusinessType());
          setIsModalOpen(false);
        });
      }
    };
  
    const handleDelete = (id: number) => {
      console.log(id);
      dispatch(deleteBusinessType(id)).then(() => {
        dispatch(getBusinessType());
      });
    };
  
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
  
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
  
    const handleOkOrCancel = () => {
      setIsModalOpen(false);
      setEditingBusinessType(undefined);
      setBusinessType({ id: 0, name: "" });
      form.resetFields();
    };
  
    const [form] = Form.useForm();
  
    return (
      <div>
        <Button type="primary" onClick={showModal}>
          Ajouter un business Type
        </Button>
        <Modal
          width={800}
          title="Business Type Informations"
          open={isModalOpen}
          onCancel={handleOkOrCancel}
          onOk={handleOkOrCancel}
        >
          <Form
  {...formItemLayout}
  form={form}
  name="ajouter"
  onFinish={editingBusinessType ? handleEdit : handleCreate}
  style={{ maxWidth: 600 }}
  scrollToFirstError
>
  <Form.Item
    name="name"
    label="Name"
    rules={[      {        required: true,        message: "Please input business type name!",      },    ]}
  >
    <Input />
  </Form.Item>
  <Form.Item {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit">
      {editingBusinessType ? "Update" : "Add"}
    </Button>
  </Form.Item>
</Form>
</Modal>
        {!isLoadingTable ? (
    <Table
        dataSource={businessTypeList}
        columns={columns}
        rowKey="id"
    />
    ) : (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
    <Spin size="large" />
    </div>
    )}
    <div>
    <ul></ul>
        </div></div>
    );
};
export default BusinessTypeManagement;