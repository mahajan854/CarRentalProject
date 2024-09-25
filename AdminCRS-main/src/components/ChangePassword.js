import { useState } from "react";
import { toast } from "react-toastify";
import { changePassword } from "../services/admin.service";
import { useNavigate } from "react-router";
function ChangePassword() {
  const [cred, setCred] = useState({
    id: sessionStorage.getItem("id"),
    password: "",
    newpassword: "",
    renewpassword: "",
  });
  const navigate = useNavigate();
  const handlePassword = (u) => {
    setCred({ ...cred, [u.target.name]: u.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      cred.newpassword !== "" &&
      cred.password !== "" &&
      cred.renewpassword !== ""
    ) {
      if (cred.newpassword === cred.password) {
        toast.error(
          "Newly Entered Password Cannot Be Same As Old Password !!!"
        );
      } else if (cred.newpassword !== cred.renewpassword) {
        toast.error("Password Is Not Matching !!!");
      } else {
        const response = await changePassword(cred);
        if (response !== null) {
          toast.success("Password Changed Successfully !!!");
          navigate(`/profileDetails/${sessionStorage.getItem('id')}`)
        } else {
          toast.error("Internal Server Error !!!");
        }
      }
    } else {
      toast.error("Fields can not be empty!!!");
    }

  };

  return (
    <>
      <div className="col-lg-12">
        <div class="card">
          <div class="card-body pt-3">
            <form action="#" method="post">
              <div class="row mb-3">
                <label
                  for="currentPassword"
                  class="col-md-4 col-lg-3 col-form-label"
                >
                  Current Password
                </label>
                <div class="col-md-8 col-lg-9">
                  <input
                    name="password"
                    type="password"
                    class="form-control"
                    id="currentPassword"
                    onChange={handlePassword}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="newPassword"
                  class="col-md-4 col-lg-3 col-form-label"
                >
                  New Password
                </label>
                <div class="col-md-8 col-lg-9">
                  <input
                    name="newpassword"
                    type="password"
                    class="form-control"
                    id="newPassword"
                    onChange={handlePassword}
                  />
                </div>
              </div>

              <div class="row mb-3">
                <label
                  for="renewPassword"
                  class="col-md-4 col-lg-3 col-form-label"
                >
                  Re-enter New Password
                </label>
                <div class="col-md-8 col-lg-9">
                  <input
                    name="renewpassword"
                    type="password"
                    class="form-control"
                    id="renewPassword"
                    onChange={handlePassword}
                  />
                </div>
              </div>

              <div class="text-center">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
