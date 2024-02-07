import React from 'react';
import './App.css';
import Home from "./Components/Home";
// import About from "./Components/About";
// import AddUser from "./Components/AddUser";
import User from "./Components/User";
// import Contact from "./Components/Contact";
// import EditUser from "./Components/EditUser";
import NavBar from "./Components/NavBar";
// import NotFound from "./Components/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      
        {/* <NavBar /> */}
        <Routes>
          <Route exact path="/" element={<Home/>} />
          {/* <Route exact path="/adduser" element={<AddUser/>} />
          <Route exact path="/edituser/:id" element={<EditUser/>} /> */}
          <Route exact path="/user/:id" element={<User/>} />
         
        </Routes>
    
    </Router>
  );
}
