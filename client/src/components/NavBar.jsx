import { Menu } from "lucide-react";
import { useState } from "react";
import logo from "../assets/tinder.png";

const NavBar = () => {
  const [menuState, setMenuState] = useState(false);
  const handleMenu = () => {
    setMenuState(!menuState);
  };
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
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
        <div
          className={` border-2 absolute top-18 right-2 ${
            menuState ? "visible" : "invisible"
          }`}
        >
          <div className="flex flex-col p-1">
            {/* <buttons
              className="hover:bg-gray-700
              "
            >
              RequestsReceived
            </buttons>
            <buttons
              className="hover:bg-gray-700
              "
            >
              Message
            </buttons>
            <buttons
              className="hover:bg-gray-700
              "
            >
              Login
            </buttons> */}
          </div>
        </div>
      </button>
    </nav>
  );
};

export default NavBar;
