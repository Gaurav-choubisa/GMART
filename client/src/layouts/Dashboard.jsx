import React from 'react';
import UserMenu from '../components/UserMenu';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <section className="bg-white min-h-screen">
      <div className="container mx-auto p-3 grid lg:grid-cols-[280px,1fr]">
        
        {/* Left - User Menu */}
        <div className='py-4 sticky top-24 overflow-y-auto hidden lg:block'>
          <UserMenu />
        </div>

        {/* Right - Main Content */}
        <div className="bg-white p-4 rounded-md shadow">
          <Outlet/>
        </div>
        
      </div>
    </section>
  );
};

export default Dashboard;
