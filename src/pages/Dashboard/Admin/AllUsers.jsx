import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEllipsisV } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); // "" = all, "active", "blocked"
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/usersall"); // Your backend endpoint
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (email) => {
    try {
      await axios.put(`http://localhost:3000/api/block?email=${email}`);
      setUsers(users.map(u => u.email === email ? { ...u, status: "blocked" } : u));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnblock = async (email) => {
    try {
      await axios.put(`http://localhost:3000/api/unblock?email=${email}`);
      setUsers(users.map(u => u.email === email ? { ...u, status: "active" } : u));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMakeVolunteer = async (email) => {
    try {
      await axios.put(`http://localhost:3000/api/role?email=${email}&role=volunteer`);
      setUsers(users.map(u => u.email === email ? { ...u, role: "volunteer" } : u));
    } catch (err) {
      console.error(err);
    }
  };

  const handleMakeAdmin = async (email) => {
    try {
      await axios.put(`http://localhost:3000/api/role?email=${email}&role=admin`);
      setUsers(users.map(u => u.email === email ? { ...u, role: "admin" } : u));
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered users
  const filteredUsers = filterStatus ? users.filter(u => u.status === filterStatus) : users;

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">All Users</h2>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">Filter by Status:</label>
        <select
          className="select select-bordered"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.email}>
                <td>
                  <img
                    src={user.avatar || "https://via.placeholder.com/40"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td className="capitalize">{user.role}</td>
                <td className={`capitalize font-semibold ${user.status === "active" ? "text-green-500" : "text-red-500"}`}>
                  {user.status}
                </td>
                <td>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                      <FaEllipsisV />
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-white rounded-box w-52">
                      {user.status === "active" && (
                        <li>
                          <button onClick={() => handleBlock(user.email)}>Block</button>
                        </li>
                      )}
                      {user.status === "blocked" && (
                        <li>
                          <button onClick={() => handleUnblock(user.email)}>Unblock</button>
                        </li>
                      )}
                      {user.role !== "volunteer" && (
                        <li>
                          <button onClick={() => handleMakeVolunteer(user.email)}>Make Volunteer</button>
                        </li>
                      )}
                      {user.role !== "admin" && (
                        <li>
                          <button onClick={() => handleMakeAdmin(user.email)}>Make Admin</button>
                        </li>
                      )}
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`btn btn-sm ${currentPage === i + 1 ? "btn-primary" : "btn-ghost"}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
