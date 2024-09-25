import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Routes, Route } from "react-router-dom";
import Topbar from "./Topbar";
import AddCar from "../AddCar";
import AllCars from "../AllCars";
import Bookings from "../Bookings";
import ProfileDetails from "../ProfileDetails";
import EditProfile from "../EditProfile";
import ChangePassword from "../ChangePassword";
import EditCar from "../EditCar";
import Refund from "../Refund";
import Logout from "../Logout";
import Dashboard from "./Dashboard";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    {/* <div className="widgets d-flex">
          <Widget type="user" />
          <Widget type="cars" />
          <Widget type="bookings" />
          <Widget type="earning" />
      </div>
      <div className="charts d-flex">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div> */}
    <Routes>
    <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/addcar/" element={<AddCar />} />
      <Route exact path="/allcars/:id" element={<AllCars />} />
      <Route exact path="/bookings" element={<Bookings />} />
      <Route exact path="/refund" element={<Refund />} />
      <Route exact path="/profileDetails/:id" element={<ProfileDetails />} />
      <Route exact path="/editprofile/:id" element={<EditProfile />} />
      <Route exact path="/changepassword" element={<ChangePassword />} />
      <Route exact path="/editcar/:slug" element={<EditCar />} />
      <Route exact path="/logout" element={<Logout />} />
    </Routes>
  </Container>
);

export default Content;
