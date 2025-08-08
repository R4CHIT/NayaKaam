import React, { useEffect, useState } from "react";
import Card from "./Components/Card";
import getUserProfile from "../api/providersApi/getUserProfile";
import EditProfile from "./editProfile/EditProfile";
const Profilemain = () => {
  const [profile, setProfile] = useState([]);
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getUserProfile(setProfile);
  }, []);
  const handleEditProfile = () => {
    console.log("Edit Profile Clicked");
  };

  return (
    <>
      {edit ? (
        <EditProfile provider={profile} setProfile={setProfile}/>
      ) : (
        <div className="min-h-screen">
          <Card
            provider={profile}
            onEdit={handleEditProfile}
            setEdit={setEdit}
          />
        </div>
      )}
    </>
  );
};

export default Profilemain;
