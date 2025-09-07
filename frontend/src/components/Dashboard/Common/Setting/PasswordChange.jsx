import React, { useRef } from "react";
import { FaLock } from "react-icons/fa"; // lock icon
import InputDetails from "../../../ui/InputDetails";
import Button from "../../../ui/Button";

const PasswordChange = () => {
  const newpasswordRef = useRef();
  const conformpasswordref = useRef();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      
      <div className="flex items-center gap-2  px-6 py-4 bg-gray-50 rounded-t-2xl">
        <FaLock className="text-orange-500" />
        <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
      </div>

      
      <div className="flex flex-col gap-5 p-6">
        <InputDetails title="New Password:" ref={newpasswordRef} />
        <InputDetails title="Confirm Password:" ref={conformpasswordref} />

        <Button
          title="Update Password"
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
        />
      </div>
    </div>
  );
};

export default PasswordChange;
