import { removeUserFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ userFeed }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = userFeed;
  console.log(_id + "satya");
  // localhost:7777/request/send/interested/680661eb5dc76963f61da2ca
  const dispatch = useDispatch();
  const handleButton= async(status) => {
    try{
      const response = await fetch(`${BASE_URL}/request/send/${status}/${_id}`,{method:"POST", credentials : 'include'})
      const data = response.json();
      if(!response.ok){
        throw new Error(data.error || "something went wrong")
      }
      dispatch(removeUserFromFeed(_id));
    }
    catch(err){
      console.error(err.message)
    }
    
  };
  // const handleInterested = () => {
  //   dispatch(removeUserFromFeed(_id));
  // };
  return (
    <div className="card bg-base-100 w-96 shadow-sm sm:min-h-4/5">
      <figure>
        <img className="h-80 bg-contain w-96 sm:h-100" src={photoUrl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>{gender + " " + age}</p>
        <p className="h-22">{about}</p>
        <div className="flex justify-between">
          <div className="card-actions justify-end">
            <button className="btn btn-secondary " onClick={()=>handleButton("ignored")}>
              Ignore{" "}
            </button>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={()=>handleButton("interested")}>
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
