import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "../assets/tinder.png";
import { useSelector } from "react-redux";
import { Link } from "react-router";

const NavBar = () => {
  const [menuState, setMenuState] = useState(false);
  const handleMenu = () => {
    setMenuState(!menuState);
  };
  const photoUrl = useSelector((state) => state.user?.photoUrl);
  return (
    <nav className="flex justify-between font-bold border-2 p-3 items-center">
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
        className={` border-2 absolute top-18 right-2 ${
          menuState ? "visible" : "invisible"
        }`}
      >
        <div className="flex flex-col p-1">
          <button
            className="hover:bg-gray-700
              "
          >
            RequestsReceived
          </button>
          <button
            className="hover:bg-gray-700
              "
          >
            Message
          </button>
          <button
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
