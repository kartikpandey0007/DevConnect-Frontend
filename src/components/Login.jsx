import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("https://www.w3schools.com/howto/img_avatar.png");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailID: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }; //make api call to login

  const handleSignUp = async () => {
    try {
       const skillsArr = skills
      .split(",")               
      .map(s => s.trim())   
      .filter(s => s.length);

      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          age,
          about,
          gender,
          photoUrl,
          skills: skillsArr,    
          emailID: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }; 

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "SignUp"}</h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">FirstName</legend>
                  <input
                    type="text"
                    value={firstName}
                    className="input"
                    placeholder="eg :johny"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">LastName</legend>
                  <input
                    type="text"
                    value={lastName}
                    className="input"
                    placeholder="eg :Dab"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
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
                placeholder="Enter Password to Continue"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="label">Required*</p>
            </fieldset>

            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">PhotoUrl:</legend>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input"
                    placeholder="Upload Photo"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender:</legend>
                  <input
                    type="text"
                    value={gender}
                    className="input"
                    placeholder="male, female, others"
                    onChange={(e) => setGender(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age:</legend>
                  <input
                    type="text"
                    value={age}
                    className="input"
                    placeholder="Enter age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Skills:</legend>
                  <input
                    type="text"
                    value={skills}
                    className="input"
                    placeholder="Add Your Skills"
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">About:</legend>
                  <textarea
                    className="textarea"
                    value={about}
                    placeholder="About You"
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                </fieldset>
              </>
            )}
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignUp
            }>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p className="hover:underline cursor-pointer font-bold py-2" onClick={()=>setIsLoginForm(!isLoginForm)}>{isLoginForm ? "New User? SignUp First" : "Go to Login"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
