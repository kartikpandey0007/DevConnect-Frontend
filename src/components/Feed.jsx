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
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
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
      <div className=" min-h-screen flex items-center justify-center px-4">
        <Shimmer />
      </div>
    );

  if (feed.length === 0) {
    return (
      <h1 className="flex justify-center font-bold my-3 text-green-400 text-3xl min-h-screen items-center px-4 text-center">
         Refresh Page To Find More Users
      </h1>
    );
  }

  return (
    <div className=" min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div className="w-full max-w-xl">
       <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-green-400 mb-10 drop-shadow-[0_6px_18px_rgba(0,255,102,0.18)]">
          Your Feed
        </h1>

        {/* Single centered card with large height */}
        <div className="flex justify-center mx-20">
          <div className="w-full">
            <UserCard user={feed[0]} className="h-[600px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
