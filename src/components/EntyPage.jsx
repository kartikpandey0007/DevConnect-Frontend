import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Shimmer from "./Shimmer";
import Cards from "./Cards";

const EntryPage = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const getFeed = async () => {
    if (feed) return; // already have feed
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return (
      <div className="bg-black min-h-screen flex items-center justify-center px-4">
        <Shimmer />
      </div>
    );

  if (feed.length === 0) {
    return (
      <h1 className="flex justify-center font-bold my-3 text-green-400 bg-black min-h-screen items-center px-4 text-center">
        No User Found, Ask Your Friends to Join
      </h1>
    );
  }

  // Filter feed based on skills
  const filteredFeed = feed.filter((user) => {
    if (!search) return true; // show all if search is empty
    return user.skills?.some((skill) =>
      skill.toLowerCase().includes(search.toLowerCase())
    );
  });

return (
    <div className="flex flex-col items-center justify-start bg-black min-h-screen text-green-400 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 -my-1 drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] text-center sm:text-left">
          Users
        </h1>

        {/* Search Bar */}
        <div className="w-full flex justify-center sm:justify-start py-4">
          <div className="w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-green-500 bg-black text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-400"
            />
          </div>
        </div>

        <div className="w-full">
          {/* center items inside each grid cell to avoid overflow from card widths */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredFeed.map((key) => (
              <Cards key={key._id} user={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;
