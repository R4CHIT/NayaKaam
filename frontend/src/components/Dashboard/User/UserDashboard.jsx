import React, { useState } from 'react';
import SideBar from './SideBar';
import HomePage from './HomePage';
import Booking from './Booking';
import Historyuser from './Historyuser';
import Setting from '../Common/Setting';

const UserDashboard = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex">
      {/* Fixed Sidebar */}
      <div className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-[#0f1729] shadow-lg z-40">
        <SideBar active={active} setActive={setActive} />
      </div>

      {/* Scrollable Content */}
      <div className="ml-64 flex-1 px-6 py-10 bg-[#0f1729] text-white min-h-screen">
        {active === 0 && <HomePage />}
        {active === 1 && <Booking />}
        {active === 2 && <Historyuser />}
        {active === 3 && <Setting />}
      </div>
    </div>
  );
};

export default UserDashboard;
