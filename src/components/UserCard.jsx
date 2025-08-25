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
        `${BASE_URL}/request/send/${status}/${toUSerId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(toUSerId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-3xl p-4 rounded-xl border border-green-600/30 shadow-lg 
             hover:shadow-2xl transform hover:scale-105 transition duration-200 flex flex-col"
    >
      <img
        className="w-full h-60 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg mb-3 border border-green-600/30 bg-black"
        alt="profile"
        src={
          photoUrl ||
          "https://via.placeholder.com/600x400/000000/FFFFFF?text=No+Image"
        }
      />
      <div className="flex-1 text-green-200 overflow-auto">
        <h2 className="text-xl sm:text-2xl font-semibold mb-1 break-words">
          {firstName + " " + lastName}
        </h2>

        {age && gender && (
          <p className="mb-2 text-green-300 break-words">
            {age + ", " + gender}
          </p>
        )}

        {skills && skills.length > 0 && (
          <p className="font-medium mb-2 text-green-400 break-words text-sm sm:text-base">
            {skills.join(", ")}
          </p>
        )}

        {about && (
          <p className="mb-4 text-green-200 text-sm sm:text-base break-words whitespace-pre-wrap">
            {about}
          </p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
        <button
          className="flex-1 bg-green-500 text-black font-semibold py-2 rounded-md hover:bg-green-400 transition cursor-pointer"
          onClick={() => handleSendRequest("interested", _id)}
        >
          Send Request
        </button>
        <button
          className="flex-1 bg-red-500 text-black font-semibold py-2 rounded-md hover:bg-red-400 transition cursor-pointer"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default UserCard;
