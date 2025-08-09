import React from "react";
import { useLocation } from "react-router-dom";
import Card from "../Components/Card";
import InputDetails from "../../ui/InputDetails";
import UpdateuserFrom from "./UpdateuserFrom";
import { IoMdArrowRoundBack } from "react-icons/io";
const EditProfile = ({ provider, setProfile, setEdit, edit }) => {
  return (
    <div>
      <div
        className="top-25 relative w-20 md:w-auto md:absolute left-2.5 gap-1 cursor-pointer px-3 py-2 flex justify-center items-center bg-gray-300 rounded-md"
        onClick={() => setEdit(false)}
      >
        <IoMdArrowRoundBack /> Back
      </div>

      <div className=" min-h-screen flex px-10 gap-10 justify-center">
        <div className="hidden md:flex">
          <Card edit={edit} setEdit={setEdit} provider={provider} />
        </div>
        <UpdateuserFrom setProfile={setProfile} provider={provider} />
      </div>
    </div>
  );
};

export default EditProfile;
