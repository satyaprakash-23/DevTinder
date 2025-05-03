import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ userFeed }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = userFeed;
  console.log(_id + "satya");

  const dispatch = useDispatch();
  const handleIgnore = () => {
    dispatch(removeUserFromFeed(_id));
  };
  const handleInterested = () => {
    dispatch(removeUserFromFeed(_id));
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm ">
      <figure>
        <img src={photoUrl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{gender + " " + age}</p>
        <p>{about}</p>
        <div className="flex justify-between">
          <div className="card-actions justify-end">
            <button className="btn btn-secondary" onClick={handleIgnore}>
              Ignore{" "}
            </button>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleInterested}>
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
