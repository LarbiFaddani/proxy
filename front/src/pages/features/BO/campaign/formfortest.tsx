// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { Form, Input, Button } from 'antd';
// //import { addData } from './dataSlice';ù
// import CampaignForm from './campaignForm';
// import BtbaForm from './btbaForm';
// import LastForm from './lastForm';

// const AddDataForm = () => {
//   const [part, setPart] = useState(1);
//   const [data, setData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: {
//       street: '',
//       city: '',
//       state: '',
//       zip: ''
//     },
//     password: '',
//     confirmPassword: '',
//     interests: ''
//   });

//   const dispatch = useDispatch();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
//   setData(prevData => ({
//     ...prevData,
//     [name]: value
//   }));
// };

 

// const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setData(prevData => ({
//       ...prevData,
//       address: {
//         ...prevData.address,
//         [name]: value
//       }
//     }));
//   };
  
//   /*
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   console.log(data);
//   dispatch(addCampaign(data));
//   setData(initialState);
//   <Button type="primary" onClick={() => handleSubmit(data)}>Add Data</Button>
// };

// */
//   const handleNext = () => {
//     setPart(part + 1);
//   };

//   const handleBack = () => {
//     setPart(part - 1);
//   };

//   const renderForm = () => {
//     switch (part) {
//       case 1:

//         return (/*
//           <>
//             <Form.Item label="Name" name="name">
//               <Input value={data.name} onChange={handleChange} />
//             </Form.Item>
//             <Form.Item label="Email" name="email">
//               <Input type="email" value={data.email} onChange={handleChange} />
//             </Form.Item>
//             <Form.Item label="Phone" name="phone">
//               <Input type="tel" value={data.phone} onChange={handleChange} />
//             </Form.Item>
//             <Form.Item label="Address">
//               <Input.Group>
//                 <Form.Item label="Street" name="street">
//                   <Input value={data.address.street} onChange={handleAddressChange} />
//                 </Form.Item>
//                 <Form.Item label="City" name="city">
//                   <Input value={data.address.city} onChange={handleAddressChange} />
//                 </Form.Item>
//                 <Form.Item label="State" name="state">
//                   <Input value={data.address.state} onChange={handleAddressChange} />
//                 </Form.Item>
//                 <Form.Item label="ZIP" name="zip">
//                   <Input value={data.address.zip} onChange={handleAddressChange} />
//                 </Form.Item>
//               </Input.Group>
//             </Form.Item>
//             <Button type="primary" onClick={handleNext}>Next</Button>
//           </>*/<><CampaignForm onSave={function (values: Campaign): void {
//             throw new Error('Function not implemented.');
//           } }/> <Button type="primary" onClick={handleNext}>Next</Button></>
//         );
//       case 2:
//         return (/*
          
//             <Form.Item label="Password" name="password">
//               <Input.Password value={data.password} onChange={handleChange} />
//             </Form.Item>
//             <Form.Item label="Confirm Password" name="confirmPassword">
//               <Input.Password value={data.confirmPassword} onChange={handleChange} />
//             </Form.Item>
//             <Button onClick={handleBack}>Back</Button>*/
//            <><BtbaForm/> 
//            <Button onClick={handleBack}>Back</Button> <Button type="primary" onClick={handleNext}>Next</Button>
//           </>
//         );
//       case 3:
//         return (/*
//           <>
//             <Form.Item label="Interests" name="interests">
//               <Input.TextArea value={data.interests} onChange={handleChange} />
//             </Form.Item>
//             <Button onClick={handleBack}>Back</Button>
            

//           </>*/<><LastForm/><Button onClick={handleBack}>Back</Button></>
//         )
//        default:
//         return 1;
//     }
//   };

//   return (
//     <form>
//       {renderForm()}
//     </form>
//   );
// }
// export default  AddDataForm;
import React from 'react'

function formfortest() {
  return (
    <div>formfortest</div>
  )
}

export default formfortest