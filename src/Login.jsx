import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("ramlal@gmail.com");
  const [password, setPassword] = useState("Ramlal@234");

  const handleLogin = async () => {
    try{
      const res = await axios.post("http://localhost:3000/login", {
      emailID: emailId,
      password: password
    },
    {withCredentials: true}
  )
  }
    catch(err){
      console.error(err)
    }

  };//make api call to login 

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                value={emailId}
                className="input"
                placeholder="abc@gmail.com"
                onChange={(e) => setEmailId(e.target.value)}
              />
              <p className="label">Required*</p>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                value={password}
                className="input"
                placeholder="Enter Password to login"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="label">Required*</p>
            </fieldset>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
