import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { getCancelledBookings as getCancelledBookingsApi } from "../services/booking.service";
import { refundAmount as refundAmountApi } from "../services/booking.service";
import {
  Container,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Col,
} from "reactstrap";
function Refund() {
  const [cancelledBooking, setCancelledBooking] = useState([]);
  const [cancelStatusById, setCancelStatusById] = useState({
    cancellationId: "",
    transactionId: "",
    customerName: "",
    amountToBeRefunded: "",
  });

  const id = sessionStorage.getItem("branchId");
  const uuid = require("uuid");
  const [refundModal, setRefundModal] = useState(false);
  const toggleRefund = () => setRefundModal(!refundModal);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cancelledBooking.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(cancelledBooking.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  const getCancelledBookings = async (id) => {
    const response = await getCancelledBookingsApi(id);
    if (response !== null) {
      setCancelledBooking(response);
      console.log(cancelledBooking);
      debugger;
    } else {
      toast.error("Something went wrong!!!");
    }
  };

  const handleRefund = (e) => {
    cancelStatusById.cancellationId = e.target.id;
    cancelStatusById.transactionId = uuid.v4();
    cancelStatusById.customerName = e.target.name;
    cancelStatusById.amountToBeRefunded = e.target.value;
    toggleRefund();
    debugger;
  };

  const refundAmount = async (e) => {
    const response = await refundAmountApi(cancelStatusById);
    if (response !== null) {
      toast.success(`Amount refunded to ${cancelStatusById.customerName}`);
    } else {
      toast.error(`Something Went Wrong!!`);
    }
    getCancelledBookings(id);
    toggleRefund();
  };

  useEffect(() => {
    getCancelledBookings(id);
  }, []);

  useEffect(() => {
    console.log(cancelledBooking);
  }, [cancelledBooking]);

  return (
    <>
      <Container className="">
        <Modal isOpen={refundModal} backdrop="static">
          <ModalHeader
            className="d-flex justify-content-center border-0"
            toggle={toggleRefund}
          >
            <h2>
              <strong>Refund</strong>
            </h2>
          </ModalHeader>
          <ModalBody>
            <Row>
              <h3>
                {`Refund To : ${cancelStatusById.customerName}`}
                <br />
                {`Amount : ${cancelStatusById.amountToBeRefunded}`}
              </h3>
              <Col>
                <button
                  type="button"
                  class="btn btn-danger btn-sm col-md-12"
                  onClick={refundAmount}
                >
                  Yes
                </button>
              </Col>
              <Col>
                <button
                  type="button"
                  class="btn btn-primary btn-sm col-md-12"
                  onClick={toggleRefund}
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
                <table class="table table-borderless mb-0 table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Booking Id</th>
                      <th scope="col">Cancellation Id</th>
                      <th scope="col">Customer Name</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr key={item.bookingId}>
                        <td>{item.bookingId}</td>
                        <td>{item.cancellationId}</td>
                        <td>{item.customerName}</td>
                        <td>{item.amountToBeRefunded}</td>
                        <td>{item.isRefundPending ? "Pending" : "Refunded"}</td>
                        <td>
                          {
                            <button
                              type="button"
                              class={`btn btn-primary w-100 ${
                                item.isRefundPending ? "" : "disabled"
                              }`}
                              onClick={handleRefund}
                              id={item.cancellationId}
                              name={item.customerName}
                              value={item.amountToBeRefunded}
                            >
                              Refund
                            </button>
                          }
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
      <div className="pagination-container">
        <div className="pagination">
          <button className="btn btn-primary" onClick={prevPage}>
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {Math.ceil(cancelledBooking.length / itemsPerPage)}
          </span>
          <button className="btn btn-primary" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Refund;
