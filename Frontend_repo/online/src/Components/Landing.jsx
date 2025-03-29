import React from "react";
import { useState } from "react";
import "./Css/LandingPage.css";
import Landingnav from "./Landingnav";
import Landinghome from "./Landinghome";
import Landingabout from "./Landingabout";
import Landingblog from "./Landingblog";
import Landingcontact from "./Landingcontact";
import { ToastContainer, toast } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast styles


const Footer = () => {  
  return (
    <footer className="footer">
      <p>&copy; 2024 Online Exam. All rights reserved.</p>
    </footer>
  );
};

const LandingPage = () => {
  const [message, setMessage] = useState("");
  setMessage(localStorage.data.message)
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // Close after 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
});
  return (
    <div>
      <Landingnav/>
      <Landinghome />
      <div id="about">
      <Landingabout />
      </div>
      <div id="blog">
      <Landingblog />
      </div>
      <div id="contact">
      <Landingcontact />
      </div>
      <Footer />
      <ToastContainer />

    </div>
  );
};

export default LandingPage;

