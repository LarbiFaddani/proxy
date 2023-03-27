import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import {Table,Spin,Tag,Button,Modal,Space ,Form,Input} from "antd";
import { RootState,useAppDispatch } from "../../../../store";
import { getAdvertiser,addAdvertiser,updateAdvertiser } from "./advertiserApi";
import type { Advertiser } from "../../../../models/Advertiser";
import type { BusinessActivity } from "../../../../models/businessActivity";
import { getBusinessActivity } from "../businessActivity/businessActivityApi";
import FormItem from "antd/es/form/FormItem";


const ADvertiser:React.FC=()=>{
  const [isModalOpen,setIsModalOpen]=useState<boolean>(false)
  const [advertisere,setAdvertisere]=useState<Advertiser>({
    id:0,
    email:"",
    password:"",
    name:"",
    phone:"",
    adress:"",
    status:"1",
    act_id:0,
    act_name:""
  })

  const [editingadvertiser,setEditingadvertiser]=useState<any>();
  const dispatch =useAppDispatch();

  useEffect(()=>{
    dispatch(getAdvertiser());
  },[dispatch]);
  useEffect(()=>{
    dispatch(getBusinessActivity());
  },[dispatch]);

const AdvertiserList =useSelector(
  (state:RootState)=>state.advertiser.values
);
// const businessActivityList = useSelector(
//   (state:RootState)=>state.activity.values
// );

const handleInactif=(record:any)=>{
  setEditingadvertiser({
    id:record.id,
    status:"0"
  })
dispatch(updateAdvertiser(editingadvertiser)).then(()=>{
  dispatch(getAdvertiser());
});  
}
const isLoadingTable = useSelector(
  (state: RootState) => state.advertiser.isLoading
  );
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleEdit = (data:Advertiser) => {
    console.log(data);
    
    dispatch(updateAdvertiser(data)).then(() => {
      dispatch(getAdvertiser());
      setIsModalOpen(false);
    });
  };

  const columns = [
    {
    title: "ID",
    dataIndex: "id",
    key: "id",
    },
    {
    title: "NAME",
    dataIndex: ["user", "name"],
    key: "user.name",
    },
    {
      title: "EMAIL",
      dataIndex: ["user", "email"],
      key: "user.email",
      },
      {
        title: "PHONE",
        dataIndex: ["user", "phone"],
        key: "user.phone",
      },
      {
        title: "ACTIVITY_ID",
        dataIndex: ["business_activity", "id"],
        key: "business_activity.id",},


        {
          title: "ACTIVITY_NAME",
          dataIndex: ["business_activity", "name"],
          key: "business_activity.name",},
      {
        title: "USER STATUS",
        dataIndex: ["user", "status"],
        key: "user.status",
        render:(status:string)=>{
          return <p>{status==="1" ? <Tag color="green">actif</Tag>:<Tag color="#f50">inactif</Tag>}</p>
        }
      },
      {
        title:"ACTION",
        key:"action",
        render:(text:any,record:any)=>(
         <Space>
          <Button
            onClick={()=>{
              form.resetFields();
              console.log(record);
              setEditingadvertiser({
                id: record.id,
                email: record.email,
                password:"",
                name: record.name,
                phone:record.phone,
                adress: record.user.adress,
                act_id:record.business_activity.id,
                act_name:record.business_activity.name
              });
              setIsModalOpen(true);
        }}
        >
        Edit
      </Button>
      <Button type="primary" danger 
      onClick={() =>handleInactif(record)}
      >
        Inactif
      </Button>
    </Space>
  ),
},
];


const handleSubmit = () => {
  console.log(advertisere);
  dispatch(addAdvertiser(advertisere)).then(() => {
  dispatch(getAdvertiser());
  });
}



  const handleCreate = (data: any) => {
    console.log(data);
    const id=Math.round(Math.random()*10000)
    //let id2=Math.round(Math.random()*10000)
    setAdvertisere({
        id: id,
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        adress: data.adress,
        act_id:data.id,
        act_name:data.name,
        status:"1",
      });
      handleSubmit();
      //setIsModalOpen(false);
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
  };
  const [form] = Form.useForm();
  return (
    <div>
      <Button style={{ margin:15 }} type='primary' onClick={showModal}>Ajouter un advertiser</Button>
      <Modal width={800} style={{ marginBottom:165 }} title="Business Informations"   open={isModalOpen} 
      onOk={handleOkOrCancel} onCancel={handleOkOrCancel}
      >
         <Form
  {...formItemLayout}
  form={form}
  name="register"
  initialValues={editingadvertiser}
  onFinish={(data) => {
    if (editingadvertiser) {
      handleEdit({...editingadvertiser, ...data});
    } else {
      handleCreate(data);
    }
  }}
  style={{ maxWidth: 600 }}
  scrollToFirstError
>

<FormItem name="email"
    label="Email"
    rules={[      {        type: 'email',        message: 'The input is not a valid email!',      },      {        required: true,        message: 'Please input your email!',      },    ]}
   >
     <Input />
   </FormItem>

   <Form.Item
    name="password"
    label="Password"
    rules={[      {        required: true,        message: 'Please input your password!',      },    ]}
    hasFeedback
  >
    <Input.Password />
  </Form.Item>

  <Form.Item
    name="confirm"
    label="Confirm Password"
    dependencies={['password']}
    hasFeedback
    rules={[      {        required: true,        message: 'Please confirm your password!',      },      ({ getFieldValue }) => ({        validator(_, value) {          if (!value || getFieldValue('password') === value) {            return Promise.resolve();          }          return Promise.reject(new Error('The two passwords that you entered do not match!'));        },      }),    ]}
  >
    <Input.Password />
  </Form.Item>

  
  <Form.Item
    name="name"
    label="Name"
    rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
  >
    <Input />
  </Form.Item>



  <Form.Item
    name="phone"
    label="Phone Number"
    rules={[{ required: true, message: 'Please input your phone number!' }]}
  >
    <Input />
  </Form.Item>

  <Form.Item
    name="address"
    label="Address"
    rules={[{ required: true, message: 'Please input your address!' }]}
  >
    <Input.TextArea showCount maxLength={250} />
  </Form.Item>

  <FormItem
  name="act_id"
  label="Activity_ID"
  >
    <Input type="number" />
    
  </FormItem>
  <FormItem
  name="act_name"
  label="Activity_Name"
  >
    <Input />
    
  </FormItem>

  <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
        {editingadvertiser ? "Update" : "Add"}
        </Button>
      </Form.Item>
    </Form>
    </Modal>
    {!isLoadingTable ? (
    <Table
          dataSource={AdvertiserList}
          columns={columns}
          rowKey="id"
      />
    ) : (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
    <Spin size="large" />
    </div>
    )}
  </div>
);
};

