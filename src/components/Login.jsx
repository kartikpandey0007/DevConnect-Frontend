import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("kartikkpandey321@gmail.com");
  const [password, setPassword] = useState("Ecci@1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailID: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailID: emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://t4.ftcdn.net/jpg/02/07/15/43/360_F_207154340_wLIJus4m3SBl5sAQmpqN3Um7REnUhskU.jpg')",
      }}
    >
      <div
        className="w-full max-w-md bg-black bg-opacity-30 backdrop-blur-md shadow-green-400/80 shadow-lg rounded-lg p-8
                animate-pulse-slow border-2 border-green-500"
      >
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6 drop-shadow-lg">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>

        <div className="space-y-4">
          {!isLoginForm && (
            <>
              <div>
                <label className="block text-sm font-medium text-green-300">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter First Name"
                  className="mt-1 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-400 text-white bg-black bg-opacity-50 border-2 border-green-500 placeholder-green-300"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-green-300">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Last Name"
                  className="mt-1 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-400 text-white bg-black bg-opacity-50 border-2 border-green-500 placeholder-green-300"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-green-300">
              Email ID
            </label>
            <input
              type="text"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              placeholder="Enter Your EmailId"
              className="mt-1 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-400 text-white bg-black bg-opacity-50 border-2 border-green-500 placeholder-green-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-green-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="mt-1 w-full px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-green-400 text-white bg-black bg-opacity-50 border-2 border-green-500 placeholder-green-300"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-6">
          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="w-full bg-green-600 bg-opacity-80 text-black py-2 rounded-lg hover:bg-green-500 hover:bg-opacity-90 transition cursor-pointer shadow-lg shadow-green-400/50"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>

        <p
          className="text-center text-green-400 hover:underline cursor-pointer mt-4"
          onClick={() => setIsLoginForm(!isLoginForm)}
        >
          {isLoginForm
            ? "New User? Sign Up First"
            : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
};

export default Login;
