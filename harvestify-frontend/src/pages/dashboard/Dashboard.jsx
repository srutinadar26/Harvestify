import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-background dark:bg-dark-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background dark:bg-dark-bg p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;