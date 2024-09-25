import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { editCar } from "../services/car.service";
import { useNavigate, useParams } from "react-router-dom";
import { getCarDetails } from "../services/car.service";
import { toast } from "react-toastify";

function EditCar() {

    const [makeYear, setMakeYear] = useState(new Date());

    const [car, setCar] = useState({
        vehicleNo: "",
        brand: "",
        model: "",
        makeYear,
        fuelType: "",
        driveType: "",
        category: "",
        seatingCapacity: "",
        haveABS: "",
        haveAirBags: "",
        baseFare: "",
        status: ""
    });

    const { slug } = useParams();

    const navigate = useNavigate();

    const renderYearContent = (year) => {
        
        const tooltipText = `Tooltip for year: ${year}`;
        return <span title={tooltipText}>{year}</span>;
    };

    const handleMakeYear = (year) => {
        setMakeYear(year);
        setCar((prevCar) => ({ ...prevCar, makeYear: year }));
    };

    const newCar = (c) => {
        setCar({ ...car, [c.target.name]: c.target.value });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    const response = await editCar(car);
    if (response !== null) {
      toast.success("Car Details Edited Successfully!!!");
      navigate(`/allcars/${sessionStorage.getItem('branchId')}`);
    } else {
      toast.error("Error in editing the Car details");
    }
  }
    const getCarDetailsToEdit = async (slug) => {
        const response = await getCarDetails(slug);
        if (response !== null) {
            setCar(response)
        } else {
            toast.error("Something went wrong!!!")
        }
    }

    useEffect(() => {
        getCarDetailsToEdit(slug);
    }, [])

    return (
    <>
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Edit Car Details</h5>

                        {/* <!-- General Form Elements --> */}
                        <form>
                            <div class="row mb-3">
                                <label for="inputNumber" class="col-sm-2 col-form-label">Cars ID</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="vehicleNo" value={car?.vehicleNo}
                                        onChange={newCar} disabled="disabled" />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputText" class="col-sm-2 col-form-label">Brand</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="brand" onChange={newCar} value={car?.brand} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputText" class="col-sm-2 col-form-label">Model</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="model" onChange={newCar} value={car?.model} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputDate" class="col-sm-2 col-form-label">Make year</label>
                                <div class="col-sm-10">
                                    <DatePicker
                                        selected={makeYear}
                                        renderYearContent={renderYearContent}
                                        onChange={handleMakeYear}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        name="makeYear"
                                        value={car?.makeYear}
                                    />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-2 col-form-label">Fuel Type</label>
                                <div class="col-sm-10">
                                    <select class="form-select" aria-label="Default select example" name="fuelType" onChange={newCar}>
                                        <option selected="">{car?.fuelType === "" ? 'Open this select menu' : car?.fuelType}</option>
                                        <option value="petrol">Petrol</option>
                                        <option value="diesel">Diesel</option>
                                        <option value="cng">CNG</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-2 col-form-label">Drive Type</label>
                                <div class="col-sm-10">
                                    <select class="form-select" aria-label="Default select example" name="driveType" onChange={newCar}>
                                        <option selected="">{car?.driveType === "" ? 'Open this select menu' : car?.driveType}</option>
                                        <option value="manual">Manual</option>
                                        <option value="automatic">Automatic</option>
                                        <option value="semi-automatic">Semi-Automatic</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputText" class="col-sm-2 col-form-label">Category</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="category" onChange={newCar} value={car?.category} />
                                </div>
                            </div>


                            <div class="row mb-3">
                                <label class="col-sm-2 col-form-label">Seating Capacity</label>
                                <div class="col-sm-10">
                                    <select class="form-select" aria-label="Default select example" name="seatingCapacity" onChange={newCar}>
                                        <option selected="">{car?.seatingCapacity === "" ? 'Open this select menu' : car?.seatingCapacity}</option>
                                        <option value="4">Four</option>
                                        <option value="5">Five</option>
                                        <option value="6">Six</option>
                                        <option value="7">Seven</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label for="inputText" class="col-sm-2 col-form-label">Abs</label>
                                <div class="col-sm-10">
                                    <select class="form-select" aria-label="Default select example" name="haveABS" onChange={newCar}>
                                        <option selected="">{car?.airBags === "" ? 'Open this select menu' : car?.haveABS === true ? 'Yes' : 'No'}</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-2 col-form-label">Air Bags</label>
                                <div class="col-sm-10">
                                    <select class="form-select" aria-label="Default select example" name="haveAirBags" onChange={newCar}>
                                        <option selected="">{car?.airBags === "" ? 'Open this select menu' : car?.haveAirBags === true ? 'Yes' : 'No'}</option>
                                        <option value="true">Yes</option>
                                        <option value="false">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label for="inputText" class="col-sm-2 col-form-label">Base Fare</label>
                                <div class="col-sm-10">
                                    <input type="number" class="form-control" min={1000} name="baseFare" onChange={newCar} value={car?.baseFare} />
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-2 col-form-label">Status</label>
                                <div class="col-sm-10">
                                    <select class="form-select" aria-label="Default select example" name="status" onChange={newCar}>
                                        <option selected="">{car?.status === "" ? 'Open this select menu' : car?.status === true ? 'Active' : 'Inactive'}</option>
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label class="col-sm-2 col-form-label">Submit Button</label>
                                <div class="col-sm-10">
                                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit Form</button>
                                </div>
                            </div>

                        </form>
                        {/* <!-- End General Form Elements --> */}

                    </div>
                </div>
              </div>
    </>
  );
}

export default EditCar;
