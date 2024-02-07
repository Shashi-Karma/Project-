import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import "../App.css";
import background from "../Components/background.png";
import { Formik, Form ,Field} from "formik";
import { Schema } from "./Schema";
import * as Yup from "yup";
import { TextField } from './TextField'
const initialValues = {
      name: "",
      Class: "",
      email: "",
      Phone: "",
      Address: ""
    
  };
const Home = () => {
  const navigate = useNavigate();
  const [User, setUser] = useState([]);
  const [EditItem, setEditItem] = useState(null);
  const [inputData, setInputData] = useState({});
  const [name, setName] = useState("");
  const [NameErr,setNameErr]=useState(false);
  const [Class, setClass] = useState("");
  const [ClassErr,setClassErr]=useState(false);
  const [email, setEmail] = useState("");
  const [EmailErr,setEmailErr]=useState(false);
  const [Phone, setPhone] = useState("");
  const [PhoneErr,setPhoneErr]=useState(false);
  const [Address, setAddress] = useState("");
  const [AddressErr,setAddressErr]=useState(false);
  const [ isEditable, setIsEditable ] = useState(false);


  const onSubmit = async (e) => {
    const inputData = { name, Class, email, Phone, Address};
    console.warn(inputData);

    e.preventDefault();
    
    if (!name ,!Class,!email, !Phone, !Address) {
      alert('plzz fill data');  
     return false;
  
  } 
  
    else if(inputData && isEditable) {
       setIsEditable(false);
       
    }

    fetch("https://6391cc88ac688bbe4c52e6b2.mockapi.io/test", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputData),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        loadUsers();

        // setUser([User]);
      });
    });
    
   
  
    //     setEditItem(allData.id)
    // }
    setName("");
    setClass("");
    setEmail("");
    setPhone("");
    setAddress("");
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
      .required("Number is required"),
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
  const editItem = async (id) => {
    setIsEditable(true);
    console.warn(id);
    let item = User[id - 1];
    setName(item.name);
    setClass(item.Class);
    setEmail(item.email);
    setPhone(item.Phone);
    setAddress(item.Address);
    let newEditItem = User.find((elem) => {
      return elem.id == id;
    });

    
    setInputData(newEditItem);
    setEditItem(id);
    console.warn(User[id - 2]);
  };
  const update = async (id) => {
    setIsEditable(false)
    let item = { name, Class, email, Phone, Address, EditItem };
    console.warn("item", item);
    fetch(`https://6391cc88ac688bbe4c52e6b2.mockapi.io/test/${EditItem}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        loadUsers();
      });
    });
    setName("");
    setClass("");
    setEmail("");
    setPhone("");
    setAddress("");
  };
  const loadUsers = async () => {
    fetch("https://6391cc88ac688bbe4c52e6b2.mockapi.io/test").then((result) => {
      result.json().then((resp) => {
        setUser(resp);
        setName(resp.name);
        setClass(resp.Class);
        setEmail(resp.email);
        setPhone(resp.Phone);
        setAddress(resp.Address);
      });
    });
  };
  const NameHandler=(e)=>{
    let item=e.target.value.replace(/[^a-z]/gi, '');
    if(!item.replace(/[^a-z]/gi, ''))
    {
      setNameErr(true)
      
    }
    else{
      setNameErr(false)
    }
    setName(item)
  }
  
  function ClassHandler(e){
    let item=e.target.value;
    if(!item.match(/^\d+/))
    {
      setClassErr(true)
      
    }
    else{
      setClassErr(false)
    }
    setClass(item)
  }
  function EmailHandler(e){
    let item=e.target.value;
    if(!item.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    {
      setEmailErr(true)
    }
    else{
      setEmailErr(false)
    }
    setEmail(item)
  }
  function PhoneHandler(e){
    let item=e.target.value;
    if(!item.match(/^\d+/))
    {
      setPhoneErr(true)
    }
    else{
      setPhoneErr(false)
    }
    setPhone(item)
  }
  function AddressHandler(e){
    let item=e.target.value;
    if(item.length<10)
    {
      setAddressErr(true)
    }
    else{
      setAddressErr(false)
    }
    setAddress(item)
  }
  return (
    <div className="box1 p-0">
      <div
        className="background"
        style={{ backgroundImage: `url(${background})` }}
      >
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
                    Address: "",
                  }}
                  validationSchema={validate}
                  onSubmit={value => {
                    console.log(value);
                  }}
                >
                  <div className="container8">
                    <div className="box3">
                      <h2 className="text-center mb-4">Add A User</h2>
                      
                      {/* <Form onSubmit={Address?onSubmit:''}> */}
                      <Form onSubmit={onSubmit}>
                        <div className="form-group">
                          <input
                            name="name"
                            label="Name"
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Name"
                            value={name}
                            // onChange={(e) => setName(e.target.value)}
                            onChange={NameHandler}
                            
                          />
                          
                          {NameErr?<span><b>Must Be Name.</b></span>:""}
                          {/* <TextField label="Name"  name="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/> */}

                      
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            pattern="[0-9]*" inputmode="numeric"
                            className="form-control form-control-lg"
                            placeholder="Enter Class"
                            name="Class"
                            value={Class}
                            // onChange={(e) => setClass(e.target.value)}
                            onChange={ClassHandler}
                            
                          />{ClassErr?<span>Must Be Number.</span>:""}
                        </div>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder="Enter E-mail Id"
                            name="email"
                            value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            onChange={EmailHandler}
                            
                          />{EmailErr?<span>Invalid Email</span>:""}
                        </div>
                        <div className="form-group">
                          <input
                            type="number"
                            pattern="[0-9]*" inputmode="numeric"
                            className="form-control form-control-lg"
                            placeholder="Enter Phone Number"
                            name="Phone"
                            value={Phone}
                            // onChange={(e) => setPhone(e.target.value)}
                            onChange={PhoneHandler}
                            
                          />{PhoneErr?<span>Must Be Number.</span>:""}
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Enter Address"
                            name="Address"
                            value={Address}
                            // 
                            onChange={AddressHandler}
                            
                          />{AddressErr?<span>Must Be More Than 10 Characters</span>:""}
                        </div>

                        {isEditable ? (
                          <button
                          onClick={update}
                          type="button"
                          className="btn btn-warning btn-block"
                        >
                          Update User
                        </button>
                        ) : (                          
                          <button
                          // onClick={onSubmit}
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Add User
                        </button>
                        )}
                      </Form>
                           
                    </div>
                  </div>
                </Formik>
              </div>
            </div>

            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Email Id</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {User.map((elem, index) => (
                    <tr key={elem.id}>
                      <th>{index + 1}</th>
                      <td>{elem.name}</td>
                      <td>{elem.Class}</td>
                      <td>{elem.email}</td>
                      <div className="actionBtnDisplay">
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

                      <Button
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        color="secondary"
                        onClick={() => deleteUser(elem.id)}
                      >
                        Delete
                      </Button>
                      </div>
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Button from "@material-ui/core/Button";
// import DeleteIcon from '@mui/icons-material/Delete';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import EditIcon from '@mui/icons-material/Edit';
// import '../App.css'
// import AddUser from "./AddUser";
// import background from '../Components/background.png'
// const Home = () => {
//   const navigate = useNavigate();
//   const [User, setUser] = useState([]);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     await axios.delete(
//       `https://6391cc88ac688bbe4c52e6b2.mockapi.io/test/${id}`
//     );
//     loadUsers();
//   };
//   const editItem = async(id) =>{
//     let newEditItem = items.find((User) => {
//         return elem.id === id
//     });
//     console.log(newEditItem);
//     setToggleSubmit(false);
//     handleChange(User.name)
//   }

//   const loadUsers = async () => {
//     const result = await axios.get(
//       `https://6391cc88ac688bbe4c52e6b2.mockapi.io/test`
//     );
//     setUser(result.data);
//   };
//   return (

//     <div className="box1 p-0">
//     <div className="background" style={{ backgroundImage: `url(${background})` }} >
//     <div className="container">
//       <div className="row">
//       <div className="container2">
//       <div className="col">
//       <AddUser/></div></div>

//         <div className="col">
//       <table className="table">
//         <thead >
//           <tr>
//             <th >#</th>
//             <th >Name</th>
//             <th >Class</th>
//             <th >Email Id</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {User.map((user, index) => (
//             <tr>
//               <th >{index + 1}</th>
//               <td>{user.name}</td>
//               <td>{user.Class}</td>
//               <td>{user.email}</td>
//               <Button
//                 variant="outlined"
//                 startIcon={<RemoveRedEyeIcon />}
//                 color="primary"

//                 onClick={() => navigate(`/User/${user.id}`)}
//               >
//                 View
//               </Button>

//               <Button
//                 variant="outlined"
//                 startIcon={<EditIcon />}
//                 color="secondary"

//                 onClick={() => navigate(`/EditUser/${user.id}`)}
//               >
//                 Edit
//               </Button>

//               <Button variant="outlined" startIcon={<DeleteIcon />}color="warning" onClick={() => deleteUser(user.id)}>

//         Delete
//       </Button>
//       <Button className="btn btn-primary btn-block" onClick={()=>editItem(elem.id)}>edit</Button>

//             </tr>
//           ))}
//         </tbody>
//       </table>

//       </div>
//       </div>
//     </div>
//     </div>
//     </div>

//   );
// };

// export default Home;
