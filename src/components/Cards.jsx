import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const Cards = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, about, gender, skills } =user;
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
    // Fixed height card
    <div className="w-full max-w-sm md:max-w-[20rem] h-[500px] p-4 rounded-xl border border-green-600/20 shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-300 cursor-pointer flex flex-col mx-auto">
      {/* Image stays fixed at top */}
      <img
        className="w-full h-60 sm:h-56 md:h-60 object-cover rounded-lg mb-3 border border-green-600/20"
        alt="profile"
        src={photoUrl || "https://via.placeholder.com/300x300?text=No+Image"}
      />

      {/* Scrollable content below image */}
      <div className="flex-1 overflow-auto">
        <div className="text-white">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-1 break-words">
            {firstName + " " + lastName}
          </h2>

          {age && gender && (
            <p className="mb-2 text-sm sm:text-base text-gray-300 break-words">
              {age + ", " + gender}
            </p>
          )}

          {skills && (
            <p className="font-medium text-green-400 mt-1 flex flex-wrap text-sm sm:text-base break-words">
              {skills.map((skill) => skill).join(", ")}
            </p>
          )}

          {about && (
            <p className="mb-4 text-sm sm:text-base leading-snug break-words whitespace-pre-wrap text-gray-200">
              {about}
            </p>
          )}
        </div>
      </div>

      {/* Buttons stay at bottom */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mt-4">
        <button
          className="w-full sm:flex-1 bg-green-500 text-black font-semibold py-2 rounded-lg hover:bg-green-400 hover:shadow-md transition text-sm sm:text-base cursor-pointer"
          onClick={() => handleSendRequest("interested", _id)}
        >
          Send Request
        </button>
        <button
          className="w-full sm:flex-1 bg-red-500 text-black font-semibold py-2 rounded-lg hover:bg-red-400 hover:shadow-md transition text-sm sm:text-base cursor-pointer"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default Cards;
