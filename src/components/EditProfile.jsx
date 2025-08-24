import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [gender, setGender] = useState(user.gender || "");
  const [skills, setSkills] = useState(
    user.skills ? user.skills.join(", ") : ""
  );
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    try {
      const skillsArray = skills
        ? skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill)
        : [];
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          about,
          photoUrl,
          gender,
          skills: skillsArray,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start my-6 md:my-10 text-green-200 px-4 gap-6">
        {/* Left: Form */}
        <div className="w-full flex justify-center">
          <div className="w-full sm:w-96  border border-green-600 rounded-xl shadow-lg">
            <div className="p-5 sm:p-6">
              <h2 className="text-green-300 text-lg sm:text-xl font-semibold mb-4">
                Edit Profile
              </h2>

              <fieldset className="mb-4">
                <legend className="text-sm text-green-300 mb-1">
                  FirstName:
                </legend>
                <input
                  type="text"
                  value={firstName}
                  className="w-full rounded-md px-3 py-2  text-green-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="eg: Johny"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>

              <fieldset className="mb-4">
                <legend className="text-sm text-green-300 mb-1">
                  LastName:
                </legend>
                <input
                  type="text"
                  value={lastName}
                  className="w-full rounded-md px-3 py-2 text-green-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="eg: Walker"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>

              <fieldset className="mb-4">
                <legend className="text-sm text-green-300 mb-1">
                  PhotoUrl:
                </legend>
                <input
                  type="text"
                  value={photoUrl}
                  className="w-full rounded-md px-3 py-2 text-green-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Upload Photo"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>

              <fieldset className="mb-4">
                <legend className="text-sm text-green-300 mb-1">Skills:</legend>
                <input
                  type="text"
                  value={skills}
                  className="w-full rounded-md px-3 py-2  text-green-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Add Your Skills"
                  onChange={(e) => setSkills(e.target.value)}
                />
              </fieldset>

              <fieldset className="mb-4 relative">
                <legend className="text-sm text-green-300 mb-1">Gender:</legend>
                <div className="relative">
                  <select
                    value={gender}
                    className="w-full rounded-md px-3 py-2  text-green-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none pr-8 cursor-pointer"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="" disabled className="text-black">
                      Select gender
                    </option>
                    <option value="male" className="text-black">Male</option>
                    <option value="female" className="text-black">Female</option>
                    <option value="others" className="text-black">Others</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-green-300">
                    ▼
                  </span>
                </div>
              </fieldset>

              <fieldset className="mb-4">
                <legend className="text-sm text-green-300 mb-1">Age:</legend>
                <input
                  type="text"
                  value={age}
                  className="w-full rounded-md px-3 py-2  text-green-200 border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>

              <fieldset className="mb-4">
                <legend className="text-sm text-green-300 mb-1">About:</legend>
                <textarea
                  type="text"
                  value={about}
                  className="w-full rounded-md px-3 py-2  text-green-200 border border-green-600 h-24 sm:h-28 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="About You"
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>

              <div className="flex justify-center">
                <button
                  className="w-full sm:w-auto text-green-300 border border-green-600 px-4 py-2 rounded-lg font-semibold 
             hover:bg-green-300 hover:text-green-900 transition cursor-pointer"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Larger preview card */}
        <div className="w-full sm:w-96 flex flex-col items-center sm:items-start">
          <h1 className="font-bold text-green-300 text-center sm:text-left mb-4">
            My Profile (for Reference)
          </h1>

          {/* make preview allowed to expand: full width on mobile, fixed on md+ */}
          <div className="w-full">
            <UserCard
              user={{
                firstName,
                lastName,
                photoUrl,
                age,
                about,
                gender,
                skills: skills
                  ? skills
                      .split(",")
                      .map((s) => s.trim())
                      .filter((s) => s)
                  : [],
              }}
            />
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black px-6 py-3 rounded-lg shadow-lg z-50">
          Profile Updated
        </div>
      )}
    </>
  );
};

export default EditProfile;
