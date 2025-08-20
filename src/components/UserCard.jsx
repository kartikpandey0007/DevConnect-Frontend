import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, about, gender, skills } = user;
  const dispatch = useDispatch();

  const handleSendRequest = (status, toUSerId) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUSerId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(toUSerId))
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm my-3">
        <figure>
          <img
            className="w-full h-80 object-cover"
            src={photoUrl || "https://www.w3schools.com/howto/img_avatar.png"}
            alt="Photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          {skills && (
            <p className="font-bold">
              {skills.map((skill) => skill).join(", ")}
            </p>
          )}
          <p>{about}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Send Request
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
