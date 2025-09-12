import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const lineData = [
    { day: 1, value1: 70, value2: 25 },
    { day: 2, value1: 75, value2: 28 },
    { day: 3, value1: 60, value2: 40 },
    { day: 4, value1: 80, value2: 35 },
    { day: 5, value1: 85, value2: 50 },
    { day: 6, value1: 50, value2: 55 },
    { day: 7, value1: 65, value2: 60 },
    { day: 8, value1: 70, value2: 65 },
    { day: 9, value1: 90, value2: 70 },
    { day: 10, value1: 100, value2: 80 },
    { day: 11, value1: 95, value2: 90 },
    { day: 12, value1: 85, value2: 100 },
    { day: 13, value1: 90, value2: 95 },
    { day: 14, value1: 95, value2: 98 },
    { day: 15, value1: 100, value2: 100 },
  ];

  const pieData = [
    { name: "Mens", value: 52.46 },
    { name: "Womens", value: 28.77 },
    { name: "Kids", value: 21.91 },
  ];

  const COLORS = ["#00c853", "#ffeb3b", "#9c27b0"];

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white p-6 md:px-20 flex flex-col gap-10 overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center">DASHBOARD</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col items-center gap-4 w-full md:w-[200px]">
          <Link to="/profile">
            <button className="bg-[#2e2e30] text-white px-6 py-3 rounded-full w-full">
              Profile
            </button>
          </Link>
          <Link to="/">
            <button className="bg-white text-black font-bold px-6 py-3 rounded-full w-full">
              Dashboard
            </button>
          </Link>
          <Link to="/LeaderBoard">
            <button className="bg-[#2e2e30] text-white px-6 py-3 rounded-full w-full">
              Leaderboard
            </button>
          </Link>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2e2e30] rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-md overflow-hidden">
              <p className="text-sm text-gray-400">Yearly sales</p>
              <div className="text-3xl font-bold flex items-center gap-2 break-words">
                1,56,436 <TrendingUp className="text-green-400 w-5 h-5" />
                <span className="text-sm text-green-500 bg-green-900 px-2 py-1 rounded-full ml-2">
                  +9.4%
                </span>
              </div>
              <button className="bg-white text-black rounded-full px-4 py-2 mt-4 flex justify-between items-center text-sm font-semibold">
                View sales report <ArrowUpRight className="ml-2 w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#2e2e30] rounded-2xl p-6 shadow-md overflow-hidden">
              <p className="text-sm text-gray-400">Current Sales</p>
              <h2 className="text-2xl font-bold my-2 break-words">
                $ 10,170.02
              </h2>
              <p className="text-sm text-green-500">
                ▲ 12.3% <span className="text-gray-400"> $9970.02 Today</span>
              </p>
              <p className="text-sm mt-4 text-gray-400 underline cursor-pointer">
                View Reports
              </p>
            </div>

            <div className="bg-[#2e2e30] rounded-2xl p-6 shadow-md overflow-hidden">
              <p className="text-sm text-gray-400">Target Sales</p>
              <h2 className="text-2xl font-bold my-2 break-words">$ 23,000</h2>
              <p className="text-sm text-green-500">
                ▲ 11.2%{" "}
                <span className="text-gray-400"> $2,576.02 Increased</span>
              </p>
              <p className="text-sm mt-4 text-gray-400 underline cursor-pointer">
                View Target Reports
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#2e2e30] rounded-2xl p-6 md:col-span-2 shadow-md overflow-hidden">
              <p className="text-sm text-gray-400 mb-2">Performance</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={lineData}>
                  <Line
                    type="monotone"
                    dataKey="value1"
                    stroke="#ffff00"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="value2"
                    stroke="#00c853"
                    strokeWidth={2}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-center mt-4 text-gray-400">In Days</p>
            </div>

            <div className="bg-[#2e2e30] rounded-2xl p-6 shadow-md overflow-hidden">
              <p className="text-sm text-gray-400 mb-2">Stats</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    outerRadius={70}
                    innerRadius={40}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-sm mt-4 space-y-1">
                {pieData.map((item, index) => (
                  <p key={index} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>{item.value}%</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
