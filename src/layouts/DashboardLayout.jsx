import React, { use } from 'react';
import { Link, Outlet } from 'react-router';
import { FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthProvider';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  const {user} = use(AuthContext)

  // if(loading) return <Loading></Loading>
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar></Sidebar>
      
      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
