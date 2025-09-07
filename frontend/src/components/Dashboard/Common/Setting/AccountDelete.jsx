import React, { useContext, useState } from "react";
import {
  FaTrashAlt,
  FaSignOutAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import Button from "../../../ui/Button"; // ✅ use your actual button component
import AuthContext from '../../../../context/AuthContext'

const AccountDelete = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const {Logout}  = useContext(AuthContext);

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }

    console.log("Account permanently deleted");
    setTimeout(() => setConfirmDelete(false), 2000);
  };

  const handleLogout = () => {
    Logout();
  };

  return (
    <div className="max-w-full">
      {/* Main Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-xl">
              <FaTrashAlt className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Account Settings
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage your account preferences
              </p>
            </div>
          </div>
        </div>

        
        <div className="p-6 space-y-6">
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
              Session
            </h3>
            <Button
              variant="secondary"
              onClick={()=>handleLogout()}
              className="w-full"
              title={
                <div className="flex items-center justify-center gap-2">
                  <FaSignOutAlt className="w-4 h-4" />
                  Sign Out
                </div>
              }
            ></Button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Danger Zone */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                Danger Zone
              </h3>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-red-900">Delete Account</h4>
                  <p className="text-sm text-red-700 mt-1">
                    Once you delete your account, there is no going back. This
                    action cannot be undone.
                  </p>
                </div>

                <Button
                  variant="danger"
                  onClick={handleDelete}
                  className={`w-full transition-all duration-300 ${
                    confirmDelete
                      ? "bg-red-700 hover:bg-red-800 animate-pulse"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                  title={
                    <div className="flex items-center justify-center gap-2">
                      <FaTrashAlt className="w-4 h-4" />
                      {confirmDelete ? "Confirm Delete" : "Delete Account"}
                    </div>
                  }
                >      
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDelete;
