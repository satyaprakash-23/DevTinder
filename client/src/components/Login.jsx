import { useState } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);

  console.log(user);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailID: email,
          password: password,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        throw new Error(data.error || "something went wrong");
      }
      console.log(data);
      setError("");
      dispatch(addUser(data));
      return navigate("/feed");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSignUP = async () => {
    try {
      const response = await fetch(`${BASE_URL}/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          emailID: email,
          password,
        }),
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.error);
        throw new Error(data.error || "something went wrong");
      }

      setError("");
      dispatch(addUser(data.data));
      navigate("/profile");
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("")
  };

  return (
    <div className="flex justify-center mt-20">
      <div className="card w-96 bg-base-100 shadow-sm flex flex-col items-center p-10">
        <div>
          <h1 className="text-3xl font-bold">{isLogin ? "Login" : "SignUp"}</h1>
        </div>
        {!isLogin ? (
          <>
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold">FirstName</legend>
              <input
                type="text"
                className="input w-80"
                placeholder="Type here"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-bold">LastName</legend>
              <input
                type="text"
                className="input w-80"
                placeholder="Type here"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
          </>
        ) : null}
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">Email ID</legend>
          <input
            type="text"
            className="input w-80"
            placeholder="Type here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">Password</legend>
          <input
            type="text"
            className="input w-80"
            placeholder="Type here"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <p className="text-red-500">{error}</p>
        <div className="mt-6">
          {isLogin ? (
            <button
              className="btn btn-primary btn-block "
              onClick={handleLogin}
            >
              Login
            </button>
          ) : (
            <button
              className="btn btn-primary btn-block "
              onClick={handleSignUP}
            >
              SignUp
            </button>
          )}
        </div>
        <div className="cursor-pointer mt-3" onClick={handleToggle}>
          {isLogin ? "New User? SignUp " : "Already Registered? Login"}
        </div>
      </div>
    </div>
  );
};

export default Login;
