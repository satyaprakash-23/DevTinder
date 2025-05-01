import { useState } from "react";
import { addUser,removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const [email,setEmail] = useState("satya@gmail.com");
  const [password,setPassword] = useState("Satya@1234");
  const user = useSelector((state)=>state.user)
  console.log(user)

  const handleOnClick = async()=>{
    try{
      const response = await fetch("http://localhost:7777/login",{
        method : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body : JSON.stringify({
          emailID : email,
          password : password
        }),
        credentials : 'include'
      })
      const data = await response.json();
      dispatch(addUser(data))
         }catch{

    }
  }
  return (
    <div className="flex justify-center mt-10">
      <div className="card w-96 bg-base-100 shadow-sm flex flex-col items-center p-10">
        <div>
          <h1 className="text-3xl font-bold">Login</h1>
        </div>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">Email ID</legend>
          <input type="text" className="input w-80" placeholder="Type here" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold">Password</legend>
          <input type="text" className="input w-80" placeholder="Type here" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </fieldset>
        <div className="mt-6">
          <button className="btn btn-primary btn-block " onClick={handleOnClick}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
