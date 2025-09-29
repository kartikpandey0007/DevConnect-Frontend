import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading state

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res.data.data || []); // ensure array
    } catch (error) {
      console.error(error);
      setConnections([]); // fallback
    } finally {
      setIsLoading(false); // stop loader
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Shimmer />
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <h1 className="text-green-300 text-center mt-10 text-lg sm:text-xl md:text-2xl">
        No Connections
      </h1>
    );
  }


  return (
    <div className="min-h-screen px-4 py-12">
      
      <div className="w-full max-w-6xl mx-auto">
      
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-green-400 mb-10 drop-shadow-[0_6px_18px_rgba(0,255,102,0.18)]">
          Connections
        </h1>

        <div className="space-y-6">
          {connections.map((connection) => {
            const {
              _id,
              firstName,
              lastName,
              photoUrl,
              about,
              age,
              gender,
              skills,
            } = connection;

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
                  <Link to={"/chat"+"/"+_id}> <button
                    className="bg-green-500 text-black font-semibold px-5 py-2 rounded-full hover:bg-green-400 transition shadow-md cursor-pointer"
                  >
                    Chat
                  </button></Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
