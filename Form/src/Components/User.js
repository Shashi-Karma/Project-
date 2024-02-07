import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import '../App.css'

const User = () => {
  const [user, setUser] = useState({
    name: "",
    Class: "",
    email: "",
    Phone: "",
    Address: ""
  });
  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(
      `https://6391cc88ac688bbe4c52e6b2.mockapi.io/test/${id}`
    );
    setUser(res.data);
  };
  return (
   
      <><div className="container4">
      <div className="box">
      
      
        <h4>
            <h4 className="user">User Id: {id -1}</h4>
      <ul className="list-group ">
        <li className="list-group-item">Name: {user.name}</li>
        <li className="list-group-item">Class: {user.Class}</li>
        <li className="list-group-item">Email: {user.email}</li>
        <li className="list-group-item">Phone: {user.Phone}</li>
        <li className="list-group-item">Address: {user.Address}</li>
      </ul>
      </h4>
      <Link className="btn btn-primary" to="/">
        Home
      </Link>
      </div>
      </div>
     
      </>
  );
};

export default User;
