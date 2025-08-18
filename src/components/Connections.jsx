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
    return <h1>Loading...</h1>;
  }

  return (
    <div className="text-center justify-center my-10">
      <h1 className="text-bold text-5xl">Connections</h1>

      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, about, age, gender, skills } = connection;
        return (
          <div className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                alt="image"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold">
                {firstName} {lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              {skills && (
                <p className="text-sm">
                {skills.map((skill) => skill).join(", ")}
                </p>
              )}
              <p className="text-sm">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
