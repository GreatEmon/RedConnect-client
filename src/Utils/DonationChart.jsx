import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DonationChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/donations"); 
        // 🔹 Format data for chart
        const formatted = res.data.map((item) => ({
          date: new Date(item.date).toLocaleDateString(),
          amount: item.amount,
        }));
        setData(formatted);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDonations();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-700">Donation Trends</h2>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="amount" />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationChart;
