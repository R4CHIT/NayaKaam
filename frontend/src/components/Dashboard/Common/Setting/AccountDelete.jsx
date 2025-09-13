import React, { use, useState } from "react";
import { FaSignOutAlt, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import AuthContext from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PasswordField from "./fields/PasswordFiels";
import deleteAccount from "../../../api/dashboardApi/deleteAccount";
import Swal from "sweetalert2";

const AccountDelete = () => {
  const navigate = useNavigate();
  const {Logout} = React.useContext(AuthContext)
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
 const [password, setPassword] = useState("");
 const [showPassword, setShowPassword] = useState(false);

  const handleLogout =async () => {
    Logout(navigate);
  };

  const handleDeleteAccount = async () => {
  try {
    const status = await deleteAccount(password);

    if (status === 204 || status === 200) {
      await Swal.fire({
        icon: "success",
        title: "Account Deleted",
        text: "Your account has been deleted successfully ✅",
        confirmButtonColor: "#dc2626",
      });
      Logout(navigate)
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Could not delete your account. Please try again ❌",
        confirmButtonColor: "#dc2626",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text:
        error.response?.data ||
        "Something went wrong. Check your connection and try again.",
      confirmButtonColor: "#dc2626",
    });
  }
};
  return (
    <>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <FaExclamationTriangle className="text-blue-600" size={24} />
          <h2 className="text-xl font-semibold text-slate-800">
            Account Actions
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <FaSignOutAlt className="text-slate-600" size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  Logout
                </h3>
                <p className="text-slate-600 mb-4">
                  Sign out of your account on this device. You'll need to sign
                  in again to access your account.
                </p>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
                >
                  <FaSignOutAlt size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-6 border border-red-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <FaTrash className="text-red-600" size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-medium text-red-800 mb-2">
                  Delete Account
                </h3>
                <p className="text-red-600 mb-4">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                >
                  <FaTrash size={16} />
                  <span>Delete Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteConfirm && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl p-6 max-w-md w-full">
      <div className="flex items-center space-x-3 mb-4">
        <FaExclamationTriangle className="text-red-600" size={24} />
        <h3 className="text-lg font-semibold text-slate-800">
          Confirm Account Deletion
        </h3>
      </div>

      <p className="text-slate-600 mb-6">
        Are you absolutely sure you want to delete your account? This action is
        permanent and cannot be undone. All your data will be permanently deleted.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDeleteAccount(password);
        }}
        className="space-y-4"
      >
        
        <PasswordField
          label="Enter your password to confirm"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          isVisible={showPassword}
          onToggle={() => setShowPassword((prev) => !prev)}
          placeholder="Enter your password"
        />

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(false)}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </>
  );
};

export default AccountDelete;
