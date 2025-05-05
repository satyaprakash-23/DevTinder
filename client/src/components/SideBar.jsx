import { PanelRight } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const SideBar = () => {
  const userData = useSelector((state) => state.user);
  const photoUrl = userData?.photoUrl;
  const [drawer, setDrawer] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleDrawer = ()=>{
    setDrawer(false)
  }
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

      setDrawer(false)
      navigate("/login");
      // setMenuState(false);
    } catch (err) {
      console.error("Logout Error " + err.message);
    }
  };
  return (
    <div className="hidden md:block ">
      <div
        className={`transition-all duration-400 ease-in-out fixed top-17 left-0 h-screen bg-base-200  p-5 ${
          drawer ? "w-1/4 z-50 " : "w-14"
        }`}
      >
        {drawer ? (
          <div>
          <div className="flex justify-between items-center p-3 border-b-gray-800 border-b-2">
            <button className="">
              <div className="w-10 h-10 overflow-hidden rounded-full">
                {photoUrl && <img alt="DP" src={photoUrl} />}
              </div>
            </button>
            <button className="" onClick={() => setDrawer(!drawer)}>
              <PanelRight />
            </button>
            
          </div>
          <div className="flex flex-col p-1 text-center">
          <Link to="/feed"  className="btn hover:bg-gray-700 h-10
              " onClick={handleDrawer}>
          
            Home
       
          </Link>
          <Link to="/profile"  className="btn hover:bg-gray-700 h-10
              " onClick={handleDrawer}>
          
            Profile
       
          </Link>
          <Link to="/connections"  className="btn hover:bg-gray-700 h-10
              " onClick={handleDrawer}>
          
            Connection
       
          </Link>
          <Link to="/requests"  className="btn hover:bg-gray-700 h-10
              " onClick={handleDrawer}>
          
            Request Received
       
          </Link>
          <button
            className="btn hover:bg-gray-700
              " onClick={handleDrawer}
          >
            Message
          </button>
          <button
            onClick={handleLogout}
            
            className="btn hover:bg-gray-700
              "
          >
            Logout
          </button>
          
        </div>
        
          </div>
          
        ) : (
          <button className="" onClick={() => setDrawer(!drawer)}>
            <PanelRight />
          </button>
        )}
        
      </div>
    </div>
  );
};

export default SideBar;
