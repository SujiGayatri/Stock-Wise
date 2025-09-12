"use client";
import React, { useState } from "react";
import {
  Mail,
  Download,
  ChevronDown,
  Plus,
  Star,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [profile] = useState({
    name: "Gladiator Granny",
    role: "Product Manager",
    age: 56,
    experience: "6 years",
    ctc: "12.5L",
    location: "Ahmedabad, Gujarat",
    phone: "+91 98123 55679",
    email: "nippunagaraju@gmail.com",
    description:
      "I’m an enthusiastic Product Manager with a deep passion for building meaningful and user-focused products. I thrive on turning ideas into impactful solutions by closely collaborating with cross-functional teams and truly understanding user needs. With a blend of creativity, strategic thinking, and data-driven decision-making, I love driving products from concept to launch.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    experienceList: [
      {
        company: "SasthraX",
        role: "Product & UI/UX Designer",
        period: "Apr 2018 – Present",
        location: "Pune, India",
        short: "SX",
      },
      {
        company: "Pixel Studio",
        role: "Product & UI/UX Designer",
        period: "Apr 2020 – 2022",
        location: "Pune, India",
        short: "PS",
      },
    ],
    reviews: [
      {
        name: "Joramittey",
        role: "Product Manager",
        rating: "4.5/5",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        review:
          "The product exceeded my expectations with its sleek design and user-friendly interface. Although the delivery took a bit longer than expected, the wait was worth it. Plus, the customer support team was prompt and resolved my issue within minutes.",
        likes: 10,
        comments: 15,
      },
      {
        name: "Tuntun Mosi",
        role: "Product Designer",
        rating: "4.5/5",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        review:
          "The product exceeded my expectations with its sleek design and user-friendly interface. Although the delivery took a bit longer than expected, the wait was worth it. Plus, the customer support team was prompt and resolved my issue within minutes.",
        likes: 10,
        comments: 15,
      },
    ],
  });

  const [notes, setNotes] = useState(["Notes1", "Notes1", "Notes1"]);
  const [newNote, setNewNote] = useState("");

  const handleAddNote = () => {
    if (newNote.trim() !== "") {
      setNotes([...notes, newNote]);
      setNewNote("");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1e] text-white p-4 md:px-[80px] md:pt-[40px] md:pb-[20px] flex flex-col gap-10">
      <div className="flex flex-col xl:flex-row gap-8 xl:max-w-[1140px] xl:mx-auto">
        {/* Sidebar */}
        <div className="flex flex-col sm:flex-row xl:flex-col justify-center items-center xl:items-start gap-4 min-h-[500px] xl:min-h-[700px] w-full xl:w-auto">
          <Link to="/">
            <button className="bg-white text-black font-semibold px-6 py-3 rounded-full w-[160px] sm:w-[180px] shadow">
              Profile
            </button>
          </Link>
          <Link to="/DashBoard">
            <button className="bg-[#2e2e30] text-white px-6 py-3 rounded-full w-[160px] sm:w-[180px]">
              Dashboard
            </button>
          </Link>
          <Link to="/LeaderBoard">
            <button className="bg-[#2e2e30] text-white px-6 py-3 rounded-full w-[160px] sm:w-[180px]">
              Leaderboard
            </button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:flex-row gap-6 w-full">
          {/* Profile + Notes */}
          <div className="bg-[#2e2e30] pt-[60px] px-6 pb-6 rounded-2xl flex-1 flex flex-col items-center shadow-lg max-w-[500px] w-full mx-auto xl:mx-0 relative">
            <h1 className="absolute top-4 text-white text-2xl font-bold tracking-widest">
              PROFILE
            </h1>
            <img
              src={profile.image}
              alt="Profile"
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-gray-400 mb-4">{profile.role}</p>
            <p className="text-center text-sm text-gray-300 mb-4 px-2">
              {profile.description}
            </p>

            <div className="bg-[#3a3a3c] rounded-xl p-4 w-full flex flex-col gap-3 max-w-[400px] mx-auto">
              <h3 className="text-lg font-semibold mb-2">Short Notes</h3>
              {notes.map((note, index) => (
                <button
                  key={index}
                  className="bg-[#2e2e30] rounded-full py-2 px-4 flex justify-between items-center"
                >
                  {note}
                  <ChevronDown className="w-4 h-4" />
                </button>
              ))}

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Add a note"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="flex-1 py-2 px-4 rounded-full text-black outline-none"
                />
                <button
                  onClick={handleAddNote}
                  className="bg-[#2e2e30] rounded-full p-2 flex justify-center items-center"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Info + Experience + Reviews */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Basic Info */}
            <div className="bg-[#2e2e30] rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
              <div className="flex flex-col md:flex-row md:justify-between gap-6 text-sm text-gray-300">
                <div className="flex flex-col gap-4">
                  <Info label="AGE" value={profile.age} />
                  <Info
                    label="YEARS OF EXPERIENCE"
                    value={profile.experience}
                  />
                  <Info label="CTC" value={profile.ctc} />
                  <Info label="LOCATION" value={profile.location} />
                </div>
                <div className="flex flex-col gap-4">
                  <Info label="PHONE" value={profile.phone} />
                  <Info label="EMAIL" value={profile.email} />
                </div>
              </div>
              <div className="flex gap-4 mt-6 flex-wrap">
                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full">
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-full">
                  <Mail className="w-4 h-4" />
                  Send Mail
                </button>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-[#2e2e30] rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Experience</h3>
              <div className="flex flex-col gap-4">
                {profile.experienceList.map((exp, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="bg-[#1c1c1e] w-10 h-10 flex items-center justify-center rounded-full text-white font-semibold">
                      {exp.short}
                    </div>
                    <div>
                      <p className="font-semibold">{exp.company}</p>
                      <p className="text-sm text-gray-300">{exp.role}</p>
                      <p className="text-sm text-gray-400">
                        {exp.period} | {exp.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="flex flex-wrap justify-between gap-4">
              {profile.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-[#2e2e30] rounded-2xl p-4 shadow-lg flex flex-col justify-between w-full sm:w-[48%]"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex gap-3">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm">{review.name}</p>
                        <p className="text-xs text-gray-300">{review.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-semibold">
                      <Star className="w-3 h-3" />
                      {review.rating}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 mb-3">{review.review}</p>
                  <div className="flex gap-4 text-gray-400 text-xs">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" /> {review.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" /> {review.comments}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex gap-2">
    <span className="text-gray-400 w-32">{label}</span>
    <span className="text-white font-semibold break-words">{value}</span>
  </div>
);

export default ProfilePage;
