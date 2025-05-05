import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((state) => state.feed);
  console.log(userFeed?.length);

  const fetchFeed = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/feed`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(`Fetching feed failed with stattus ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      dispatch(addFeed(data));
    } catch (err) {
      console.error(`Error in fetching feed ${err.message}`);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    userFeed?.length ? (
      <div className="w-full">
        <div className="flex justify-center mt-20 mb-3">
          <UserCard userFeed={userFeed[0]} />
        </div>
      </div>
    ) : <h1 className="text-center mt-30">There's no feed</h1>
  );
};

export default Feed;
