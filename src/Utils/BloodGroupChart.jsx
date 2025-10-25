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

const COLORS = ["#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#8B5CF6", "#EC4899", "#14B8A6"];

const BloodGroupChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBloodGroups = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/blood-group-stats");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching blood group data:", error);
      }
    };
    fetchBloodGroups();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-red-600">
        Blood Group Distribution
      </h2>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={120}
            fill="#8884d8"
            dataKey="count"
            nameKey="bloodGroup"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BloodGroupChart;
