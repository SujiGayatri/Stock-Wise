import React, { useState } from "react";
import styles from "../CreateOutfitByPrompt.module.css";
import userImage from "../assets/StylePage/user.jpg";
import orbImage from "../assets/StylePage/orb.png";
import { GrSend } from "react-icons/gr";
import { FiSearch, FiEdit, FiTrash2, FiPlus, FiMenu } from "react-icons/fi";
// import outfits from "../outfits.json";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";

const CreateOutfitByPrompt = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState("prompt");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading,setIsLoading]=useState(false);

  const handleSuggest = async () => {
  try {
    setIsLoading(true);
    const res = await fetch("http://localhost:5000/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    
    const outfitRes = await fetch("http://localhost:5000/api/outfits");
    const allOutfits = await outfitRes.json();

    const matched = allOutfits.filter((outfit) => data.ids.includes(outfit._id));
    setSuggestions(matched);

    navigate("/Products", { state: { suggestions: matched } });
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    setIsLoading(false);
  }
  // finally{
  //   setIsLoading(false);
  // }
};


  return (
    <>
    {isLoading && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'450px'}}>
        <Loader />
      </div>
    )}
    {!isLoading && (
    <div className={styles.dashboard}>
      <aside
        className={`${styles.sidebar} ${
          sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.iconRow}>
            <FiEdit />
            <FiTrash2 />
          </div>
          <div className={styles.iconRow}>
            <FiPlus />
            {sidebarOpen && (
              <button
                className={styles.closeButton}
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                ❌
              </button>
            )}
          </div>
        </div>
        <div className={styles.searchBox}>
          <input type="text" placeholder="Search" />
          <span className={styles.icon}>
            <FiSearch />
          </span>
        </div>
        <div className={styles.history}>
          {[
            "Today",
            "Yesterday",
            "2 days ago",
            "3 days ago",
            "4 days ago",
            "5 days ago",
            "6 days ago",
          ].map((day, index) => (
            <div key={index}>
              <div className={styles.day}>{day}</div>
              <div className={styles.entry}>All I dream of is your eyes...</div>
            </div>
          ))}
        </div>
      </aside>
      <main className={styles.main}>
        <div className={styles.Header}>
          {!sidebarOpen && (
            <button
              className={styles.menuToggle}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <FiMenu />
            </button>
          )}
          <h2 className={styles.logo}>STOCKWISE</h2>
          <div className={styles.avatar}>
            <img src={userImage} alt="User Avatar" />
          </div>
        </div>

        <div className={styles.centerContent}>
          <img src={orbImage} alt="Orb" className={styles.orb} />
          <h1 className={styles.welcome}>Welcome Back Mohan!!!</h1>
          <p className={styles.subtitle}>
            Which combination do you wanna create today?
          </p>

          <div className={styles.promptBox}>
            <textarea
              placeholder="Describe your idea to generate an outfit..."
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className={styles.sendButton} onClick={handleSuggest}>
              <GrSend />
            </button>
          </div>
        </div>
      </main>
    </div>
    )}
    </>
  );
};

export default CreateOutfitByPrompt;