export default ADvertiser;









          


































































































































































































/*import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Spin, Button, Modal, Form, Input, Space } from "antd";
import { RootState, useAppDispatch } from "../../../src/storeA";
import {
  getAdvertiser,
  addAvertiser,
  deleteadvertiser,
  updateAdvertiser,
} from "../Advertiser/advertiserApi";
import type { Advertiser} from "../../model/advertiserM";

const Adver: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingadvertiser, setEditingadvertiser] = useState<
      Advertiser | undefined
    >(undefined);
    const [advertiser, setAdvertiser] = useState<Advertiser>({
      id: 0,
      name: "",
      act_id:0
    });
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(getAdvertiser());
    }, [dispatch]);
  
    const businessAdvertiserList= useSelector(
      (state: RootState) => state.advertiser.values
    );
    const isLoadingTable = useSelector(
      (state: RootState) => state.advertiser.isLoading
    );
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const columns = [    {      title: "ID",      dataIndex: "id",      key: "id",    },{      title: "Name",      dataIndex: ["user", "name"],      key:  "user.name",},{title:"email",dateIndex:["user","email"],key:"user.email"},{      title: "activity_id",      dataIndex: "act_id",      key: "act_id",    },  {      title: "Activity_Name",      dataIndex: "act_name",      key: "act_name",    },     {      title: "Actions",      key: "actions", 
    render: (text: any, record: Advertiser) => (
        <Space>
          <Button
            onClick={() => {
              form.resetFields();
              console.log(record);
              setEditingadvertiser({
                id: record.id,
                email: record.user.email,
                password: record.password
                name: record.user.name,
                phone:record.user.phone,
                address: record.user.address,
                status:
                
              });
              setIsModalOpen(true);
            }}
          >
             Edit
      </Button>
      <Button type="primary" danger 
      onClick={() =>handleInactif(record)}
      >
        Inactif
      </Button>
    </Space>
  ),
},
];
      */      
    
    
    
    /* render: (text: any, record: Advertiser) => (        <>          <Button            onClick={() => {              setEditingadvertiser(record);              setIsModalOpen(true);            }}          >            Edit          </Button>          <Button type="primary" danger onClick={() => handleDelete(record.id)}>            Delete          </Button>        </>      ),    },  ];*/
  
  /*  const handleSubmit = () => {
      console.log(advertiser);
      dispatch(addAvertiser(advertiser)).then(() => {
        dispatch(getAdvertiser());
      });
    };
  
    const handleCreate = (data: Advertiser) => {
      console.log(data);
      const id=Math.round(Math.random()*10000)
      let id2=Math.round(Math.random()*10000)
        setAdvertiser({
          id: id,
          email: data.email,
          password: data.password,
          name: data.name,
          phone: data.phone,
          address: data.address,
          status:"1"
        });
      handleSubmit();
      setIsModalOpen(false);
    };
  
    const handleEdit = (data: Advertiser) => {
      console.log(data);
      dispatch(updateAdvertiser
        (data.id)).then(() => {
        dispatch(getAdvertiser());
        setIsModalOpen(false);
      });
    };
  
    const handleDelete = (id: number) => {
      console.log(id);
      dispatch(deleteadvertiser(id)).then(() => {
        dispatch(getAdvertiser());
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
      setEditingadvertiser(undefined);
      setAdvertiser({ id: 0, name: "",act_id:0 });
      form.resetFields();
    };
  
    const [form] = Form.useForm();
  
    return (
      <div>
        <Button type="primary" onClick={showModal}>
          Ajouter un advertiser
        </Button>
        <Modal
          width={800}
          title="advertiser Informations"
          open={isModalOpen}
          onCancel={handleOkOrCancel}
          onOk={handleOkOrCancel}
        >
          <Form
            {...formItemLayout}
            form={form}
            name="ajouter"
            onFinish={editingadvertiser ? handleEdit : handleCreate}
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
        {editingadvertiser ? "Update" : "Add"}
      </Button>
    </Form.Item>
  </Form>
</Modal>
        {!isLoadingTable ? (
    <Table
        dataSource={businessAdvertiserList}
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
export default Adver;

function handleInactif(record: any): void {
    throw new Error("Function not implemented.");
}*/
