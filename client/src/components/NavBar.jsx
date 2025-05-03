import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "../assets/tinder.png";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const [menuState, setMenuState] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleMenu = () => {
    setMenuState(!menuState);
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      // console.log(response);

      if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
      }

      dispatch(removeUser());

      navigate("/login");
      setMenuState(false);
    } catch (err) {
      console.error("Logout Error " + err.message);
    }
  };
  const photoUrl = useSelector((state) => state.user?.photoUrl);
  return (
    <nav className="fixed w-screen flex justify-between font-bold p-4  items-center z-50 bg-base-200">
      <a href="/">
        <div className="w-10 flex items-center ">
          <img alt="logo" src={logo} />
          <div className="text-2xl">DevTinder </div>
        </div>
      </a>

      <button className="" onClick={handleMenu}>
        <div className="w-10 h-10 overflow-hidden rounded-full">
          {photoUrl && <img alt="DP" src={photoUrl} />}
        </div>
      </button>
      <div
        className={` border-2 absolute top-18 right-2 z-1 w-30 ${
          menuState ? "visible" : "invisible"
        }`}
      >
        <div className="flex flex-col p-1 text-center">
          <button
            className="hover:bg-gray-700
              "
          >
            <Link to="/profile">Profile</Link>
          </button>

          <button
            className="hover:bg-gray-700
              "
          >
            Message
          </button>
          <button
            onClick={handleLogout}
            className="hover:bg-gray-700
              "
          >
            Logout
          </button>
        </div>
      </div>
      {/* <ul>
        <Link to="/register" ><li>register</li></Link>
        <Link to="/feed"><li>feed</li></Link>
      </ul> */}
    </nav>
  );
};

export default NavBar;
