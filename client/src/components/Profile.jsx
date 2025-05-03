import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [_id, setId] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [error,setError] =  useState("");

  const handleGender = (e) => {
    console.log(e.target.innerHTML);
    setGender(e.target.innerHTML);
    handleDropDown()
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setPhotoUrl(user.photoUrl || "");
      setAge(user.age || "");
      setGender(user.gender || "");
      setAbout(user.about || "");
      setId(user._id || "");
    }
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        }),
        credentials: "include",
      });
      console.log(response);
      
      const data = await response.json();

      if (!response.ok) {
        setError(data.error)
        throw new Error(data.error || "Something went wrong");
      }
      setError("")

      console.log(data);

      dispatch(addUser(data.loggedInUser));
    } catch (err) {
      console.error("Error in Updating " + err.message);
    }
  };
  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }
  return (
    <div
      className="flex flex-col sm:flex-row
     justify-center m-10 h-screen"
    >
      <div className="card w-96 bg-base-100 shadow-sm flex flex-col items-center p-10 max-h-5/6 overflow-y-scroll hide-scrollbar">
        <div>
          <h1 className="text-3xl font-bold">Update Profile</h1>
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">firstName</legend>
          <input
            type="text"
            className="input w-80"
            placeholder="Type here"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">lastName</legend>
          <input
            type="text"
            className="input w-80"
            placeholder="Type here"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">photoUrl</legend>
          <input
            type="text"
            className="input w-80"
            placeholder="Type here"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">age</legend>
          <input
            type="text"
            className="input w-80"
            placeholder="Type here"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">gender</legend>
          {/* <input
            type=""
            className="input w-80"
            placeholder="Type here"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          /> */}
          <div onClick={handleDropDown} className="btn w-80 justify-start">
            {gender ? gender : "select gender"}
          </div>
          {dropDown && (
            <div className="flex flex-col z-10 absolute bg-transparent">
              <button className="btn w-80" onClick={(e) => handleGender(e)}>
                Male
              </button>
              <button className="btn w-80" onClick={(e) => handleGender(e)}>
                Female
              </button>
              <button className="btn w-80" onClick={(e) => handleGender(e)}>
                Other
              </button>
            </div>
          )}
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">about</legend>
          <textarea className="textarea w-80" placeholder="About" value={about}
            onChange={(e) => setAbout(e.target.value)}></textarea>
        </fieldset>
          <p className="text-red-500">{error}</p>
        <div className="mt-6">
          <button className="btn btn-primary btn-block " onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
      <div className="max-h-5/6 overflow-y-scroll hide-scrollbar">
        <UserCard
          userFeed={{ _id, firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </div>
  );
};

export default Profile;
