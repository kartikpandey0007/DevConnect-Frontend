import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import Shimmer from "./Shimmer";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return; // Only fetch if feed is empty
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

  return (
    <div className="bg-black min-h-screen text-green-400 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 
                     -my-1 drop-shadow-[0_0_8px_rgba(0,255,0,0.8)] text-center mb-6"
        >
          Your Feed
        </h1>

        {/* Centering UserCard */}
        <div className="w-full max-w-md mx-auto">
          <UserCard user={feed[0]} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
