// src/components/AdminLogin.js
import React from 'react';
import styled from 'styled-components';
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { login } from '../../features/authSlice'
import { loginUser as loginUserApi } from '../../services/admin.service'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
`;

const LoginForm = styled.form`
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ForgotPasswordLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;
`;

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    // get the navigation object
    const navigate = useNavigate()
  
    // get dispatcher object
    const dispatch = useDispatch()
  
    const loginUser = async () => {
      debugger;
      if (email.length == '') {
        toast.error('Please enter email')
      } else if (password.length == '') {
        toast.error('Please enter password')
      } else {
        // call register api
        const response = await loginUserApi(email, password)
  
        // parse the response
        if (response !== null) {
          // parse the response's data and extract the token
          const { id, firstName,lastName,email, mobile, branchId, branchName } = response['data']

        // store the token for making other apis
          sessionStorage['id'] = id
          sessionStorage['firstName'] = firstName
          sessionStorage['lastName'] = lastName
          sessionStorage['email'] = email
          sessionStorage['mobile'] = mobile
          sessionStorage['branchId'] = branchId
          sessionStorage['branchName'] = branchName
  
          // update global store's authSlice with status = true
          dispatch(login())
  
          toast.success(`Welcome ${firstName} to store application`)
  
          // go back to login
          // navigate('/product-gallery')
        } else {
          toast.error('Invalid user name or password')
        }
      }
    }  
  return (
    <>
      <ToastContainer theme="colored"/>
      <Container>
        <LoginForm>
          <Title>Admin Login</Title>
          <Input type="text" placeholder="Email" onChange={(e) => {
                    setEmail(e.target.value)
                  }}/>
          <Input type="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value)
                  }}/>
          <Button onClick={loginUser}>Login</Button>
          <ForgotPasswordLink ><Link to='#'>Forgot Password??</Link></ForgotPasswordLink>
          
        </LoginForm>
      </Container>
    </>
  );
};

export default AdminLogin;
