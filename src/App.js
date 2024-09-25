import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { login } from './features/authSlice'
import SideBar from "./components/sidebar/SideBar";
import Content from "./components/content/Content";
import LoginUser from "./components/content/loginUser";
import Unauthorized from "./components/content/UnauthorisedAccess";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css'
import "./App.css";
import RegisterUser from "./components/content/registerUser";

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const loginStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    if (sessionStorage['email']) {
      dispatch(login())
    }
  }, [])
  return (
    <>
      <Router>
      { loginStatus ? 
        <div className="App wrapper">
          <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
          <Content
            toggleSidebar={toggleSidebar}
            sidebarIsOpen={sidebarIsOpen}
          />
        <ToastContainer theme="colored"/>
        </div> 
        :<Routes> 
          <Route exact path="/" element={<LoginUser />} />
          <Route exact path="/register" element={<RegisterUser />} />
          <Route exact path="*" element={<Unauthorized />} /> 
         </Routes> 
      }
    </Router>
    </>
  );
};

export default App;
