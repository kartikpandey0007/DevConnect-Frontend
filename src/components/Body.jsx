import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fecthUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fecthUser();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-black bg-opacity-80 text-green-200 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/02/07/15/43/360_F_207154340_wLIJus4m3SBl5sAQmpqN3Um7REnUhskU.jpg')",
      }}
    >
      <NavBar />
      <div className="flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 w-full max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;
