import React, { use, useEffect, useState } from "react";
import { FaUsers, FaDonate, FaHandHoldingMedical } from "react-icons/fa";
import axios from "axios";
import {AuthContext} from '../../../context/AuthProvider'
import Loading from '../../../components/Loading'

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalDonationRequests: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const {role, roleLoading, user} = use(AuthContext)

  document.title = "Admin Dashboard"


  // Fetch dashboard data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true)
        const res = await axios.get("https://red-connect-backend.vercel.app/api/admin/dashboard-stats", {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.accessToken}`
        }
      });
        setStats(res.data);
        setLoadingStats(false)
      } catch (err) {
        console.error(err);
        setLoadingStats(false)
      }
    };

    fetchStats();
  }, []);

  if(roleLoading || loadingStats) return <Loading></Loading>

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Welcome, {role === "admin " ? "Admin!" : "Volunteer!"}</h2>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Users */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
          <FaUsers className="text-4xl text-red-600" />
          <div>
            <p className="text-2xl font-bold">{stats.totalUsers}</p>
            <p className="text-gray-500">Total Users (Donors)</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
          <FaDonate className="text-4xl text-green-600" />
          <div>
            <p className="text-2xl font-bold">{stats.totalFunding}</p>
            <p className="text-gray-500">Total Funds</p>
          </div>
        </div>

        {/* Total Blood Donation Requests */}
        <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
          <FaHandHoldingMedical className="text-4xl text-blue-600" />
          <div>
            <p className="text-2xl font-bold">{stats.totalDonationRequests}</p>
            <p className="text-gray-500">Total Donation Requests</p>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default AdminDashboard;
