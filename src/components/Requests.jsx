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
        { withCredentials: true }
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

  if (!filteredRequests) return <Shimmer />;

  if (filteredRequests.length === 0) {
    return (
      <h1 className="text-green-300 text-center mt-10 text-lg sm:text-xl md:text-2xl">
        No Requests found
      </h1>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12">
     
      <div className="w-full max-w-6xl mx-auto">
        
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-green-400 mb-10 drop-shadow-[0_6px_18px_rgba(0,255,102,0.18)]">
          Requests
        </h1>

       
        <div className="space-y-6">
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
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between  border border-gray-800 rounded-2xl p-5 sm:p-6 shadow-lg"
              >
               
                <div className="flex items-start sm:items-center gap-5">
                  <img
                    alt="profile"
                    src={photoUrl || "https://www.w3schools.com/howto/img_avatar.png"}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-green-500/70"
                  />

                  <div className="text-left">
                    <h2 className="text-green-300 text-xl sm:text-2xl font-semibold">
                      {firstName} {lastName}
                    </h2>

                    {age && gender && (
                      <p className="text-green-200 text-sm mt-1">{age}, {gender}</p>
                    )}

                    {skills && (
                      <p className="text-green-400 text-sm font-medium mt-2">
                        Skills: {Array.isArray(skills) ? skills.join(", ") : skills}
                      </p>
                    )}

                    {about && (
                      <p className="text-green-200 text-sm mt-2 max-w-xl">
                        {about}
                      </p>
                    )}
                  </div>
                </div>

                
                <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0">
                  <div className="flex gap-3 items-center">
                    <button
                      className="bg-green-500 text-black font-semibold px-5 py-2 rounded-full hover:bg-green-400 transition shadow-md cursor-pointer"
                      onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="bg-gray-800 text-green-300 px-4 py-2 rounded-full hover:bg-gray-700 transition cursor-pointer"
                      onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
