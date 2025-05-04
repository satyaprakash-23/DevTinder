import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const userConnections = useSelector((state) => state.connections);
  const { connections } = userConnections;
  console.log(connections);

  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/connections", {
        credentials: "include",
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }
      console.log(data);
      dispatch(addConnections(data));
    } catch (err) {
      console.error("Fetch connections failed:", err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (connections.length === 0) {
    return <h1>"There is no connection"</h1>;
  }
  return (
    <div className="flex flex-col justify-center items-center mt-20 mb-3 w-full">
      <h1 className="font-bold text-4xl m-5">Connections</h1>
      <ul className="list bg-base-100 rounded-box shadow-md w-3/5">
        {connections.map((connection, index) => {
          return (
            <li className="list-row flex items-center">
              <div>
                <img
                  className="size-13 rounded-box"
                  src={connection.photoUrl}
                />
              </div>
              <div>
                <div className="font-bold text-xl">{`${connection.firstName} ${connection.lastName} `}</div>
                <p className="text-xs">{`${connection.age} ${connection.gender} `}</p>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {connection.about}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
