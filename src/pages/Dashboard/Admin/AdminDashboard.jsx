import React, { useEffect, useState } from "react";
import { FaUsers, FaDonate, FaHandHoldingMedical } from "react-icons/fa";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFunds: 0,
    totalDonationRequests: 0,
  });


  // Fetch dashboard data
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/dashboard-stats");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Section */}
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Welcome, Admin!</h2>

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
            <p className="text-2xl font-bold">{stats.totalFunds}</p>
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

      {/* Recent Donation Requests Table */}
      {/* {recentRequests.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Donation Requests</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Location</th>
                  <th>Blood Group</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td className={`font-semibold ${req.status === "pending" ? "text-yellow-500" : req.status === "inprogress" ? "text-blue-500" : req.status === "done" ? "text-green-500" : "text-red-500"}`}>
                      {req.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default AdminDashboard;
