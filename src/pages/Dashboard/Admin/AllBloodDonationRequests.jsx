import React, { useState, useEffect, use } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthProvider";

const AllBloodDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState(""); // "", "pending", "inprogress", "done", "canceled"
  const [currentPage, setCurrentPage] = useState(1);
  const [requestsPerPage] = useState(10);
  const navigate = useNavigate()
  const { role, roleLoading } = use(AuthContext)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/donation-requestsall"); // backend API to get all donation requests
        setRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRequests();
  }, []);

  // Action handlers
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/donation-requests/${requestId}/status`, { status: newStatus });
      setRequests(requests.map(r => r._id === requestId ? r.status = newStatus : r));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (id) => {

    if (role === "volunteer" && !roleLoading) {
      return Swal.fire({
        title: "You are not admin",
        text: "You have no permission to delete this!",
        icon: "error"
      })
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/donation-requests/${id}`);
        setRequests(requests.filter(r => r._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  const filteredRequests = filterStatus ? requests.filter(r => r.status === filterStatus) : requests;

  // Pagination
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">All Blood Donation Requests</h2>

      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-semibold">Filter by Status:</label>
        <select
          className="select select-bordered"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Recipient Name</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Status</th>
              <th>Donor Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((req) => (
              <tr key={req._id}>
                <td>{req.recipientName}</td>
                <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td className="capitalize font-semibold">{req.status}</td>
                <td>
                  {req.status === "inprogress" && req.donorInfo
                    ? `${req.donorInfo.name} (${req.donorInfo.email})`
                    : "-"}
                </td>
                <td className="flex gap-2">
                  {/* Status buttons */}
                  {req.status === "inprogress" && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleStatusChange(req._id, "done")}
                      >
                        Done
                      </button>
                      <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleStatusChange(req._id, "canceled")}
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* Edit & Delete */}
                  {role === "admin" &&
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => navigate(`/dashboard/donation-request/edit/${req._id}`)}
                    >
                      Edit
                    </button>
                  }
                  {
                    role === "admin" && <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>
                  }


                  {/* View */}
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => window.location.href = `/dashboard/donation-request-details/${req._id}`}
                  >
                    View
                  </button>
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

export default AllBloodDonationRequests;
