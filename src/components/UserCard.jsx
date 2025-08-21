import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, about, gender, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, toUSerId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUSerId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(toUSerId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-120 p-4 m-4 rounded-2xl bg-black border border-green-500 shadow-[0_0_20px_rgba(0,255,102,0.3)] hover:shadow-[0_0_30px_rgba(0,255,102,0.6)] transition-all duration-300 cursor-pointer">
      <img
        className="w-full h-90 object-cover rounded-xl mb-3 border border-green-500"
        alt="profile"
        src={photoUrl || "https://via.placeholder.com/300x300?text=No+Image"}
      />
      <div className="text-green-200">
        <h2 className="text-xl font-bold mb-1">{firstName + " " + lastName}</h2>
        {age && gender && <p className="mb-2">{age + ", " + gender}</p>}
        {skills && skills.length > 0 && (
          <p className="font-semibold mb-2">{skills.join(", ")}</p>
        )}
        {about && <p className="mb-4">{about}</p>}

        <div className="flex justify-between gap-4">
          <button
            className="flex-1 bg-green-500 text-black font-bold py-2 rounded-lg hover:bg-green-400 hover:shadow-[0_0_12px_#00ff66] transition cursor-pointer"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Send Request
          </button>
          <button
            className="flex-1 bg-red-600 text-black font-bold py-2 rounded-lg hover:bg-red-500 hover:shadow-[0_0_12px_#ff4444] transition cursor-pointer"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
