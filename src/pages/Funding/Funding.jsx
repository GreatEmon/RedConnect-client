import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { Modal } from 'react-daisyui';

// Mock data for funds
const mockFunds = [
  { id: 1, name: 'Emon Sherkar', amount: 500, date: '2025-09-29' },
  { id: 2, name: 'John Doe', amount: 300, date: '2025-09-28' },
  { id: 3, name: 'Jane Smith', amount: 700, date: '2025-09-27' },
  // Add more mock data as needed
];

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const CheckoutForm = ({ onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    // Normally you would call your backend to create a Stripe PaymentIntent
    alert(`Simulated payment of $${amount} successful!`);
    onClose(); // close modal
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block font-semibold">Amount (BDT)</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="input input-bordered w-full"
        required
      />
      <label className="block font-semibold">Card Details</label>
      <div className="border p-2 rounded">
        <CardElement />
      </div>
      <button type="submit" className="btn btn-primary w-full mt-4">
        Pay
      </button>
    </form>
  );
};

const Funding = () => {
  const [funds] = useState(mockFunds);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination
  const totalPages = Math.ceil(funds.length / itemsPerPage);
  const displayedFunds = funds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen py-10 px-4 md:px-10 bg-red-50">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Funding</h2>

      <div className="flex justify-end mb-4">
        <button
          className="btn btn-primary"
          onClick={() => setModalOpen(true)}
        >
          Give Fund
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount (BDT)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedFunds.map((fund) => (
              <tr key={fund.id}>
                <td>{fund.name}</td>
                <td>{fund.amount}</td>
                <td>{fund.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Modal for Stripe Payment */}
      {/* <Modal open={modalOpen} onClickBackdrop={() => setModalOpen(false)}>
        <Modal.Header>
          <h3 className="text-lg font-bold">Give Fund</h3>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <CheckoutForm onClose={() => setModalOpen(false)} />
          </Elements>
        </Modal.Body>
      </Modal> */}
    </div>
  );
};

export default Funding;
