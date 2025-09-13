import React, { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaSave } from "react-icons/fa";
import AuthContext from "../../../../context/AuthContext";
import UserInfoChange from "../../../api/SettingApi/UserInfoChange";
import swal from "sweetalert2";
import InputField from "./fields/Inputfields";

const InformationChange = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const [accountinfo, setAccountInfo] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });

  const handleSave = async () => {
    try {
      setIsLoading(true);

      const status = await UserInfoChange(accountinfo);

      if (status === 200 || status === 201) {
        swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been updated successfully ✅",
          confirmButtonColor: "#2563eb",
        });
      } else {
        swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Could not update profile. Please try again ❌",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (err) {
      console.error(err);
      swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.detail || "Something went wrong!",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border-b border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <FaUser className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold text-slate-800">
          Profile Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Username
          </label>
          <InputField
            icon={FaUser}
            type="text"
            value={accountinfo.username}
            onChange={(e) =>
              setAccountInfo((prev) => ({ ...prev, username: e.target.value }))
            }
            placeholder="Enter username"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <InputField
            icon={FaEnvelope}
            type="email"
            value={accountinfo.email}
            onChange={(e) =>
              setAccountInfo((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter email"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FaSave size={16} />
          )}
          <span>{isLoading ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>
    </div>
  );
};

export default InformationChange;
