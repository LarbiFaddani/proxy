import React, { useEffect,useState } from "react";
import {  TimePicker } from 'antd';
import { useSelector } from "react-redux";
import { Table, Spin, Tag, Button, Modal, Form, Input, Space,Switch, Steps, } from "antd";
import { RootState, useAppDispatch } from "../../../../store";
import { getBusiness, addBusiness, updateBusiness } from "./businessApi";
import { getLocation } from "../Location/locationApi";
import type {IBusiness} from 'src/models/Business';
import type { ILocation } from "src/models/location";
import Select from "antd/es/select";
import { getBusinessActivity } from "../businessActivity/businessActivityApi";
import { getBusinessType } from "../businessType/businessTypeApi";
import { addPlacement, updatePlacement} from "../Placement/placementApi";
import { Cascader } from 'antd';
import { getSchedule } from "src/pages/features/BO/Schedule/scheduleApi";
import type {BusinessType} from 'src/models/BusinessType'
import "./business.css"
import type {ISchedule} from "src/models/schedule";
//import type { IPlacement } from "src/models/placement";
import { addSchedule, deleteSchedule } from 'src/pages/features/BO/Schedule/scheduleApi';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Checkbox from "antd/es/checkbox";
const Business: React.FC = () => {
  const [isModalOpen, setIsModalOpen]=useState<boolean>(false)
  const [isInactif, setIsInactif]=useState<boolean>(false)
  const [isModalMoreOpen, setIsModalMoreOpen]=useState<boolean>(false)
  const [editingBusiness, setEditingBusiness] = useState<IBusiness | undefined>(undefined);
  const [editStatus, setEditStatus] = useState<any>(undefined);
  const [placement, setPlacement] = useState<any>()
  const [emailExists, setEmailExists] = useState(false);
  const [part, setPart] = useState(1);
  const [businessId, setBusinessId] = useState<number>(0)
  const [step, setStep] = useState<number>(0);
  const stepConst = <Steps
    size="small"
    current={step}
    items={[
      { title: 'Business infos' },
      {
        title: 'Emplacement'
      },
      {
        title: 'Horaire'
      },
    ]}
  />


  // const [required, setRequired] = useState<boolean>(true);
  //const [selectedBusinessId, setSelectedBusinessId] = useState<number>(0);
  const daysOfWeek = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];
  const [inputHours, setInputHours] = useState<{ [key: string]: boolean }>({});
  const [open, setOpen] = useState<string>("");
  const [close, setClose] = useState<string>("");
  const [hours, setHours] = useState<any>({});
  const [button, setButton] = useState<boolean>(false);
  
  const handleChecked = (e: CheckboxChangeEvent, dayName:string) => {
    setInputHours({
      ...inputHours,
      [dayName]: e.target.checked
    });
    setHours({
      ...hours,
      [dayName]: []
    });
  };
  const handleHoursSubmit = (e: React.FormEvent<HTMLFormElement>, dayName:string) => {
    e.preventDefault();
    const updatedHours = [...hours[dayName], { opening_hour: open, closing_hour: close }];
    setHours({
      ...hours,
      [dayName]: updatedHours
    });
    setOpen('');
    setClose('');
    setButton(true);
  };
  const handleScheduleSubmit = (e:any) => {
    e.preventDefault();
    {editingBusiness&&dispatch(deleteSchedule(editingBusiness.id));}
    daysOfWeek.forEach(day => {
      if (hours[day]) {
        hours[day].forEach((hour:any) => {
          {editingBusiness&&dispatch(addSchedule({
            opening_hour: hour.opening_hour,
            closing_hour: hour.closing_hour,
            day: day,
            business_id: editingBusiness.id
          })).then(() => {
            dispatch(getBusiness());
           });}
        });
      }
    });
    daysOfWeek.forEach(day => {
      if (hours[day]) {
        hours[day].forEach((hour:any) => {
          dispatch(addSchedule({
            opening_hour: hour.opening_hour,
            closing_hour: hour.closing_hour,
            day: day,
            business_id: businessId
          })).then(() => {
            dispatch(getBusiness());
           });
        });
      }
    });
    setInputHours({});
    setButton(false);
    setHours({});

  }
  const handleOpenTimeChange = (time: any) => {
    setOpen(time.format('HH:mm:ss'));
  }
  const handleCloseTimeChange = (time: any) => {
    setClose(time.format('HH:mm:ss'));
  }
  const isLoadingSchedule = useSelector(
    (state: RootState) => state.schedule.isLoading
    );
  const isSubmitSchedule = useSelector(
    (state: RootState) => state.schedule.isSubmit
    );
  const isRejectedSchedule = useSelector(
    (state: RootState) => state.schedule.isRejected
    );



  const handleNextAndCreateBusiness = () => {
      const id = Math.round(Math.random() * 10000);
      setBusinessId(id);
      const { confirm, location_id, ...rest } = form.getFieldsValue();
      const valuesWithStatus = { ...rest, id: id, status: 1, location_id: parseInt(location_id[1]) }; // transform location_id value
      dispatch(addBusiness(valuesWithStatus));
       setPart(part + 1);
       setStep(step + 1);
      };
  const handleCreatePlacement = (data:any) => {
    setPlacement({name:data.placement, business_id:businessId})
    setPart(part + 1);
    setStep(step + 1);
  };
  useEffect(() => {
    dispatch(addPlacement(placement)).then(() => {
      dispatch(getBusiness());
     });
  }, [
    placement
  ]);
  const renderForm2 = () => {
    switch (part) {
      case 1:
    return (
      <div>
        <Space>
      <Button onClick={()=>setPart(1)}>Business</Button>
      <Button onClick={()=>setPart(2)}>Placement</Button>
      <Button onClick={()=>setPart(3)}>Schedule</Button>
        </Space>
        <p><span className="keyMoreInfos">Name</span>: {editingBusiness && editingBusiness.name}</p>
        <p><span className="keyMoreInfos">Address: </span>{editingBusiness && editingBusiness.address}</p>
        <p><span className="keyMoreInfos">Phone: </span>{editingBusiness && editingBusiness.phone}</p>
        <p><span className="keyMoreInfos">Role: </span>{editingBusiness && editingBusiness.role}</p>
        <p><span className="keyMoreInfos">Region: </span>{editingBusiness && editingBusiness.region}</p>
        <p><span className="keyMoreInfos">City: </span>{editingBusiness && editingBusiness.city}</p>
        <p><span className="keyMoreInfos">Secteur: </span>{editingBusiness && editingBusiness.secteur}</p>
        <p><span className="keyMoreInfos">Type de commerce: </span>{editingBusiness && editingBusiness.business_type_id}</p>
        <p><span className="keyMoreInfos">Activité de commerce: </span>{editingBusiness && editingBusiness.business_activity_id}</p>
        
      </div>
    );
    case 2:
      return(
    <>
    <Space>
      <Button onClick={()=>setPart(1)}>Business</Button>
      <Button onClick={()=>setPart(2)}>Placement</Button>
      <Button onClick={()=>setPart(3)}>Schedule</Button>
    </Space>
    <p><span className="keyMoreInfos">Placement: </span>{editingBusiness && editingBusiness.placement}</p>
        </>);
    case 3:
      return(<>
      <Space>
        <Button onClick={()=>setPart(1)}>Business</Button>
        <Button onClick={()=>setPart(2)}>Placement</Button>
        <Button onClick={()=>setPart(3)}>Schedule</Button>
      </Space>
      {editingBusiness?.schedule && (() => {
  let previousDay = '';
  return editingBusiness.schedule.map((schedule: any) => {
    let currentDay = schedule.day;
    let displayDay = currentDay !== previousDay;
    previousDay = currentDay;
  
    return (
      <div key={schedule.id}>
        {displayDay && <p className="keyMoreInfosBlue">{currentDay}</p>}
        <span className="keyMoreInfosDu">DU: </span>
        <span>{schedule.opening_hour}</span>
        <span className="keyMoreInfos"> À: </span>
        <span>{schedule.closing_hour}</span>
      </div>
    );
  })
})()}
</>)
    default:return 1}
  }
  const renderForm = () => {
    switch (part) {
    case 1:
    return (
    <>
    {editingBusiness &&
    <Space>
      <Button onClick={()=>setPart(1)}>Business</Button>
      <Button onClick={()=>setPart(2)}>Placement</Button>
      <Button onClick={()=>setPart(3)}>Schedule</Button>
    </Space>}
    <div className="steps">
    {!editingBusiness && stepConst}
  </div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        initialValues={editingBusiness}
        onFinish={editingBusiness ? handleEdit : handleNextAndCreateBusiness}
        style={{ maxWidth: 600 }}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Nom"
          tooltip="Comment vous appelez les autres?"
          rules={[{ required: true, message: 'Veuillez entrer votre nom!', whitespace: true }]}
        >
          <Input />
        </Form.Item>
  <Form.Item
      name="email"
      label="Email"
      rules={[{type: 'email',message: 'The input is not a valid email!', },{ required: true, message: 'Please input your email!',},{ validator: checkEmailExists }, ]}
      validateStatus={emailExists ? "error" : ""}
      help={emailExists ? "Email already exists in the table!" : ""}
    >
      <Input />
    </Form.Item>
    {editingBusiness ? null :
    <Form.Item
      name="password"
      label="Mot de passe"
      rules={[{required: true,message: 'Veuillez entrer votre mot de passe!',},{
      pattern: /^.{5,}$/,
      message: 'mot de passe doit avoir au min 5 caracteres',
    }]}
      hasFeedback
    >
      <Input.Password />
    </Form.Item>}
    {editingBusiness?null:
    <Form.Item
      name="confirm"
      label="Conf. du mot de passe"
      dependencies={['password']}
      hasFeedback
      rules={[{required: true,message: 'Please confirm your password!',},
      ({ getFieldValue }) => ({validator(_, value) { 
        if (!value || getFieldValue('password') === value) { return Promise.resolve();} 
          return Promise.reject(new Error('The two passwords that you entered do not match!'));
        },}),
      ]}
    >
      <Input.Password />
    </Form.Item>}
    <Form.Item
      name="phone"
      label="Téléphone"
      rules={[{ required: true, message: 'Veuillez entrer votre téléphone!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      name="address"
      label="Adresse"
      rules={[{ required: true, message: 'Veuillez entrer votre adresse!' }]}
    >
      <Input.TextArea showCount maxLength={250} />
    </Form.Item>

    <Form.Item
      name="altitude"
      label="Altitude"
      rules={[{ required: true, message: 'Veuillez entrer votre altitude!' }]}
    >
      <Input type="number" />
    </Form.Item>

    <Form.Item
      name="longitude"
      label="Longitude"
      rules={[{ required: true, message: 'Veuillez entrer votre longitude!' }]}
    >
      <Input type="number" />
    </Form.Item>

    <Form.Item
      name="location_id"
      label="Location"
      rules={[{ required: true, message: 'Veuillez selectionner une location!' }]}
    >
      <Cascader options={citySectorsMap} onChange={onChangeDeux} />
    </Form.Item>
    <Form.Item
      name="business_type_id"
      label="Business Type:"
      rules={[{ required: true, message: 'Veuillez selectionner un business type!' }]}
    >
      <Select>
    {businessTypeList.map((item: BusinessType) => (
      <Select.Option key={item.id} value={item.id}>
        {item.name}
      </Select.Option>
    ))}
  </Select>
    </Form.Item>
    <Form.Item
      name="business_activity_id"
      label="Business Activity:"
      rules={[{ required: true, message: 'Veuillez selectionner un business activity!' }]}
    >
      <Select>
    {businessActivityList.map((item: BusinessType) => (
      <Select.Option key={item.id} value={item.id}>
        {item.name}
      </Select.Option>
    ))}
  </Select>
    </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">{editingBusiness ? "MAJ" : "NEXT"}</Button>
        </Form.Item>
      </Form>
      
    </>
    );
    case 2:
    return (
    <>
    {editingBusiness &&
    <Space>
      <Button onClick={()=>setPart(1)}>Business</Button>
      <Button onClick={()=>setPart(2)}>Placement</Button>
      <Button onClick={()=>setPart(3)}>Schedule</Button>
    </Space>}
    <div className="steps">
    {!editingBusiness && stepConst}
  </div>
    <Form
    {...formItemLayout}
    form={form}
    name="register"
    initialValues={editingBusiness}
    onFinish={editingBusiness ? handleEditPlacement : handleCreatePlacement}
    style={{ maxWidth: 600 }}
    scrollToFirstError
  >
    <Form.Item
      name="placement"
      label="nom d'emplacement"
      tooltip="Quel est votre emplacement?"
      rules={[{ required: true, message: 'Please enter a placement!'},{message: 'The input is not a valid name!'}]}
      >
      <Input />
  </Form.Item>
  
  <Space>
    {!editingBusiness?<Button type="primary" htmlType="submit">Next</Button>:<Button type="primary" htmlType="submit">MAJ</Button>}
  </Space>
</Form>

    </>
    );
    case 3:
    return (
    <>
    {editingBusiness &&
    <Space>
      <Button onClick={()=>setPart(1)}>Business</Button>
      <Button onClick={()=>setPart(2)}>Placement</Button>
      <Button onClick={()=>setPart(3)}>Schedule</Button>
    </Space>}
    <div className="steps">
    {!editingBusiness && stepConst}
  </div>
  <div style={{textAlign: "center", padding:"4em"}}>
      {daysOfWeek.map(day => (
        <div key={day} style={{ fontWeight:"bold" }}>
          <Checkbox onChange={(e) => handleChecked(e, day)}>{day}</Checkbox>
          {inputHours[day] && (
            <div>
              <form onSubmit={(e) => handleHoursSubmit(e, day)}>
                <Space>
                  <TimePicker placeholder='Opening Hour'  onChange={handleOpenTimeChange} />
                  <TimePicker placeholder='Closing Hour'  onChange={handleCloseTimeChange} />
                  {open&&close?<Button type="primary" htmlType="submit">Ok</Button>:null}
                </Space>
              </form>
              {hours[day] && hours[day].length > 0 && (
                <div>
                  {hours[day].map((hour: any, index: number) => (
                    <div key={index}>{hour.opening_hour} - {hour.closing_hour}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
      <div style={{ marginTop:"10vh" }}>
        {isLoadingSchedule?<span style={{textAlign: "center", fontWeight:"bold", color:"orange"}}>Schedule en cours d'envoie</span>:null}
        {isSubmitSchedule?<span style={{textAlign: "center", fontWeight:"bold", color:"green"}}>Schedule a été envoyé avec succès</span>:null}
        {isRejectedSchedule?<span style={{textAlign: "center", fontWeight:"bold", color:"red"}}>Echec d'envoie</span>:null}
      </div>  
      {Object.keys(hours).length > 0 && (
          <div>
            <h3>Selected Hours</h3>
            <div>
              {daysOfWeek.map(day => (
                hours[day] && hours[day].length > 0 && (
                  <div className="day" key={day}>
                    <span className="day-name">{day}:</span>
                    <div className="hours">
                      {hours[day].map((hour: any, index: number) => (
                        <div className="hour" key={index}>
                          {hour.opening_hour} - {hour.closing_hour}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
            {button?
            <form onSubmit={handleScheduleSubmit}>
              <Button type="primary" htmlType="submit">Submit Schedule</Button>
            </form>:null}
            <span>{open} - {close}</span>
          </div>
        )}
    </div>
    </>
    );
    default:
    return 1;
    }
    };
const dispatch = useAppDispatch();
useEffect(() => {
    dispatch(getBusiness());
  }, [dispatch]);
useEffect(() => {
    dispatch(getLocation());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBusinessActivity());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getBusinessType());
  }, [dispatch]);
  interface Option {
    value: string;
    label: string;
    children?: Option[];
  }
const businessList = useSelector(
(state: RootState) => state.business.values
);
const businessSchedule = useSelector(
  (state: RootState) => state.schedule.values
  );
const businessTypeList:BusinessType[] = useSelector(
  (state: RootState) => state.businessType.values
  );
const businessActivityList = useSelector(
    (state: RootState) => state.businessActivity.values
);
const locationList = useSelector(
  (state: RootState) => state.location.values
  );
  const checkEmailExists = async (rule:any, value: any) => {
    const exists = businessList.some(
      (business:any) => business.user.email === value
    );
    setEmailExists(exists);
    if (exists&&!editingBusiness) {
      throw new Error("Email already exists in the table!");
    }
  };
  const citySectorsMap: Option[] = Object.entries(locationList.reduce((acc: any, location: ILocation) => { 
    let city = location.city.toUpperCase();
    if (!acc[city]) {
      acc[city] = {
        value: city,
        label: `Ville: ${city}`,
        children: []
      };
    }
    if (!acc[city].children.some((sector: Option) => sector.value === location.secteur)) {
      acc[city].children.push({
        value: location.id.toString(),
        label: `Secteur: ${location.secteur}`
      });
    }
    return acc;
  }, {})).map(([_, value]: [string, any]) => value);
 
  const onChangeDeux = (value: any) => {
  };
  const onChange = (checked: boolean) => {
    setIsInactif(!isInactif)
  };
  
  const handleInactif = (record: any) => {
    if(isInactif===true){setEditStatus({
      id: record.id,
      status: "0"
    });}else{
      setEditStatus({
        id: record.id,
        status: "1"
      });
    }
  };
  useEffect(() => {
      dispatch(updateBusiness(editStatus)).then(() => {
       dispatch(getBusiness());
      });
  }, [
    isInactif,editStatus,dispatch
  ]);
const isLoadingTable = useSelector(
(state: RootState) => state.business.isLoading
);
const showModal = () => {
    setIsModalOpen(true);
  };
  const handleEditPlacement = () => {
    const values = form.getFieldsValue();
    values["name"] = values["placement"];
    delete values["placement"];
    {editingBusiness&&
    dispatch(updatePlacement({...values, business_id:editingBusiness.id, id:editingBusiness.placement_id})).then(() => {
      dispatch(getBusiness());
      setIsModalOpen(false);
    });
  };
  }
  const handleEdit = () => {
    const values = form.getFieldsValue();
    if (editingBusiness && editingBusiness.id) {
      values.id = editingBusiness.id;
      values.location_id = values.location_id[1]; // <-- changer la valeur de location_id
      dispatch(updateBusiness(values)).then(() => {
        dispatch(getBusiness());
        setIsModalOpen(false);
        form.resetFields();
      });
    }
  };
  
const showModalMore = (record:any) => {
  setIsModalMoreOpen(true);
  console.log(record)
  setEditingBusiness({
    name: record.user.name,
    address:record.user.address,
    phone:record.user.phone,
    role:record.user.role,
    region:record.location.region,
    city:record.location.city,
    secteur:record.location.secteur,
    business_type_id:record.business_type.name,
    business_activity_id:record.business_activity.name,
    placement:record.placement[0].name,
    schedule:record.schedule,
    id:record.id
  })
};
useEffect(() => {
  if (isModalOpen && editingBusiness) {
    form.setFieldsValue({
      location_id: editingBusiness.location_id,
      altitude: editingBusiness.altitude,
      longitude: editingBusiness.longitude,
      email: editingBusiness.email,
      password: editingBusiness.password,
      name: editingBusiness.name,
      phone: editingBusiness.phone,
      address: editingBusiness.address,
      business_type_id: editingBusiness.business_type_id,
      business_activity_id: editingBusiness.business_activity_id,
      placement: editingBusiness.placement,
      placement_id: editingBusiness.placement_id,
    });
    // {editingBusiness&&setBusinessId(editingBusiness.id);}
  }
}, [isModalOpen]);

useEffect(() => {
  if (isModalOpen && !editingBusiness) {
    form.setFieldsValue({
      location_id: "",
      altitude: "",
      longitude: "",
      email: "",
      password: "",
      name:"" ,
      phone: "",
      address: "",
    });
  }
}, [isModalOpen]);
const columns = [
{
title: "#ID",
dataIndex: "id",
key: "id",
},
{
title: "NOM",
dataIndex: ["user", "name"],
key: "user.name",
},
{
  title: "ALTITUDE",
  dataIndex: "altitude",
  key: "altitude",
  },
{
title: "LONGITUDE",
dataIndex: "longitude",
key: "longitude",
},
{
title: "EMAIL",
dataIndex: ["user", "email"],
key: "user.email",
},
{
title: "VILLE DE LOCATION",
dataIndex: ["location", "city"],
key: "location.city",
},
{
title: "SECTEUR DE LOCATION ",
dataIndex: ["location", "secteur"],
key: "location.secteur",
},
{
  title: "STATUS",
  dataIndex: ["user", "status"],
  key: "user.status",
  render:(status:string)=>{
    return <p>{status==="1" ? <Tag color="green">actif</Tag>:<Tag color="#f50">inactif</Tag>}</p>
  }
},
{
  title: "Actions",
  key: "actions",
  render: (text: any, record: any) => (
    <Space>
      <Button onClick={(e)=>{e.preventDefault();showModalMore(record)}}>More</Button>
      <Button
        onClick={() => {
          setEditingBusiness({
               id: record.id,
               altitude: record.altitude,
               longitude: record.longitude,
               email: record.user.email,
               password:"",
               name: record.user.name,
               phone:record.user.phone,
               address: record.user.address,
               location_id:record.location_id,
               business_type_id: record.business_type_id,
               business_activity_id: record.business_activity_id,
               placement:record.placement[0].name,
               placement_id:record.placement[0].id
              });
            showModal();
            setPart(1);
          }}
      >
        Edit
      </Button>
      <Switch
  onChange={(checked) => { onChange(checked); handleInactif(record);}}
  defaultChecked={record.user.status === "1" ? true : false}/>
  </Space>
  ),
},
];


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
  form.resetFields();
  setEditingBusiness(undefined);
  setPart(1);
  setStep(0)
};
const handleOkOrCancelMore = () => {
  setIsModalMoreOpen(false);
  setPart(1);
};
const [form] = Form.useForm();
return (
  <div>
    <Button style={{ margin:15 }} type='primary' onClick={showModal}>Ajouter un business</Button>
    <Modal title="More infos" open={isModalMoreOpen} onOk={handleOkOrCancelMore} onCancel={handleOkOrCancelMore}>
      {renderForm2()}
    </Modal>

    <Modal width={800} style={{ marginBottom:165 }} title="Business Informations" open={isModalOpen} 
    onOk={handleOkOrCancel} onCancel={handleOkOrCancel}
    >{renderForm()}
          
    </Modal>
    {!isLoadingTable ? (
    <Table
          dataSource={businessList}
          columns={columns}
          rowKey="id"
          scroll={{ x: 150 }}
      />
    ) : (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
    <Spin tip="Loading" size="large">
        <div className="content" />
    </Spin>
    </div>
    )}
  </div>
)
};
export default Business;