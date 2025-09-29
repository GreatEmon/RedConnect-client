import React, { use } from 'react';
import { Link, Outlet } from 'react-router';
import { FaUser, FaHome, FaSignOutAlt } from 'react-icons/fa';
import Loading from '../components/Loading';
import { AuthContext } from '../context/AuthProvider';

const DashboardLayout = () => {
  const {user, loading} = use(AuthContext)

  if(loading) return <Loading></Loading>
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col p-4">
        <div className="text-2xl font-bold text-red-600 mb-8">Dashboard</div>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard/profile" className="flex items-center gap-2 p-2 hover:bg-red-100 rounded">
            <FaUser /> Profile
          </Link>
          <Link to="/" className="flex items-center gap-2 p-2 hover:bg-red-100 rounded">
            <FaHome /> Home
          </Link>
          <Link to="/logout" className="flex items-center gap-2 p-2 hover:bg-red-100 rounded">
            <FaSignOutAlt /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
