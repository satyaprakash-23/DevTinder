import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state)=>state.user);
  const profileView = async () => {
    if(userData) return;
    try {
      const response = await fetch(`${BASE_URL}/profile/view`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login"); // 🔁 Redirect if unauthorized
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(addUser(data))
    } catch (err) {
      console.error("Error " + err.message);
    }
  };
  useEffect(() => {
    console.log("inside useEffect");
    
    profileView();
  },[location.pathname]);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
