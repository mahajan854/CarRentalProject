import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addCar } from "../services/car.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";

function AddCar() {
  debugger;

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
    branchId: sessionStorage.getItem("branchId"),
    imageUrl: "",
  });

  const [imgPerc, setImgPerc] = useState(0);
  const [photo, setPhoto] = useState(undefined);

  const navigate = useNavigate();

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, "cars/" + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setCar((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    photo && uploadFile(photo, "imageUrl");
  }, [photo]);

  //vehicle no added here because
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
    console.log("Submitted");
    debugger;
    const response = await addCar(car);
    if (response !== null) {
      toast.success("Car Details Added Successfully!!!");
      navigate(`/allcars/${sessionStorage.getItem("branchId")}`);
    } else {
      toast.error("Error in Adding the Car details");
    }
  };

  return (
    <>
      <div class="col-lg-12">
        {/* <!-- General Form Elements --> */}
        <form>
          <div class="row mb-3">
            <label for="inputText" class="col-sm-2 col-form-label">
              Vehicle No
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="vehicleNo"
                onChange={newCar}
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputText" class="col-sm-2 col-form-label">
              Brand
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="brand"
                onChange={newCar}
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputText" class="col-sm-2 col-form-label">
              Model
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="model"
                onChange={newCar}
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputDate" class="col-sm-2 col-form-label">
              Make year
            </label>
            <div class="col-sm-10">
              <DatePicker
                selected={makeYear}
                renderYearContent={renderYearContent}
                onChange={handleMakeYear}
                showYearPicker
                dateFormat="yyyy"
                name="makeYear"
              />
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Fuel Type</label>
            <div class="col-sm-10">
              <select
                class="form-select"
                aria-label="Default select example"
                name="fuelType"
                onChange={newCar}
              >
                <option selected="">Open this select menu</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="cng">CNG</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Drive Type</label>
            <div class="col-sm-10">
              <select
                class="form-select"
                aria-label="Default select example"
                name="driveType"
                onChange={newCar}
              >
                <option selected="">Open this select menu</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="semi-automatic">Semi-Automatic</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputText" class="col-sm-2 col-form-label">
              Category
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="category"
                onChange={newCar}
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Seating Capacity</label>
            <div class="col-sm-10">
              <select
                class="form-select"
                aria-label="Default select example"
                name="seatingCapacity"
                onChange={newCar}
              >
                <option selected="">Open this select menu</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
                <option value="7">Seven</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <label for="inputText" class="col-sm-2 col-form-label">
              Abs
            </label>
            <div class="col-sm-10">
              <select
                class="form-select"
                aria-label="Default select example"
                name="haveABS"
                onChange={newCar}
              >
                <option selected="">Open this select menu</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Air Bags</label>
            <div class="col-sm-10">
              <select
                class="form-select"
                aria-label="Default select example"
                name="haveAirBags"
                onChange={newCar}
              >
                <option selected="">Open this select menu</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputText" class="col-sm-2 col-form-label">
              Base Fare
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                min={100}
                name="baseFare"
                onChange={newCar}
                required
              />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputText" class="col-sm-2 col-form-label">
              Branch Id
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                name="branchId"
                onChange={newCar}
                value={sessionStorage.getItem('branchId')}
                disabled
              />
            </div>
          </div>

          <div class="row mb-3">
            <label for="photoUpload" class="col-sm-2 col-form-label">
              Upload Image
            </label>
            <div class="col-sm-10">
              {photo !== undefined ? (
                imgPerc===100?"uploaded":"Uploading: " + imgPerc + "%"
              ) : (
                <input
                  class="form-control"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  name="photoUploadImage"
                  id="photoUpload"
                  required
                />
              )}
            </div>
          </div> 

          <div class="row mb-3">
            <label class="col-sm-2 col-form-label">Submit Button</label>
            <div class="col-sm-10">
              <button
                type="submit"
                class="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit Form
              </button>
            </div>
          </div>
        </form>
        {/* <!-- End General Form Elements --> */}
      </div>
      <br/>
      <br/>
      <br/>


    </>
  );
}

export default AddCar;
