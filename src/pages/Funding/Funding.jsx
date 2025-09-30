import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import Swal from "sweetalert2";
import axios from "axios";
import { use } from "react";
import {AuthContext} from '../../context/AuthProvider'
import Loading from "../../components/Loading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const Funding = () => {
  const { user } = use(AuthContext); // { name, email }
  const [amount, setAmount] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Load all fundings on component mount
  const fetchFundings = async () => {
    try {
      const res = await axios.get("https://red-connect-backend.vercel.app/api/fundings", {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.accessToken}`
        }
      });
      setFundings(res.data.fundings);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFundings();
  }, []);

  // Create PaymentIntent
  const createPaymentIntent = async () => {
    if (!amount || Number(amount) <= 0) {
      return Swal.fire("Error", "Enter a valid amount", "error");
    }

    try {
      const res = await fetch("https://red-connect-backend.vercel.app/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Number(amount) * 100 }),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.accessToken}`
        }
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);


    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to create payment", "error");
    }
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      // Save funding info to backend
      await axios.post("https://red-connect-backend.vercel.app/api/fundings", {
        userName: user.displayName,
        userEmail: user.email,
        amount: Number(amount),
        paymentIntentId,
        date: new Date(),
      }, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${user.accessToken}`
        }
      });

      // Refresh table
      fetchFundings();

      // Clear payment
      setAmount("");
      setClientSecret("");

      Swal.fire("Success", "Funding successful!", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save funding", "error");
    }
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentFundings = fundings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(fundings.length / itemsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Funding Page</h2>

      {/* Amount Input */}
      {!clientSecret && (
        <div className="flex gap-3 mb-6">
          <input
            type="number"
            className="input input-bordered flex-1"
            placeholder="Enter amount in USD"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="btn btn-primary" onClick={createPaymentIntent}>
            Proceed to Pay
          </button>
        </div>
      )}

      {/* Stripe Payment */}
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            amount={amount}
            user={user}
            onSuccess={handlePaymentSuccess}
          />
        </Elements>
      )}

      {/* Fundings Table */}
      <h3 className="text-xl font-semibold mt-10 mb-3">All Fundings</h3>
      {loading ? (
        <Loading></Loading>
      ) : fundings.length === 0 ? (
        <p className="my-5 text-xl font-bold text-red-600">No fundings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Amount (USD)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentFundings.map((f, index) => (
                <tr key={f._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{f.userName}</td>
                  <td>{f.userEmail}</td>
                  <td>{f.amount}</td>
                  <td>{new Date(f.date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`btn btn-sm ${
                  num === currentPage ? "btn-primary" : "btn-outline"
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Funding;
