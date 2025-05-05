import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";

const RequestReceived = () => {
  const dispatch = useDispatch();
  const userRequest = useSelector((state) => state.request);
  console.log(userRequest);
  const [loading, setLoading] = useState(true);
  const requests = userRequest?.connectionRequest || [];
  console.log(requests);

  // /request/review/:status/:requestId

  const handleReview = async (status, requestId) => {
    console.log(status);
    console.log(requestId);

    try {
      const response = await fetch(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchRequest = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/requests/received", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "something went wrong");
      }

      dispatch(addRequests(data));
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading)
    return <h2 className="text-center mt-20">Loading requests...</h2>;

  if (!requests || requests.length === 0) {
    return <h1 className="text-center mt-20">There's no request</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20 mb-3 w-full px-4">
      <h1 className="font-bold text-4xl m-5 text-center">Requests Received</h1>

      <ul className="bg-base-100 rounded-box shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl space-y-4">
        {requests.map((request) => (
          <li
            key={request._id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-base-200 rounded-lg"
          >
            <div className="flex items-center">
              <img
                className="w-16 h-16 rounded-box object-cover"
                src={request.fromUserId.photoUrl}
                alt="User"
              />
              <div className="ml-4">
                <div className="font-bold text-xl">
                  {`${request.fromUserId.firstName} ${request.fromUserId.lastName}`}
                </div>
                <p className="text-xs">{`${request.fromUserId.age} ${request?.fromUserId?.gender}`}</p>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {request?.fromUserId?.about}
                </div>
              </div>
            </div>

            <div className="flex gap-2 sm:ml-4 justify-end sm:justify-start">
              <button
                className="btn btn-primary"
                onClick={() => handleReview("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleReview("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RequestReceived;
