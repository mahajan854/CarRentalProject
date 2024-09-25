import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../../features/authSlice";
import { loginUser as loginUserApi } from "../../services/admin.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const eyeIcon = showPassword ? faEyeSlash : faEye;

  const loginUser = async (e) => {
    e.preventDefault();
    if (email.length === "") {
      toast.error("Please enter email");
    } else if (password.length === "") {
      toast.error("Please enter password");
    } else {
      // call register api
      const response = await loginUserApi(email, password);
      debugger
      // parse the response
      if (response !== null) {
        // parse the response's data and extract the token
        const { id, firstName, lastName, email, mobile, branchId, branchName,token } =
          response;

        // store the token for making other apis
        sessionStorage["id"] = id;
        sessionStorage["firstName"] = firstName;
        sessionStorage["lastName"] = lastName;
        sessionStorage["email"] = email;
        sessionStorage["mobile"] = mobile;
        sessionStorage["branchId"] = branchId;
        sessionStorage["branchName"] = branchName;
        sessionStorage["token"] = token;
        dispatch(login());
        toast.success("Login Successfull");
        // update global store's authSlice with status = true
        
      } else {
        toast.error("Invalid user name or password");
      }
    }
  };
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '90vh',
    width: '100%',
  };

  return (
    <>
      <div className="login-container">
      <div className="row justify-content-center" style={containerStyle}>
        <div className="col-md-3">
          <div className="form">
          <h1 style={{ textAlign: "center" }}>Admin Login</h1>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                className="form-control"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
            <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="input-group-append">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-success"
            >
              <FontAwesomeIcon icon={eyeIcon} />
            </button>
          </div>
        </div>
            </div>
            <div className="mb-3">
              <div className="mb-3">
                Don't have an account? <Link to="/register">Register here</Link>
              </div>
              <button onClick={loginUser} className="btn btn-success">
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ToastContainer theme="colored"></ToastContainer>
    </>
    
  );
}

export default LoginUser;
