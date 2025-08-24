import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserPage = () => {
  const { id } = useParams();
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // If feed is null or undefined, show loading
  if (!feed) {
    return <div className="text-green-400 font-bold p-4">Loading user...</div>;
  }

  // Find user by id
  const user = feed.find((u) => u._id === id);

  if (!user) {
    return <div className="text-red-500 font-bold p-4">User not found!</div>;
  }

  const { firstName, lastName, photoUrl, age, gender, about, skills } = user;

  const handleSendRequest = async (status, toUSerId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${toUSerId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(toUSerId));
      navigate("/entry");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-4 m-4 rounded-xl bg-gray-900 border border-green-600 shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-200 mx-auto">
      <img
        className="w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover rounded-lg mb-3 border border-green-600"
        alt="profile"
        src={photoUrl || "https://via.placeholder.com/300x300?text=No+Image"}
      />
      <div className="text-green-200">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="mb-2 text-sm sm:text-base text-green-300">
            {age}, {gender}
          </p>
        )}
        {skills && skills.length > 0 && (
          <p className="font-medium mb-2 text-sm sm:text-base text-green-400">
            {skills.join(", ")}
          </p>
        )}
        {about && <p className="mb-4 text-sm sm:text-base text-green-200">{about}</p>}

        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          <button
            className="w-full sm:flex-1 bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-400 transition"
            onClick={() => handleSendRequest("interested", id)}
          >
            Send Request
          </button>
          <button
            className="w-full sm:flex-1 bg-red-500 text-black font-semibold py-2 rounded-md hover:bg-red-400 transition"
            onClick={() => handleSendRequest("ignored", id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
