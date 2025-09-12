import React, { useState } from "react";
import styles from "../Style.module.css";
import CreateOutfitByPrompt from "../components/CreateOutfitByPrompt";
import MatchOutfitByImage from "../components/MatchOutfitByImage";
const Style = () => {
  const [activeButton, setActiveButton] = useState("prompt");
  return (
    <div className={styles.dashboard}>
      <div className={styles.buttonBar}>
        <div className={styles.buttonsBlock}>
          <button
            className={`${styles.actionButton} ${
              activeButton === "prompt" ? styles.active : ""
            }`}
            onClick={() => setActiveButton("prompt")}
          >
            Style an Outfit
          </button>
          <button
            className={`${styles.actionButton} ${
              activeButton === "image" ? styles.active : ""
            }`}
            onClick={() => setActiveButton("image")}
          >
            Match an Outfit
          </button>
        </div>
        <button className={styles.refreshButton}>⟳ Refresh</button>
      </div>
      <div className={styles.viewContainer}>
        {activeButton === "prompt" && <CreateOutfitByPrompt />}
        {activeButton === "image" && <MatchOutfitByImage />}
      </div>
    </div>
  );
};

export default Style;
