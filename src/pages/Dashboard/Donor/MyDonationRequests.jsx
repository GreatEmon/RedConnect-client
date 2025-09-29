import React, { use, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthProvider';
import Swal from 'sweetalert2';

const MyDonationRequests = () => {
  const navigate = useNavigate();
  const { user } = use(AuthContext)
  const [requests, setRequests] = useState([]);

  // Fetch current user info and his donation requests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:3000/api/recentall?email=${user.email}`); // current logged in donor
        setRequests(userRes.data);
      } catch (err) {
        console.error(err);
        // navigate('/login');
      }
    };
    fetchData();
  }, []);

  const handleDelete = (_id) => {
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
        await axios.delete(`http://localhost:3000/api/donation-requests/${_id}`);
        setRequests(requests.filter(r => r._id !== _id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  };

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:3000/api/donation-requests/${requestId}/status`, { status: newStatus });
      setRequests(requests.map(r => r._id === requestId ? r.status = newStatus: r));
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-red-100 p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-red-600">
          All Donation Request
        </h2>
      </div>

      {/* Recent Donation Requests */}
      {requests.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Recipient Name</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood Group</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id}>
                  <td>{r.recipientName}</td>
                  <td>{r.recipientDistrict}, {r.recipientUpazila}</td>
                  <td>{r.donationDate}</td>
                  <td>{r.donationTime}</td>
                  <td>{r.bloodGroup}</td>
                  <td className="capitalize">{r.status}</td>
                  <td>
                    {r.status === 'inprogress' && (
                      <div>
                        <p>{user?.displayName}</p>
                        <p>{user?.email}</p>
                      </div>
                    )}
                  </td>
                  <td className="space-x-2">
                    <button
                      onClick={() => navigate(`/dashboard/donation-request/edit/${r._id}`)}
                      className="btn btn-sm btn-outline btn-primary"
                    >
                      Edit
                    </button>
                    {r.status === 'inprogress' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(r._id, 'done')}
                          className="btn btn-sm btn-success"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => handleStatusChange(r._id, 'canceled')}
                          className="btn btn-sm btn-error"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => { handleDelete(r._id) }}
                      className="btn btn-sm btn-warning"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/donation/${r._id}`)}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default MyDonationRequests;
