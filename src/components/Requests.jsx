import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const reviewRequest = async (status, _id) => {
    try{
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{}, {
        withCredentials: true,  })

        if (res.status >= 200 && res.status < 300) {
        setFilteredRequests((prev) => prev.filter((r) => r._id !== _id));
      }

    }catch(err){
      console.error(err);
    }
  }

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      setRequests(res.data.data);
      setFilteredRequests(res.data.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (filteredRequests.length === 0) {
    return <h1 className="flex justify-center my-10">No Requests found</h1>;
  }

  return (
    <div className="text-center justify-center my-10">
      <h1 className="text-bold text-5xl">Requests</h1>

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
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto"
          >
            {/* User Image */}
            <div className="flex-shrink-0">
              <img
                alt="image"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>

            {/* User Info */}
            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              {skills && (
                <p className="font-bold">
                  Skills: {skills.map((skill) => skill).join(", ")}
                </p>
              )}
              <p>{about}</p>
            </div>

            {/* Buttons aligned vertically center */}
            <div className="flex gap-2 self-center">
              <button className="btn btn-primary" onClick={()=>{reviewRequest("accepted",request._id)}}>Accept</button>
              <button className="btn btn-secondary" onClick={()=>{reviewRequest("rejected",request._id)}}>Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
