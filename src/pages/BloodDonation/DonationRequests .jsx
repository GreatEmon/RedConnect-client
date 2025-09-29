import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import Loading from '../../components/Loading';




const DonationRequests = ({ user }) => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [load, setLoad] = useState(true)

 
  useEffect(() => {
      axios.get('http://localhost:3000/api/donation-requests').
      then(res => {
        setRequests(res.data)
        setLoad(false)
      })

  }, []);

  if(load) return <Loading></Loading>
  return (
    <div className="min-h-screen bg-red-50 py-10 px-4 md:px-10">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
        Pending Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No pending donation requests found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-red-600">
                {req.recipientName}
              </h3>
              <p>
                <span className="font-semibold">Location:</span> {req.recipientDistrict}, {req.recipientUpazila}
              </p>
              <p>
                <span className="font-semibold">Blood Group:</span> {req.bloodGroup}
              </p>
              <p>
                <span className="font-semibold">Date:</span> {req.donationDate}
              </p>
              <p>
                <span className="font-semibold">Time:</span> {req.donationTime}
              </p>
              <Link
                to={`/donation/${req._id}`}
                className="my-4 btn btn-sm btn-primary w-full text-center"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
