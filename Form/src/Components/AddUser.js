import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import '../App.css'
import background from '../Components/background.png'
import { Formik, Form } from "formik";
import * as Yup from "yup";


const Home = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState([]);
  const [toggleSubmit, setToggleSubmit] =useState(true);
  const [EditItem, setEditItem] =useState(null);
  const [inputData, setInputData] = useState({});
  const [name,setName]=useState("");
  const [Class,setClass]=useState("");
  const [email,setEmail]=useState("");
  const [Phone,setPhone]=useState("");
  const [Address,setAddress]=useState("");

    const onSubmit = async (e) => {
       
        let inputData={name,Class,email,Phone,Address}
    console.warn(inputData);
    
      e.preventDefault();
      
     fetch("https://6391cc88ac688bbe4c52e6b2.mockapi.io/test", {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(inputData)
      })
        .then((result) => {
        result.json().then((resp) => {
          console.warn(resp)
          loadUsers();
          
          // setUser([User]);
          
        })})
        // if (!inputData) {
        //   alert('plzz fill data');
        // } else{
        //     const allData = { id: new Date().getTime().toString(), ...inputData}
        //     setUser([...User, allData]);
            
        //     setEditItem(allData.id)
        // }
        setName('');
        setClass('');
        setEmail('');
        setPhone('');
        setAddress('');
    };

    const validate = Yup.object({
        name: Yup.string()
            .min(4, "Must be 4 charecters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        Class: Yup.string()
            .min(4, "Must be 4 charecters or more")
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        email: Yup.string()
            .email("Enter valid Email")
            .required("Email is required"),
        phone: Yup.string()
            .min(6, "Number must be at least 6 charaters")
            .required("Number is required"),
        website: Yup.string()
            .min(6, "Number must be at least 6 charaters")
            .required("Number is required")
    });
  useEffect(() => {
    loadUsers();
  }, []);


  const deleteUser = async (id) => {
    await axios.delete(
      `https://6391cc88ac688bbe4c52e6b2.mockapi.io/test/${id}`
    );
    loadUsers();
  };
  const editItem = async(id) =>{
    console.warn(id)
    let item=User[id-1];
    setName(item.name)
    setClass(item.Class)
    setEmail(item.email)
    setPhone(item.Phone)
    setAddress(item.Address)
    let newEditItem = User.find((elem) => {
    return elem.id == id
    
    });
   
    setToggleSubmit(false);
    setInputData(newEditItem);
    setEditItem(id);
    console.warn(User[id-2])
    }
  const update = async (id) => {
    let item={name,Class,email,Phone,Address,EditItem}
    console.warn("item",item);
     fetch(`https://6391cc88ac688bbe4c52e6b2.mockapi.io/test/${EditItem}`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
      
      })
        .then((result) => {
        result.json().then((resp) => {
          console.warn(resp)
          loadUsers();
          
        })})
        setName('');
        setClass('');
        setEmail('');
        setPhone('');
        setAddress('');
     
    
      
    
    
  };
  const loadUsers = async () => {
  fetch("https://6391cc88ac688bbe4c52e6b2.mockapi.io/test").then((result) => {
        result.json().then((resp) => {
        setUser(resp)
        setName(resp.name)
        setClass(resp.Class)
        setEmail(resp.email)
        setPhone(resp.Phone)
        setAddress(resp.Address)
        })
        })

};
  return (
     
      
    
    <div className="box1 p-0">
    <div className="background" style={{ backgroundImage: `url(${background})` }} > 
    <div className="container">
      <div className="row">
      <div className="container2"> 
      <div className="col">
      <Formik
            initialValues={{
                name: "",
                Class: "",
                email: "",
                Phone: "",
                Address: ""
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <div className="container8">
            <div className="box3">
                    <h2 className="text-center mb-4">Add A User</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                label="Name"
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Username"
                                name="Class"
                                value={Class}
                                onChange={(e) => setClass(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Enter Your E-mail Address"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Phone Number"
                                name="Phone"
                                value={Phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Website Name"
                                name="Address"
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        {toggleSubmit ? <button onClick={onSubmit} type="submit" className="btn btn-primary btn-block">Add User</button>: <button onClick={update}type="button"className="btn btn-warning btn-block">Update User</button>}
                        
                    </form>
                </div>
            </div>
        </Formik>
      </div></div>
      
        <div className="col">
      <table className="table">
        <thead >
          <tr>
            <th >#</th>
            <th >Name</th>
            <th >Class</th>
            <th >Email Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {User.map((elem, index) => (
            <tr key={elem.id}>
              <th >{index + 1 }</th>
              <td>{elem.name}</td>
              <td>{elem.Class}</td>
              <td>{elem.email}</td>
              <Button
                variant="outlined"
                startIcon={<RemoveRedEyeIcon />}
                color="primary"
                
                onClick={() => navigate(`/User/${elem.id}`)}
              >
                View
              </Button>
    
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                color="inherit"
                
                onClick={() => editItem(elem.id)}
              >
                Edit
              </Button>
              
              <Button variant="outlined" startIcon={<DeleteIcon />}color="secondary" onClick={() => deleteUser(elem.id)}>
              
        Delete
      </Button>
     
      
            </tr>
            
          ))}
          
        </tbody>
        
      </table>
      
      
      </div>
      </div>
    </div>
    </div>
    </div>
    
    
  );
};

export default Home;





// import React from "react";
// import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
// import { Schema } from "./Schema";
// import axios from "axios";
// import './adduser.css'

// const initialValues = {
//     name: "",
//     Class: "",
//     email: "",
//     Phone: "",
//     Address: ""
  
// };

// const AddUser = () => {
   

//   const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
//     useFormik({
//       initialValues,
//       validationSchema: Schema,
//       onSubmit: async(values, action) => {
//         await axios.post("https://6391cc88ac688bbe4c52e6b2.mockapi.io/test", values);
//         navigate('/')
//         console.log(
        
            
//           values
//         );
//         action.resetForm();
//       },
//     });
//   console.log(
   
//     errors
//   );
  

//   return (
//     <>
     
     
//       <div className="container">
        
          
                 
//                    <h2 className="text-center mb-4">Add Student</h2>
          
//                 <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="name" className="input-label">
//                       Name
//                     </label>
//                     <input
//                       type="name"
//                       autoComplete="off"
//                       className="form-control form-control-lg "
//                       name="name"
//                       id="name"
//                       placeholder="Name"
//                       value={values.name}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.name && touched.name ? (
//                       <p className="form-error">{errors.name}</p>
//                     ) : null}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="Class" className="input-label">
//                       Class
//                     </label>
//                     <input
//                       type="Class"
//                       autoComplete="off"
//                       className="form-control form-control-lg"
//                       name="Class"
//                       id="Class"
//                       placeholder="Class"
//                       value={values.Class}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.Class && touched.Class ? (
//                       <p className="form-error">{errors.Class}</p>
//                     ) : null}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="email" className="input-label">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       autoComplete="off"
//                       className="form-control form-control-lg"
//                       name="email"
//                       id="email"
//                       placeholder="Email"
//                       value={values.email}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.email && touched.email ? (
//                       <p className="form-error">{errors.email}</p>
//                     ) : null}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="Phone" className="input-label">
//                       Phone
//                     </label>
//                     <input
//                       type="Phone"
//                       autoComplete="off"
//                       className="form-control form-control-lg"
//                       name="Phone"
//                       id="Phone"
//                       placeholder="Phone"
//                       value={values.Phone}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.Phone && touched.Phone ? (
//                       <p className="form-error">{errors.Phone}</p>
//                     ) : null}
//                   </div>
//                   <div className="form-group">
//                     <label htmlFor="Address" className="input-label">
//                       Address
//                     </label>
//                     <input
//                       type="Address"
//                       autoComplete="off"
//                       className="form-control form-control-lg"
//                       name="Address"
//                       id="Address"
//                       placeholder="Address"
//                       value={values.Address}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                     />
//                     {errors.Address && touched.Address ? (
//                       <p className="form-error">{errors.Address}</p>
//                     ) : null}
//                   </div>
        
//                     <button className="btn btn-primary btn-block">Add Student</button>
                   
//                 </form>
                
                
//               </div>
             
              
         
     
//     </>
//   );
// };
// export default AddUser;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik, Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from './TextField'

const AddUser = () => {
    let navigate = useNavigate();
    const [user1, setUser1] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
    });


    const { name, username, email, phone, website } = user1;
    const onInputChange = (e) => {
        
        setUser1({ ...user1, [e.target.name]: e.target.value });
    };
   
const handleChange = (e) =>{
    const {value}= e.target;
    setFieldValue(name, value);

// }
    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("https://6391cc88ac688bbe4c52e6b2.mockapi.io/test", user1);
        navigate("/");
        
    };

    const validate = Yup.object({
        name: Yup.string()
            .min(4, "Must be 4 charecters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        username: Yup.string()
            .min(4, "Must be 4 charecters or more")
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        email: Yup.string()
            .email("Enter valid Email")
            .required("Email is required"),
        phone: Yup.string()
            .min(6, "Number must be at least 6 charaters")
            .required("Number is required"),
        website: Yup.string()
            .min(6, "Must be at least 6 charaters")
            .required("Website is required")
    });
    return (
        <Formik
            initialValues={{
                name: "",
                username: "",
                email: "",
                phone: "",
                website: ""
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                console.log(values);
            }}
        >{formik => (
            
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Add A User</h2>
                    {console.log(formik)}
                    <Form onSubmit={(user) => onSubmit(user)}>
                        <TextField label="Name" name="name" type="text" value={name} onChange={(e) => onInputChange(e)}/>
                        <TextField label="User Name" name="username" type="text"  value={username}onChange={(e) => onInputChange(e)}/>
                        <TextField label="E-mail" name="email" type="email" value={email} onChange={(e) => onInputChange(e)}/>
                        <TextField label="Phone" name="phone" type="phone"  value={phone}onChange={(e) => onInputChange(e)}/>
                        <TextField label="Website" name="website" type="text" value={website} onChange={(e) => onInputChange(e)}/>
                        <button className="btn btn-primary btn-block">Add User</button>
                    </Form>
                </div>
            </div>
        )}
        </Formik>

    );
};

export default AddUser;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { TextField } from './TextField'


const AddUser = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
    });

    const { name, username, email, phone, website } = user;
    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.post("https://6391cc88ac688bbe4c52e6b2.mockapi.io/test", user);
        navigate("/");
    };

    const validate = Yup.object({
        name: Yup.string()
            .min(4, "Must be 4 charecters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
        username: Yup.string()
            .min(4, "Must be 4 charecters or more")
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        email: Yup.string()
            .email("Enter valid Email")
            .required("Email is required"),
        phone: Yup.string()
            .min(6, "Number must be at least 6 charaters")
            .required("Number is required"),
        website: Yup.string()
            .min(6, "Number must be at least 6 charaters")
            .required("Number is required")
    });
    return (
        <Formik
            initialValues={{
                name: "",
                username: "",
                email: "",
                phone: "",
                website: ""
            }}
            validationSchema={validate}
            onSubmit={(values) => {
                console.log(values);
            }}
        >
            <div className="container">
                <div className="w-75 mx-auto shadow p-5">
                    <h2 className="text-center mb-4">Add A User</h2>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Enter Your E-mail Address"
                                name="email"
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Phone Number"
                                name="phone"
                                value={phone}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Enter Your Website Name"
                                name="website"
                                value={website}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <button className="btn btn-primary btn-block">Add User</button>
                    </Form>
                </div>
            </div>
        </Formik>
    );
};

export default AddUser;


