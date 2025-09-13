import { useState } from "react";
import { FaLock, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import changeUserPassword from "../../../api/SettingApi/changeUserPassword";
import PasswordField from "./fields/PasswordFiels";

const Security = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      Swal.fire("Missing Fields", "Please fill in all password fields 🔑", "warning");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      Swal.fire("Mismatch", "New password and confirm password do not match ❌", "error");
      return;
    }

    if (formData.newPassword.length < 6) {
      Swal.fire("Weak Password", "Password should be at least 6 characters long ⚡", "info");
      return;
    }

    try {
      setIsLoading(true);
      const status = await changeUserPassword({
        prevpassword: formData.currentPassword,
        newpassword: formData.newPassword,
      });

      if (status === 200 || status === 201) {
        Swal.fire("Success ✅", "Your password has been updated successfully!", "success");
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        Swal.fire("Failed ❌", "Unable to update password. Try again later.", "error");
      }
    } catch (error) {
      if (error.response) {
        const detail = error.response.data?.message || JSON.stringify(error.response.data.message);
        Swal.fire("Unable to Change Password ❌", detail, "error");
      } else if (error.request) {
        Swal.fire("Network Error 🌐", "Server did not respond. Check your connection.", "error");
      } else {
        Swal.fire("Error ⚠️", error.message || "Unknown error occurred.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 border-b border-slate-200">
      <div className="flex items-center space-x-3 mb-6">
        <FaLock className="text-blue-600" size={24} />
        <h2 className="text-xl font-semibold text-slate-800">Security Settings</h2>
      </div>

      <div className="space-y-6">
        <PasswordField
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          isVisible={showPassword.current}
          onToggle={() => togglePasswordVisibility("current")}
          placeholder="Enter current password"
        />

        <PasswordField
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          isVisible={showPassword.new}
          onToggle={() => togglePasswordVisibility("new")}
          placeholder="Enter new password"
        />

        <PasswordField
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          isVisible={showPassword.confirm}
          onToggle={() => togglePasswordVisibility("confirm")}
          placeholder="Confirm new password"
        />
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
          <span>{isLoading ? "Updating..." : "Update Password"}</span>
        </button>
      </div>
    </div>
  );
};

export default Security;
