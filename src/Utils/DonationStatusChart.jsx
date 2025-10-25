import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  pending: "#FBBF24",     // amber
  "in progress": "#3B82F6", // blue
  done: "#22C55E",        // green
  canceled: "#EF4444",    // red
};

const DonationStatusChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStatusSummary = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/donation-status-summary");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching donation status summary:", error);
      }
    };
    fetchStatusSummary();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-red-600">
        Donation Status Summary
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="status"
            cx="50%"
            cy="50%"
            innerRadius={70} // Creates donut
            outerRadius={120}
            fill="#8884d8"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.status] || "#8884d8"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonationStatusChart;
