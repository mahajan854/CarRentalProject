import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useEffect, useState } from "react";
import { getCars } from "../../services/car.service";
import { getAllBookings as getAllBookingsApi } from "../../services/booking.service";
import { ToastContainer, toast } from "react-toastify";

const Widget = ({ type }) => {
  let data;
  const [cars,setCars] = useState('');
  const [bookings,setBookings] = useState('');

  const diff = 20;

  const getAllCars = async (id) => {
    const response = await getCars(id);
    if (response !== null) {
      setCars(response.length);
    } else {
      toast.error("No Cars Found!!");
    }
  };

  const getAllBookings = async (id) => {
    const response = await getAllBookingsApi(id);
    if (response !== null) {
      setBookings(response.length);
      debugger;
    } else {
      toast.error("Something went wrong while fetching all bookings");
    }
  };

  useEffect(()=>{
    getAllCars(sessionStorage.getItem('branchId'));
    getAllBookings(sessionStorage.getItem('branchId'));
  },[])

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        sign : "negative",
        amount : 1867,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "cars":
      data = {
        title: "CARS",
        isMoney: false,
        link: "View all cars",
        sign : "positive",
        amount : 2546,
        icon: (
          <DriveEtaOutlinedIcon 
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "bookings":
      data = {
        title: "BOOKINGS",
        isMoney: false,
        link: "See details",
        sign : "negative",
        amount : 1786,
        icon: (
          <NoteAltOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        sign : "positive",
        amount : 1784354,
        icon: (
          <CurrencyRupeeOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <>
      <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${data.sign.includes("positive")?"positive":"negative"}`}>
          {data.sign.includes("positive")?<KeyboardArrowUpIcon />:<KeyboardArrowDownOutlinedIcon/>}
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
    <ToastContainer></ToastContainer>
    </>
  );
};

export default Widget;
