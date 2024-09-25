import { useState } from "react";
import { editProfile, getAdminDetails } from "../services/admin.service";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditProfile() {

    const[user,setUser] = useState({id:"",firstName:"",lastName:"",email:"",mobile:"",branchId:"",branchName:""});
    const { id } = useParams(); 
    const navigate = useNavigate();
    const newUser = (u)=>{
       setUser({...user,[u.target.name]:u.target.value});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log("Submitted");
        const response = await editProfile(user)
        if(response !== null)
        {
            toast.success("Profile Updated Successfully")
            navigate(`/profileDetails/${sessionStorage.getItem('id')}`)
        }else{
            toast.error("Something went wrong!!!")
        }
    }

    const getProfileDetails = async (id) => {

        const response = await getAdminDetails(id);
        debugger
        if (response !== null) {

            setUser(response)
        } else {
            
            toast.error("Something went wrong!!!")
        }
    }

    useEffect(() => {
        getProfileDetails(id);
    }, [])

    return (
        <>
            <div className="col-lg-12">
                <div class="card">
                    <div class="card-body pt-3">

                        <form action="#" method="post">

                            <div class="row mb-3">
                                <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Id</label>
                                <div class="col-md-8 col-lg-9">
                                    <input name="id" type="number" class="form-control" value={user.id} onChange={newUser} disabled />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="fullName" class="col-md-4 col-lg-3 col-form-label">First Name</label>
                                <div class="col-md-8 col-lg-9">
                                    <input name="firstName" type="text" class="form-control" value={user.firstName} onChange={newUser} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="fullName" class="col-md-4 col-lg-3 col-form-label">Last Name</label>
                                <div class="col-md-8 col-lg-9">
                                    <input name="lastName" type="text" class="form-control" value={user.lastName} onChange={newUser} />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Email</label>
                                <div class="col-md-8 col-lg-9">

                                    <input name="email" type="email" class="form-control" value={user.email} maxLength={10} onChange={newUser} disabled/>
                                    
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="Email" class="col-md-4 col-lg-3 col-form-label">Mobile</label>
                                <div class="col-md-8 col-lg-9">
                                    <input name="mobile" type="number" class="form-control" value={user.mobile} onChange={newUser} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="Phone" class="col-md-4 col-lg-3 col-form-label">Branch Id</label>
                                <div class="col-md-8 col-lg-9">

                                    <input name="branchId" type="number" class="form-control" value={user.branchId} onChange={newUser} disabled/>

                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="Email" class="col-md-4 col-lg-3 col-form-label">Branch Name</label>
                                <div class="col-md-8 col-lg-9">
                                    <input name="branchName" type="text" class="form-control" value={user.branchName} onChange={newUser} disabled/>
                                </div>
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
              </div>
    </>
  );
}

export default EditProfile;
