import React, { useState } from "react";
import { FaDesktop, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const LoginActivity = () => {
  const [logins, setLogins] = useState([
    {
      ip_address: "192.168.1.10",
      device_model: "Pixel 7 Pro",
      os: "Android 13",
      browser: "Chrome",
      timestamp: "2025-09-07T12:30:00Z",
    },
    {
      ip_address: "172.16.0.5",
      device_model: "iPhone 14",
      os: "iOS 17",
      browser: "Safari",
      timestamp: "2025-09-06T18:45:00Z",
    },
    {
      ip_address: "203.0.113.50",
      device_model: "MacBook Pro 16\"",
      os: "macOS 14",
      browser: "Safari",
      timestamp: "2025-09-05T09:20:00Z",
    },
  ]);

  return (
    <div className="bg-white rounded-2xl border shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Login Activity</h2>
      <div className="space-y-4">
        {logins.map((login, i) => (
          <div key={i} className="flex items-center gap-3 border-b pb-2">
            <FaDesktop className="text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-800">
                {login.device_model} ({login.os}) - {login.browser}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <FaMapMarkerAlt /> {login.ip_address}
              </p>
            </div>
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <FaClock /> {new Date(login.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginActivity;
