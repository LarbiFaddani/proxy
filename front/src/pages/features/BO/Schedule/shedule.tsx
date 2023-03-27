import { Checkbox, TimePicker, Space, Select } from 'antd';
import Button from 'antd/es/button';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
//import Form from 'antd/es/form';
import type React from 'react'
import "./schedule.css"
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/store';
import { getBusiness } from '../Business/businessApi';
import { addSchedule, deleteSchedule } from './scheduleApi';
const Schedule: React.FC = () => {
  const [required, setRequired] = useState<boolean>(true);
  const [selectedBusinessId, setSelectedBusinessId] = useState<number>(0);
  const daysOfWeek = ["LUNDI", "MARDI", "MERCREDI", "JEUDI", "VENDREDI", "SAMEDI", "DIMANCHE"];
  const [inputHours, setInputHours] = useState<{ [key: string]: boolean }>({});
  const [open, setOpen] = useState<string>("");
  const [close, setClose] = useState<string>("");
  const [hours, setHours] = useState<any>({});
  const [button, setButton] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBusiness());
  }, [dispatch]);
  const BusinessList = useSelector(
    (state: RootState) => state.business.values
    );
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
    dispatch(deleteSchedule(selectedBusinessId));
    daysOfWeek.forEach(day => {
      if (hours[day]) {
        hours[day].forEach((hour:any) => {
          dispatch(addSchedule({
            opening_hour: hour.opening_hour,
            closing_hour: hour.closing_hour,
            day: day,
            business_id: selectedBusinessId
          }));
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
  return (
  <>
    <div style={{textAlign: "center", padding:"4em"}}>
    {required&&<div style={{ color:"green" , fontWeight:"bolder"}}>Selectionnez le business concerené par le schedule svp:</div>}
    <span style={{ justifyContent:"center", display:"flex" }}>
    <Select
      style={{ width: '20em'}}
      onChange={(value: number) => {setSelectedBusinessId(value);setRequired(false)}}
      placeholder="--Selectioner un business--"
    >
      {BusinessList.map((business:any)=>
            <Select.Option key={business.id} value={business.id}>
              <div>Business name: {business.user.name}</div>
              <div>Business email: {business.user.email}</div>
              <div>Location city: {business.location.city}</div>
            </Select.Option>
      )}
    </Select></span>
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
              {!required&&<Button type="primary" htmlType="submit">Submit Schedule</Button>}
            </form>:null}
            <span>{open} - {close}</span>
          </div>
        )}
    </div>
  </>
);
};
export default Schedule;
