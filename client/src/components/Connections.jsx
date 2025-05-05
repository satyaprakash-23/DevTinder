import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const userConnections = useSelector((state) => state.connections);
  const connections = userConnections?.connections || [];
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
    } finally {
      setLoading(false); // Always stop loading, success or error
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) return <h2>Loading connections...</h2>;

  if (!connections || connections.length === 0) {
    return <h1 className="text-center mt-20">"There's no connection"</h1>;
  }
  return (
    <div className="flex flex-col justify-center items-center mt-20 mb-3 w-full px-4">
      <h1 className="font-bold text-4xl m-5 text-center">Connections</h1>

      <ul className="bg-base-100 rounded-box shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl space-y-4">
        {connections.map((connection) => (
          <li
            key={connection._id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-base-200 rounded-lg"
          >
            <img
              className="w-14 h-14 rounded-box object-cover"
              src={connection.photoUrl}
              alt="Profile"
            />

            <div>
              <div className="font-bold text-xl">
                {`${connection.firstName} ${connection.lastName}`}
              </div>
              <p className="text-xs">{`${connection.age} ${connection.gender}`}</p>
              <div className="text-xs uppercase font-semibold opacity-60">
                {connection.about}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
