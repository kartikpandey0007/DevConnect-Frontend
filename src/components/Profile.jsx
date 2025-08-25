import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    <div className="min-h-screen flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
        {user && <EditProfile user={user} />}
      </div>
    </div>
  );
};

export default Profile;
