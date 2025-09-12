"use client";
import React from "react";
import { Link } from "react-router-dom";

const leaderboardData = [
  { name: "Maximus Meridius", role: "Product Manager", score: 100 },
  { name: "Patrick Bateman", role: "Stock Manager", score: 99 },
  { name: "John Wick", role: "Production Manager", score: 98 },
  { name: "Odinson Thor", role: "Finance Agent", score: 97 },
  { name: "Odinson Loki", role: "Finance Agent", score: 96 },
  { name: "Thanos", role: "Finance Agent", score: 95 },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white flex flex-col lg:flex-row p-5 sm:p-10 md:px-[60px] md:py-[40px] lg:px-[100px] lg:pt-[40px] lg:pb-[20px]">
      <aside className="flex flex-col justify-center items-center bg-[#121212] gap-4 p-4 w-full lg:w-48 mb-5 lg:mb-0">
        <Link to="/profile">
          <button className="w-32 py-2 rounded-full bg-[#2a2a2a] hover:opacity-80">
            Profile
          </button>
        </Link>
        <Link to="/DashBoard">
          <button className="w-32 py-2 rounded-full bg-[#2a2a2a] hover:opacity-80">
            Dashboard
          </button>
        </Link>
        <Link to="/">
          <button className="w-32 py-2 rounded-full bg-white text-black font-bold">
            Leaderboard
          </button>
        </Link>
      </aside>

      <main className="flex-1 p-4 sm:p-8">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
          LEADERBOARD
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#2c2c2c] p-4 sm:p-6 rounded-xl shadow-lg mb-8 gap-4">
          <div className="text-left font-bold leading-tight text-sm sm:text-base">
            <div>Winner</div>
            <div>Winner</div>
            <div>Chicken</div>
            <div>Dinner</div>
          </div>

          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Winner"
            className="w-16 sm:w-20 h-16 sm:h-20"
          />

          <div className="text-center font-bold text-sm sm:text-lg">
            MONTHLY CHALLENGES
          </div>

          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Profile"
              className="w-14 sm:w-16 h-14 sm:h-16 rounded-full object-cover border-2 border-gray-500"
            />
            <div>
              <div className="font-bold text-base sm:text-lg">
                Maximus Meridius
              </div>
              <div className="text-gray-400 text-xs sm:text-sm">
                Product Manager
              </div>
              <div className="text-green-400 font-bold text-sm">
                Score: 100/100
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <table className="min-w-[600px] w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="bg-[#333]">
                <th className="text-left py-3 px-4 rounded-l-md">PLACE</th>
                <th className="text-left py-3 px-4">NAME</th>
                <th className="text-left py-3 px-4">ROLE</th>
                <th className="text-right py-3 px-4 rounded-r-md">SCORE</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((user, index) => (
                <tr
                  key={index}
                  className="bg-gradient-to-r from-[#2a2a2a] to-[#3a3a3a] hover:scale-[1.01] hover:shadow-lg transition-all duration-200 rounded-md"
                >
                  <td className="py-4 px-4">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : `${index + 1}.`}
                  </td>
                  <td className="py-4 px-4">{user.name}</td>
                  <td className="py-4 px-4">{user.role}</td>
                  <td className="py-4 px-4 text-right">{user.score}/100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
