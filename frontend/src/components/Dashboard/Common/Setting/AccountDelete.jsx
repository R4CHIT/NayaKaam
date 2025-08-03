import React, { useContext, useState } from 'react';
import Button from '../../../ui/Button';
import AuthContext from '../../../../context/AuthContext';

const AccountDelete = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    // 🔥 Trigger delete API here
    console.log('Account permanently deleted');
  };

  const handleLogout = () => {
    logout();
    console.log('Logged out');
  };

  return (
    <div className="rounded-lg shadow-md p-6 border hover:shadow-lg transition-shadow duration-200 border-[#374151] bg-[#1e293b]">
      <div className="text-center text-xl text-orange-500 font-semibold">
        <h1>Account Settings</h1>
      </div>

      <div className="flex flex-col gap-4 py-6">
        <Button
          className={`bg-red-600 hover:bg-red-700 text-white`}
          onClick={handleDelete}
          title={"Delete"}
        >
          {confirmDelete ? 'Click Again to Confirm Delete' : 'Delete Account'}
        </Button>

        <Button
          className="bg-red-400 hover:bg-red-500 text-white"
          onClick={handleLogout}
          title={"logout"}
        >
          Logout
        </Button>

        <p className="text-md text-gray-400 text-center mt-4">
          ⚠️ Deleting your account is <span className="text-red-400 font-semibold">permanent</span> and cannot be undone.
        </p>
      </div>
    </div>
  );
};

export default AccountDelete;
