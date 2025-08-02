import React from 'react';
import { useState } from 'react';
import SideBar from './SideBar';
import HomePage from './HomePage';
import Booking from './Booking';

const UserDashboard = () => {
  const [active,setActive] = useState(0)
  return (
    <div className="relative top-20 p-4">
      
      <div className='flex gap-5 h-full'>
        <SideBar active={active} setActive={setActive}/>
         <div className="min-h-auto w-full bg-[#0f1729] text-white px-6 py-10 flex flex-col gap-12">
        {active == 0 && <HomePage />}
        {active == 1 && <Booking />}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
