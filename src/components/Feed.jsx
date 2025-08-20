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
     if (feed) return; // If feed data is already present, no need to fetch again
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

 if (!feed) return <div><Shimmer/></div>;

 if(feed.length === 0) {
  return <h1 className="flex justify-center font-bold my-3">No User Found, Ask Your Friends to Join</h1>
 }


  return (
    <div className="flex flex-col items-center justify-center">
      <UserCard user = {feed[0]}/>
    </div>
  );
};

export default Feed;
