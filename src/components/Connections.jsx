import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Connections = () => {
  const [connections, setConnections] = useState([]);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      setConnections(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (connections.length === 0) {
    return (
      <h1 className="text-green-300 text-center mt-10 text-lg sm:text-xl md:text-2xl">
        No Connections
      </h1>
    );
  }

  const handleChat = (connectionId) => {
    // Replace with your chat navigation or functionality
    console.log("Chat with:", connectionId);
  };

  return (
    <div className="text-center my-6 sm:my-10 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 mb-6 sm:mb-8 drop-shadow-lg">
        Connections
      </h1>

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
            className="flex flex-col sm:flex-row items-start sm:items-center 
                 bg-black text-green-400 rounded-xl shadow-lg shadow-green-400/30 
                 p-4 sm:p-6 mx-auto mb-4 sm:mb-6 w-full sm:w-11/12 md:w-3/4 lg:w-2/3 
                 transition-transform duration-300 hover:scale-105"
          >
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <img
                alt="profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-green-600 object-cover"
                src={
                  photoUrl || "https://www.w3schools.com/howto/img_avatar.png"
                }
              />
            </div>

            <div className="flex-1 sm:ml-6 mt-4 sm:mt-0 flex flex-col sm:flex-row justify-between items-start w-full">
              <div className="text-left w-full sm:w-auto">
                <h2 className="font-bold text-lg sm:text-xl text-green-300">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-green-200 text-xs sm:text-sm">
                    {age + ", " + gender}
                  </p>
                )}
                {skills && (
                  <p className="font-semibold text-green-400 mt-1 flex flex-wrap text-xs sm:text-sm">
                    Skills: {skills.map((skill) => skill).join(", ")}
                  </p>
                )}
                <p className="text-green-200 mt-2 text-sm sm:text-base break-words">
                  {about}
                </p>
              </div>

              <div className="mt-3 sm:mt-0 sm:ml-4 flex-shrink-0">
                <button
                  className="bg-green-600 text-black font-semibold py-2 px-5 rounded-lg 
                       hover:bg-green-500 border-none shadow-md hover:shadow-green-400/70 
                       transition duration-300 text-sm sm:text-base w-full"
                  onClick={() => handleChat(_id)}
                >
                  Chat
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
