import { useEffect, useState } from "react";
import { setReturnedStatus } from "../services/booking.service";
import { toast } from "react-toastify";
import { getAllBookings as getAllBookingsApi } from "../services/booking.service";
import { useNavigate } from "react-router-dom";
import '../App.css'
import {
  Container,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Col,
} from "reactstrap";
function Bookings() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [filterBookingDetails, setFilterBookingDetails] = useState([]);
  const navigate = useNavigate();
  const [returnedModal, setreturnedModal] = useState(false);
  const toggleReturned = () => setreturnedModal(!returnedModal);
  const [returnedId,setReturnedId] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11; 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterBookingDetails.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filterBookingDetails.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleReturned = (e) => {
    setReturnedId(e.target.id);
    toggleReturned();
  };

  const handleRefund = () => {
    navigate("/refund");
  };

  const handleSelect = (e) => {
    let filteredItems =
      e.target.value === "All"
        ? bookingDetails
        : bookingDetails.filter((item) => item.status === e.target.value);
    setFilterBookingDetails(filteredItems);
  };

  const returnedStatusSet = async (e) => {
    const response = await setReturnedStatus(returnedId);
    debugger
    if (response !== null) {
      if(response.status === true){
        toast.success("Car Returned Successfully");
      }else{
        toast.error("Can't returned before start date!!")
      }
    } else {
      toast.error("Something Went wrong!!!");
    }
    getAllBookings(sessionStorage.getItem("branchId"));
    toggleReturned();
  };

  const getAllBookings = async (id) => {
    const response = await getAllBookingsApi(id);
    if (response !== null) {
      setBookingDetails(response);
      debugger;
    } else {
      toast.error("Something went wrong while fetching all bookings");
    }
  };

  useEffect(() => {
    getAllBookings(sessionStorage.getItem("branchId"));
  }, []);

  useEffect(() => {
    setFilterBookingDetails(bookingDetails); // Update the filtered state when bookingDetails changes
  }, [bookingDetails]);



  return (
    <>
      <Container className="">
        <Modal isOpen={returnedModal} backdrop="static">
          <ModalHeader
            className="d-flex justify-content-center border-0"
            toggle={toggleReturned}
          >
            <h2>
              <strong>Returned</strong>
            </h2>
          </ModalHeader>
          <ModalBody>
            <Row>
              <h3>Is Car returned??</h3>
              <Col>
                <button
                  type="button"
                  class="btn btn-danger btn-sm col-md-12"
                  onClick={returnedStatusSet}
                >
                  Yes
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  class="btn btn-primary btn-sm col-md-12"
                  onClick={toggleReturned}
                >
                  No
                </button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Container>

      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="filter-dropdown-container d-flex gap-3 mb-5">
              <span className=" d-flex ">Filter By</span>
              <select
                className="filter-dropdown"
                onChange={handleSelect}
              >
                <option value="All">All</option>
                <option value="COMPLETED">Completed</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="card shadow-2-strong">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-borderless mb-0 table-hover sticky-table">
                  <thead className="thead-fixed">
                    <tr>
                      <th scope="col">Booking Id</th>
                      <th scope="col">User Id</th>
                      <th scope="col">Branch Id</th>
                      <th scope="col">vehicle No</th>
                      <th scope="col">Booking Date</th>
                      <th scope="col">From Date</th>
                      <th scope="col">To Date</th>
                      <th scope="col">Trip Cost</th>
                      <th scope="col">Status</th>
                      <th scope="col">Returned Date</th>
                      <th scope="col">Penalty</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="tbody-scroll">
                    {currentItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.userId}</td>
                        <td>{item.branchId}</td>
                        <td>{item.vehicleNo}</td>
                        <td>{item.bookingDate}</td>
                        <td>{item.fromDate}</td>
                        <td>{item.toDate}</td>
                        <td>{item.tripCost}</td>
                        <td>{item.status}</td>
                        <td>{item.returnDate}</td>
                        <td>{item.penalty}</td>
                        <td>
                          {item.status === "CANCELLED" ? (
                            <button
                              type="button"
                              class={`btn btn-danger w-100`}
                              onClick={handleRefund}
                              id={item.Id}
                              disabled
                            >
                              Cancelled
                            </button>
                          ) : (
                            <button
                              type="button"
                              class={`btn btn-primary w-100 ${
                                item.status?.includes("SCHEDULED") ? "" : "disabled"
                              }`}
                              onClick={handleReturned}
                              id={item.id}
                            >
                              Returned
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            Page {currentPage} of {Math.ceil(filterBookingDetails.length / itemsPerPage)}
          </span>
          <button className="btn btn-primary" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

export default Bookings;
