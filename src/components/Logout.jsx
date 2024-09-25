import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from '../features/authSlice'
import { useNavigate } from "react-router";
function Logout(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutUser=()=> {
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("firstName");
        sessionStorage.removeItem("lastName");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("mobile");
        sessionStorage.removeItem("branchId");
        sessionStorage.removeItem("branchName");
        sessionStorage.removeItem("token")
        dispatch(logout())
        navigate("/")
      }
    useEffect(()=>{
        logoutUser();
    },[])
    return(<></>);
}

export default Logout;