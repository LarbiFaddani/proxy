import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Spin, Button, Modal, Form, Input } from "antd";
import { RootState, useAppDispatch } from "../../../../store";
import {
  getBusinessActivity,
  addBusinessActivity,
  deleteBusinessActivity,
  updateBusinessActivity,
} from "./businessActivityApi";
import type { BusinessActivity } from "../../../../models/businessActivity";

const BusinessActivities: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingBusinessActivity, setEditingBusinessActivity] = useState<
      BusinessActivity | undefined
    >(undefined);
    const [businessactivity, setbusinessactivity] = useState<BusinessActivity>({
      id: 0,
      name: "",
    });
    const dispatch = useAppDispatch();
    useEffect(() => {
      if (isModalOpen && !editingBusinessActivity) {
        form.setFieldsValue({
          name: "",
        });
      }
    }, [isModalOpen]);
    useEffect(() => {
      if (isModalOpen && editingBusinessActivity) {
        form.setFieldsValue({
          name: editingBusinessActivity.name
        });
      }
    }, [isModalOpen]);
    useEffect(() => {
      if (isModalOpen && !editingBusinessActivity) {
        form.setFieldsValue({
          name: "",
        });
      }
    }, [isModalOpen]);
    useEffect(() => {
      dispatch(getBusinessActivity());
    }, [dispatch]);
  
    const businessActivityList= useSelector(
      (state: RootState) => state.businessActivity.values
    );
    const isLoadingTable = useSelector(
      (state: RootState) => state.businessActivity.isLoading
    );
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const columns = [    {      title: "ID",      dataIndex: "id",      key: "id",    },    {      title: "Name",      dataIndex: "name",      key: "name",    },    {      title: "Actions",      key: "actions",      render: (text: any, record: BusinessActivity) => (        <>          <Button            onClick={() => {              setEditingBusinessActivity(record);              setIsModalOpen(true);            }}          >            Edit          </Button>          <Button type="primary" danger onClick={() => handleDelete(record.id)}>            Delete          </Button>        </>      ),    },  ];
  
    const handleSubmit = () => {
      console.log(businessactivity);
     
      
      dispatch(addBusinessActivity(businessactivity)).then(() => {
        dispatch(getBusinessActivity());
      });
    };
  
    const handleCreate = (data: BusinessActivity) => {
      console.log(data);
      dispatch(addBusinessActivity(data)).then(() => {
        dispatch(getBusinessActivity());
      });
      setbusinessactivity({
        id: Math.round(Math.random() * 10000),
        name: data.name,
      });
      handleSubmit();
      setIsModalOpen(false);
    };

    const handleEdit = (data: BusinessActivity) => {
      if(editingBusinessActivity&&editingBusinessActivity.id){
        data.id=editingBusinessActivity.id
      console.log(data)
      dispatch(updateBusinessActivity(data)).then(() => {
        dispatch(getBusinessActivity()).then(() => {
          setIsModalOpen(false);
        });
      });
    }
    };

    const handleDelete = (id: number) => {
      console.log(id);
      dispatch(deleteBusinessActivity(id)).then(() => {
        dispatch(getBusinessActivity());
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
      setEditingBusinessActivity(undefined);
      setbusinessactivity({ id: 0, name: "" });
      form.resetFields();
    };
  
    const [form] = Form.useForm();
  
    return (
      <div>
        <Button style={{ margin:15 }} type="primary" onClick={showModal} >
          Ajouter un business Activity
        </Button>
        <Modal
          width={800}
          title="Business activity Informations"
          open={isModalOpen}
          onCancel={handleOkOrCancel}
          onOk={handleOkOrCancel}
        >
          <Form
            {...formItemLayout}
            form={form}
            name="ajouter"
            onFinish={editingBusinessActivity ? handleEdit : handleCreate}
            style={{ maxWidth: 600 }}
    scrollToFirstError
  >
    <Form.Item
      name="name"
      label="Name"
      rules={[
        {
          required: true,
          message: "Please input business  name!",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item {...tailFormItemLayout}>
      <Button type="primary" htmlType="submit">
        {editingBusinessActivity ? "Update" : "Add"}
      </Button>
    </Form.Item>
  </Form>
</Modal>
        {!isLoadingTable ? (
    <Table
        dataSource={businessActivityList}
        columns={columns}
        rowKey="id"
        scroll={{ x: 400 }}
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
export default BusinessActivities;

function preventDefault() {
  throw new Error("Function not implemented.");
}
