import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAdminDetails } from "../services/admin.service";
import { useParams } from "react-router-dom";

function ProfileDetails() {
  const [profile, setProfile] = useState({
    id: "",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    branchId: "",
  });
  const { id } = useParams();
  const getProfileDetails = async (id) => {
    const response = await getAdminDetails(id);
    if (response !== null) {
      setProfile(response);
    } else {
      toast.error("Something went wrong!!!");
    }
  };

  useEffect(() => {
    getProfileDetails(id);
  }, []);
  return (
    <>
      <div className="col-lg-12">
        <div class="card">
          <div class="card-body pt-3">
            <h5 class="card-title">Profile Details</h5>
            <br />

            <div class="row">
              <div class="col-lg-3 col-md-4 label">Id</div>
              <div class="col-lg-9 col-md-8">{profile.id}</div>
            </div>
            <br />

            <div class="row">
              <div class="col-lg-3 col-md-4 label ">Full Name</div>
              <div class="col-lg-9 col-md-8">
                {profile.firstName.concat(" ").concat(profile.lastName)}
              </div>
            </div>
            <br />

            <div class="row">
              <div class="col-lg-3 col-md-4 label">Mobile</div>
              <div class="col-lg-9 col-md-8">+91-{profile.mobile}</div>
            </div>

            <br />

            <div class="row">
              <div class="col-lg-3 col-md-4 label">Email</div>
              <div class="col-lg-9 col-md-8">{profile.email}</div>
            </div>
            <br />

            <div class="row">
              <div class="col-lg-3 col-md-4 label">Branch Id</div>
              <div class="col-lg-9 col-md-8">{profile.branchId}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileDetails;
