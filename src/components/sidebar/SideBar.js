import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCarSide,
  faImage,
  faCopy,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";

import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => (
  <>
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="success" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        <h3>Rent-a-Ride</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
            <NavLink tag={Link} to={`/`} className="text-white font-weight-bold">
              {/* <FontAwesomeIcon icon={faImage} className="mr-4" /> */}
              Dashboard
            </NavLink>
          <SubMenu title=" Cars" icon={faCarSide} items={submenus[0]}/>

          <NavItem>
            <NavLink tag={Link} to={`/bookings`}>
              <FontAwesomeIcon icon={faImage} className="mr-4" />
              Bookings
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink tag={Link} to={`/refund`}>
              <FontAwesomeIcon icon={faDollarSign} className="mr-4" />
              Refund
            </NavLink>
          </NavItem>

          <SubMenu title=" Profile" icon={faCopy} items={submenus[1]} />

          <NavItem>
            <NavLink tag={Link} to={`/logout`}>
              <LogoutIcon></LogoutIcon>
              Log Out
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  </>
);

const submenus = [
  [
    {
      title: "All Cars",
      target: `allCars/${sessionStorage.getItem("branchId")}`,
      // target: `allCars/1`,
    },
    {
      title: "Add Car",
      target: "addcar",
    },
  ],

  [
    {
      title: "Details",
      target: `profileDetails/${sessionStorage.getItem("id")}`,
    },
    {
      title: "Edit Profile",
      target: `editprofile/${sessionStorage.getItem("id")}`,
    },
    {
      title: "Change Password",
      target: "changepassword",
    },
  ],
];

export default SideBar;
