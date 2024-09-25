import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setStatus as setStatusApi } from "../services/car.service";
import '../App.css'
import {
  Container,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Col,
} from "reactstrap";
import { getCars } from "../services/car.service";
import { toast } from "react-toastify";

function AllCars() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const [statusModal, setStatusModal] = useState(false);
  const toggleStatus = () => setStatusModal(!statusModal);
  const [setCarStatusById, setSetCarStatusById] = useState({
    carId: "",
    status: "",
  });
  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cars.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(cars.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStatus = (e) => {
    setCarStatusById.carId = e.target.id;
    setCarStatusById.status = e.target.value;
    toggleStatus();
  };

  const ChangeStatus = async (e) => {
    if (setCarStatusById.status === "true") {
      const response = await setStatusApi(setCarStatusById.carId, "false");
      debugger
      if (response !== null) {
        if(response.status === true)
        {
          toast.success("Status changed successfully")
        }
        else{
          toast.error('Can not changes status of car right now')
        }
      } else {
        toast.error("Something went wrong!!!");
      }
      getAllCars(id);
      toggleStatus();
    } else {
      const response = await setStatusApi(setCarStatusById.carId, "true");
      if (response !== null) {
        if(response.status === true)
        {
          toast.success("Status changed successfully")
        }
        else{
          toast.error('Can not changes status of car right now')
        }
      } else {
        toast.error("Something went wrong!!!");
      }
      getAllCars(id);
      toggleStatus();
    }
  };

  const getAllCars = async (id) => {
    const response = await getCars(id);
    if (response !== null) {
      setCars(response);
    } else {
      toast.error("No Cars Found!!");
    }
  };

  useEffect(() => {
    getAllCars(id);
  }, []);


  return (
    <>
      <Container className="">
        <Modal isOpen={statusModal} backdrop="static">
          <ModalHeader
            className="d-flex justify-content-center border-0"
            toggle={toggleStatus}
          >
            <h2>
              <strong>Set Car Status</strong>
            </h2>
          </ModalHeader>
          <ModalBody>
            <Row>
              <h3>
                Are you sure?
                <br />
              </h3>
              <Col>
                <button
                  type="button"
                  class="btn btn-danger btn-sm col-md-12"
                  onClick={ChangeStatus}
                >
                  Yes
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  class="btn btn-primary btn-sm col-md-12"
                  onClick={toggleStatus}
                >
                  No
                </button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Container>

      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card shadow-2-strong">
            <div class="card-body">
              <div class="table-responsive">
                <div className="table-scroll-x">
                  <table class="table table-borderless mb-0 table-hover">
                    <thead className="thead-fixed"> 
                      <tr>
                        <th scope="col">Car id</th>
                        <th scope="col">Brand</th>
                        <th scope="col">Model</th>
                        <th scope="col">Make Year</th>
                        <th scope="col">Fuel Type</th>
                        <th scope="col">Drive Type</th>
                        <th scope="col">Category</th>
                        <th scope="col">Capacity</th>
                        <th scope="col">Abs</th>
                        <th scope="col">Air bags</th>
                        <th scope="col">Base Fare</th>
                        <th scope="col">Trips Complete</th>
                        <th scope="col">Branch Id</th>
                        <th scope="col">Availability</th>
                        <th scope="col">Status</th>
                        <th scope="col">Edit</th>
                      </tr>
                    </thead>
                    <tbody className="tbody-scroll">
                      {currentItems.map((car) => (
                        <tr key={car.vehicleNo}>
                          <td>{car?.vehicleNo}</td>
                          <td>{car?.brand}</td>
                          <td>{car?.model}</td>
                          <td>{car?.makeYear}</td>
                          <td>{car?.fuelType}</td>
                          <td>{car?.driveType}</td>
                          <td>{car?.category}</td>
                          <td>{car?.seatingCapacity}</td>
                          <td>{car?.haveABS == true ? "Yes" : "No"}</td>
                          <td>{car?.haveAirBags == true ? "Yes" : "No"}</td>
                          <td>{car?.baseFare}</td>
                          <td>{car?.tripsCompleted}</td>
                          <td>{car?.branchId}</td>
                          <td>{car?.availability == true ? "Yes" : "No"}</td>
                          <td>
                            {car.status === true ? (
                              <button
                                className="btn btn-success w-100 h-30"
                                value="true"
                                id={car?.vehicleNo}
                                onClick={handleStatus}
                              >
                                Active
                              </button>
                            ) : (
                              <button
                                className="btn btn-danger w-100"
                                value="false"
                                id={car?.vehicleNo}
                                onClick={handleStatus}
                              >
                                Inactive
                              </button>
                            )}
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-danger w-100"
                              onClick={() => {
                                navigate(`/editcar/${car.vehicleNo}`);
                              }}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pagination-container">
        <div className="pagination">
          <button className="btn btn-primary" onClick={prevPage}>
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {Math.ceil(cars.length / itemsPerPage)}
          </span>
          <button className="btn btn-primary" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
export default AllCars;
