import axios from "axios";
import { createUrl, log } from "../utils/utils";
import axiosInstance from "../AxiosIntercepter";

// const instance = axios.create({
//   headers:{'Authorization':'Bearer '+ sessionStorage.getItem('token'), 
//                 'Accept' : 'application/json',
//                 'Content-Type': 'application/json'}
// });

export async function registerUser(
  firstName,
  lastName,
  email,
  mobile,
  password,
  branchId
) {
  const url = createUrl("/admin/register");
  const body = {
    firstName,
    lastName,
    email,
    mobile,
    password,
    branchId  
  };

  // wait till axios is making the api call and getting response from server
  try {
    const response = await axiosInstance.post(url, body);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function loginUser(email, password) {
  const url = createUrl("/admin/signIn");
  const body = {
    email,
    password,
  };
  debugger
  // wait till axios is making the api call and getting response from server
  try {
    const response = await axios.post(url, body);
    debugger
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function editProfile(user) {
  const url = createUrl('/admin/editProfile')
  const body = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    mobile: user.mobile,
  };
  // wait till axios is making the api call and getting response from server
  try {
    const response = await axiosInstance.post(url, body);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function changePassword(cred) {

  const url = createUrl('/admin/changePassword')
  const body = {
    id: cred.id,
    password: cred.newpassword,
  };
  // wait till axios is making the api call and getting response from server
  try {
    const response = await axiosInstance.post(url, body);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function getAdminDetails(id) {

  const url = createUrl(`/admin/get/${id}`)

  // wait till axios is making the api call and getting response from server
  try {

    const response = await axiosInstance.get(url)
    log(response.data)
    return response.data
  } catch (ex) {

    log(ex)
    return null
  }
}
