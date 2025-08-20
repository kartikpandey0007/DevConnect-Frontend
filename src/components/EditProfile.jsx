import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data)); //update user with new data
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex justify-center mx-10">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">FirstName:</legend>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder="eg: Johny"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName:</legend>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  placeholder="eg: Walker"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

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
                <legend className="fieldset-legend">About:</legend>
                <textarea
                  type="text"
                  value={about}
                  className="textarea h-24"
                  placeholder="About You"
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
            </div>

            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleEditProfile}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-bold">My Profile(for Reference)</h1>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, about, gender, skills }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
