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
    <div className="w-80 p-4 m-4 rounded-2xl bg-black border border-green-500 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] transition-all duration-300 cursor-pointer">
      <img
        className="w-full h-80 object-cover rounded-xl mb-3 border border-green-500"
        alt="profile"
        src={photoUrl || "https://via.placeholder.com/300x300?text=No+Image"}
      />
      <div className="text-green-200">
        <h2 className="text-xl font-bold mb-1">
          {firstName} {lastName}
        </h2>
        {age && gender && (
          <p className="mb-2">
            {age}, {gender}
          </p>
        )}
        {skills && skills.length > 0 && (
          <p className="font-semibold mb-2">{skills.join(", ")}</p>
        )}
        {about && <p className="mb-4">{about}</p>}

        <div className="flex justify-between gap-4">
          <button
            className="flex-1 bg-green-500 text-black font-bold py-2 rounded-lg hover:bg-green-400 hover:shadow-[0_0_12px_#00ff66] transition cursor-pointer"
            onClick={() => handleSendRequest("interested", id)}
          >
            Send Request
          </button>
          <button
            className="flex-1 bg-red-600 text-black font-bold py-2 rounded-lg hover:bg-red-500 hover:shadow-[0_0_12px_#ff4444] transition cursor-pointer"
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
