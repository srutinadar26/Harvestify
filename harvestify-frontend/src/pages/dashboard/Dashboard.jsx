import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { FaBars } from 'react-icons/fa';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false); // Close mobile sidebar when resizing to desktop
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (sidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen, isMobile]);

  return (
    <div className="flex h-screen bg-background dark:bg-dark-bg overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar - Responsive */}
      <div 
        className={`
          fixed md:relative z-50 h-full transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* Header with Mobile Menu Button */}
        <div className="relative z-30">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary text-white shadow-lg hover:bg-green-700 transition-all duration-300 active:scale-95 touch-manipulation"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            <FaBars size={20} />
          </button>
          
          <DashboardHeader isMobile={isMobile} />
        </div>
        
        {/* Main Content - Responsive Padding */}
        <main className={`
          flex-1 overflow-x-hidden overflow-y-auto 
          bg-background dark:bg-dark-bg 
          pt-16 md:pt-0
          px-3 sm:px-4 md:px-6 
          py-4 sm:py-5 md:py-6
          ${isMobile ? 'pb-20' : 'pb-6'}
        `}>
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;