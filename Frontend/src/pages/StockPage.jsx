"use client";
import React, { useState } from "react";


const DropdownItem = ({ title, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-300 text-black px-4 py-3 rounded-md w-full sm:w-64 shadow-sm">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <span className="text-sm sm:text-base">{title}</span>
        <svg
          className={`w-4 h-4 text-blue-500 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {open && (
        <div className="mt-2 text-sm pl-2 text-black">
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="py-0.5">
              {key}: {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const RestockItem = ({ label, value, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(value);

  const handleSave = () => {
    onChange(parseInt(input) || 0);
    setEditing(false);
  };

  return (
    <div className="bg-gray-300 text-black px-4 py-3 rounded-md w-full sm:w-64">
      {!editing ? (
        <div className="flex justify-between items-center">
          <span>{label}: {value}</span>
          <button
            onClick={() => setEditing(true)}
            className="bg-black hover:bg-gray-800 text-white text-sm px-4 py-1 rounded-md flex items-center gap-1 ml-4"
          >
            Edit 
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2">
          <span className="whitespace-nowrap text-sm">{label}:</span>
          <input
            type="number"
            className="w-full px-2 py-1 rounded-md text-sm border border-gray-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded-md"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

const StockPage = () => {
  const [tab, setTab] = useState("excel");

  const [data, setData] = useState({
    men: { Pants: 12, Shirts: 24 },
    women: { Dresses: 18, Tops: 20, Kurthas: 23 },
    kids: { Pants: 10, Shirts: 15 },
  });

  const handleUpdate = (section, item, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [item]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black space-y-6 text-white px-4">
      {/* Toggle Buttons */}
      <div className="bg-[#1f1f1f] rounded-full p-1 flex space-x-1">
        <button
          onClick={() => setTab("excel")}
          className={`px-6 sm:px-10 py-2 rounded-full text-sm transition ${
            tab === "excel"
              ? "bg-white text-black"
              : "text-white hover:bg-gray-700"
          }`}
        >
          Excel Data
        </button>
        <button
          onClick={() => setTab("remark")}
          className={`px-6 sm:px-10 py-2 rounded-full text-sm transition ${
            tab === "remark"
              ? "bg-white text-black"
              : "text-white hover:bg-gray-700"
          }`}
        >
          Restock
        </button>
      </div>

      {/* Data Display Section */}
      <div className="bg-[#1f1f1f] px-6 sm:px-16 py-10 rounded-xl shadow-lg space-y-4 w-full sm:w-auto">
        {tab === "excel" ? (
          <>
            <DropdownItem title="Men's Wear" data={data.men} />
            <DropdownItem title="Women's Wear" data={data.women} />
            <DropdownItem title="Kid's Wear" data={data.kids} />
          </>
        ) : (
          <>
            <RestockItem
              label="Men's Pants"
              value={data.men.Pants}
              onChange={(val) => handleUpdate("men", "Pants", val)}
            />
            <RestockItem
              label="Men's Shirts"
              value={data.men.Shirts}
              onChange={(val) => handleUpdate("men", "Shirts", val)}
            />
            <RestockItem
              label="Kid's Pants"
              value={data.kids.Pants}
              onChange={(val) => handleUpdate("kids", "Pants", val)}
            />
            <RestockItem
              label="Kid's Shirts"
              value={data.kids.Shirts}
              onChange={(val) => handleUpdate("kids", "Shirts", val)}
            />
            <RestockItem
              label="Ladies Dress"
              value={data.women.Dresses}
              onChange={(val) => handleUpdate("women", "Dresses", val)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default StockPage;
