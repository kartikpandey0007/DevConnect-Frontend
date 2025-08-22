import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status >= 200 && res.status < 300) {
        setFilteredRequests((prev) => prev.filter((r) => r._id !== _id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      setRequests(res.data.data);
      setFilteredRequests(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if(!filteredRequests) return <Shimmer/>
  
  if (filteredRequests.length === 0) {
    return (
      <h1 className="flex justify-center items-center text-center font-semibold text-green-400 my-10 text-lg sm:text-xl">
        No Requests found
      </h1>
    );
  }

  return (
    <div className="text-center justify-center my-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-8 drop-shadow-lg">
        Requests
      </h1>

      {filteredRequests.map((request) => {
        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          about,
          age,
          gender,
          skills,
        } = request.fromUserId;
        return (
          <div
            key={_id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center
                   bg-black text-green-400 rounded-xl shadow-lg shadow-green-400/30
                   p-4 mx-auto mb-6 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 transition-transform
                   duration-300 hover:scale-105"
          >
            {/* User Image */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <img
                alt="image"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-600 object-cover"
                src={
                  photoUrl || "https://www.w3schools.com/howto/img_avatar.png"
                }
              />
            </div>

            {/* User Info */}
            <div className="text-left sm:ml-6 mt-4 sm:mt-0 flex-1">
              <h2 className="font-bold text-lg sm:text-xl text-green-300">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-green-200 text-sm">{age + ", " + gender}</p>
              )}
              {skills && (
                <p className="font-semibold text-green-400 mt-1 flex flex-wrap text-sm sm:text-base">
                  Skills: {skills.map((skill) => skill).join(", ")}
                </p>
              )}
              <p className="text-green-200 mt-2 break-words text-sm sm:text-base">
                {about}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 mt-4 sm:mt-0 sm:ml-4 self-center">
              <button
                className="bg-green-600 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-green-500 border-none 
                       shadow-md hover:shadow-green-400/70 transition duration-300 text-sm sm:text-base"
                onClick={() => {
                  reviewRequest("accepted", request._id);
                }}
              >
                Accept
              </button>
              <button
                className="bg-gray-800 text-green-400 px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-gray-700 border border-green-600 
                       shadow-md hover:shadow-green-400/70 transition duration-300 text-sm sm:text-base"
                onClick={() => {
                  reviewRequest("rejected", request._id);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
