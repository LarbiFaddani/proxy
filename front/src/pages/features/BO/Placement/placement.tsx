import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Spin, Button, Modal, Form, Input,Space, Select } from "antd";
import { RootState, useAppDispatch } from "../../../../store";
import { getBusiness } from "../Business/businessApi";
import {
  getPlacement,
  addPlacement,
  updatePlacement,
} from "./placementApi";
import type { IPlacement } from "src/models/placement";

const PlacementManagement: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingPlacement, setEditingPlacement] = useState<
      IPlacement | undefined
    >(undefined);
    const [placement, setPlacement] = useState<IPlacement>({
      id: 0,
      name: "",
      business_id:0
    });
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getPlacement());
    }, [dispatch]);
    useEffect(() => {
      dispatch(getBusiness());
    }, [dispatch]);
    const businessList = useSelector(
      (state: RootState) => state.business.values
      );
    const PlacementList = useSelector(
      (state: RootState) => state.placement.values
    );
    const isLoadingTable = useSelector(
      (state: RootState) => state.placement.isLoading
    );
  
    const showModal = () => {
      setIsModalOpen(true);
    };

    useEffect(() => {
      if (isModalOpen && editingPlacement) {
        form.setFieldsValue({
          name: editingPlacement.name,
          business_id: editingPlacement.business_id,
        });
      }
    }, [isModalOpen]);
    useEffect(() => {
      if (isModalOpen && !editingPlacement) {
        form.setFieldsValue({
          name: "",
          business_id: "",
        });
      }
    }, [isModalOpen]);
    const columns = [ 
        {title: "#ID",dataIndex: "id", key: "id",}, 
        {title: "Nom", dataIndex: "name", key: "nom",}, 
        {title: "Actions",
         key: "actions",
         render: (text: any, record: IPlacement) =>
         (<> 
            <Space>
                <Button onClick={() => { setEditingPlacement(record); showModal();}}> Edit </Button>
            </Space>
          </>),
    },
    ];
    const {Option} = Select;
    const handleSubmit = () => {
      dispatch(addPlacement(placement)).then(() => {
        dispatch(getPlacement());
      });
    };
  
    const handleCreate = () => {
      const values = form.getFieldsValue();
      dispatch(addPlacement(values)).then(() => {
        dispatch(getPlacement());
      });
      setIsModalOpen(false);
      handleSubmit();
      form.resetFields();
    };
  
    
    
    const handleEdit = () => {
      const values = form.getFieldsValue();
      if (editingPlacement && editingPlacement.id) {
        values.id = editingPlacement.id;
        dispatch(updatePlacement(values)).then(() => {
          dispatch(getPlacement());
          setIsModalOpen(false);
          form.resetFields();
        });
      }
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
      setEditingPlacement(undefined);
      setPlacement({ id: 0, name: "", business_id:0});
      form.resetFields();
    };
  
    const [form] = Form.useForm();
  
    return (
      <div>
        <Button type="primary" onClick={showModal} style={{ margin:15 }}>
          Ajouter un emplacement
        </Button>
        <Modal
          width={800}
          title="placement Informations"
          open={isModalOpen}
          onCancel={handleOkOrCancel}
          onOk={handleOkOrCancel}
        >
         <Form
  {...formItemLayout}
  form={form}
  name="ajouter"
  onFinish={editingPlacement ? handleEdit : handleCreate}
  style={{ maxWidth: 600 }}
  scrollToFirstError
  initialValues={editingPlacement}
>
  <Form.Item
    name="name"
    label="Name"
    rules={[
      {
        required: true,
        message: "Please input placement name!",
      },
    ]}
  >
    <Input />
  </Form.Item>
  <Form.Item
    name="business_id"
    label="Business Owner"
    rules={[
      {
        required: true,
        message: "Please select a business!",
      },
    ]}
  >
    <Select
      placeholder="Select a business"
    >
      {businessList.map((business: any) => (
        <Option key={business.id} value={business.id}>
          {business.user.name}
        </Option>
      ))}
    </Select>
  </Form.Item>

  <Form.Item {...tailFormItemLayout}>
    <Button type="primary" htmlType="submit">
      {editingPlacement ? "Update" : "Add"}
    </Button>
  </Form.Item>
</Form>
</Modal>
        {!isLoadingTable ? (
    <Table
        dataSource={PlacementList}
        columns={columns}
        rowKey="id"
        scroll={{ x: 150 }}
    />
    ) : (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
    <Spin tip="Loading" size="large"/>
    </div>
    )}
    <div>
    <ul></ul>
        </div></div>
    );
};
export default PlacementManagement;
