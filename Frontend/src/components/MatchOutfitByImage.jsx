import React,{useState,useRef, useCallback, useMemo} from "react";
import styles from '../MatchOutfitByImage.module.css';
import Scanner from '../assets/StylePage/Scanner.png';
import ColorThief from 'colorthief';
import '@tensorflow/tfjs-backend-webgl'; 

import * as mobilenet from '@tensorflow-models/mobilenet';
import { getClosestColorName, getRelatedColors } from '../Utils/BasicColors';
import { resolveDressCategory } from '../Utils/DressTypeMapper';
import { useNavigate } from 'react-router-dom';
import Loader from "../pages/Loader";
// import BASE_URL from '../Utils/config';
const BASE_URL =import.meta.env.VITE_API_URL || "https://stock-wise-backend.onrender.com";
const MatchOutfitByImage = React.memo(() => {
    const [activeTab, setActiveTab] = useState('upload');
    const [isLoading, setIsLoading] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [prediction, setPrediction] = useState('');
    const [dominantColor, setDominantColor] = useState(null);
    const [standardColorName, setStandardColorName] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [fileName, setFileName] = useState('');
    const imgRef = useRef(null);

    const navigate = useNavigate();
    const fileCache = useRef({});
    const handleFileChange = useCallback((e) => {
      const file = e.target.files[0];
      if (!file) return;
      const MAX_SIZE_MB = 10;
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        alert(`File too large. Max allowed size is ${MAX_SIZE_MB}MB.`);
        return;
      }
      setIsImageLoaded(false);
      if (fileCache.current[file.name]) {
        imgRef.current.src = fileCache.current[file.name];
      } else {
        const imageURL = URL.createObjectURL(file);
        setFileName(file.name);
        imgRef.current.src = imageURL;
        fileCache.current[file.name] = imageURL;
      }
    }, []);
  
    const handleImageLoad = () => {
      // console.log('Image loaded, waiting for button click to analyze...');
      setIsImageLoaded(true);
    };

  const handleMatchClick = async () => {
  if (!isImageLoaded || !imgRef.current) {
    alert("Please upload an image before matching.");
    return;
  }

  // Validate image
  if (!imgRef.current.complete || imgRef.current.naturalWidth === 0) {
    alert("Image failed to load properly. Please try another image.");
    // console.error("Image validation failed:", {
    //   complete: imgRef.current.complete,
    //   naturalWidth: imgRef.current.naturalWidth,
    //   naturalHeight: imgRef.current.naturalHeight,
    //   src: imgRef.current.src,
    // });
    return;
  }

  // Store image src to avoid null reference during navigation
  const imageSrc = imgRef.current.src;

  setIsLoading(true); // Show loader at the start
  try {
    // Preload image to ensure it's fully decoded
    const img = new Image();
    img.src = imageSrc;
    img.crossOrigin = "anonymous";

    await new Promise((resolve, reject) => {
      if (img.complete && img.naturalWidth !== 0) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to preload image"));
      }
    });

    // console.log("Image preloaded successfully:", {
    //   src: img.src,
    //   width: img.width,
    //   height: img.height,
    //   naturalWidth: img.naturalWidth,
    // });

    // Load MobileNet model
    const model = await mobilenet.load();
    // console.log("MobileNet model loaded");

    // Classify the image
    const predictions = await model.classify(img);
    // console.log("Raw MobileNet predictions:", predictions);
    // predictions.forEach((pred) => {
    //   console.log(`${pred.className}: ${Math.round(pred.probability * 100)}%`);
    // });

    const detectedType = resolveDressCategory(predictions);
    if (!detectedType || typeof detectedType !== "string") {
      // console.error("Detected type is invalid:", detectedType);
      alert("Unable to detect clothing type. Please try another image.");
      return;
    }
    setPrediction(detectedType);

    // Extract dominant color
    let rgb;
    try {
      const colorThief = new ColorThief();
      rgb = colorThief.getColor(img); // Use preloaded img
      // console.log("ColorThief RGB:", rgb);
      setDominantColor(rgb);
    } catch (colorErr) {
      // console.error("ColorThief error:", colorErr);
      alert("Failed to extract color from image. Using default color.");
      rgb = [0, 0, 0]; // Fallback color
      setDominantColor(rgb);
    }

    const relatedColors = getRelatedColors(rgb);
    setStandardColorName(relatedColors.join(", "));

    // Determine matching types
    const topWear = ["TShirt", "WesternTop", "CropTop", "Shirt"];
    const bottomWear = ["Skirt", "Palazzo", "Jeans", "Leggin", "Trousers", "Pants"];
    let matchTypes = [];
    if (topWear.includes(detectedType)) {
      matchTypes = bottomWear;
    } else if (bottomWear.includes(detectedType)) {
      matchTypes = topWear;
    } else {
      matchTypes = [
        ...topWear,
        ...bottomWear.filter((item) => !["Skirt", "Palazzo", "Jeans", "Leggin"].includes(item)),
      ];
    }

    // Fetch matching outfits
    const response = await fetch(`${BASE_URL}/api/match-outfit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetTypes: matchTypes,
          colors: relatedColors,
        }),
      });

    if (!response.ok) {
      throw new Error("Failed to fetch outfit matches");
    }

    const data = await response.json();
    const matched = data.matches || [];

    // console.log("Detected Type:", detectedType);
    // console.log("Match Types:", matchTypes);
    // console.log("Matched Items:", matched.map((m) => m.Type));

    setRecommendations(matched);
    navigate("/Products", {
      state: {
        prediction: detectedType,
        dominantColor: rgb,
        standardColorName: relatedColors.join(", "),
        suggestions: matched,
        imageSrc: imageSrc, // Use stored imageSrc
      },
    });
  } catch (err) {
    console.error("Error during analysis:", err);
    alert("An error occurred while analyzing the image. Please try again.");
  } finally {
    setIsLoading(false); // Hide loader after all operations
  }
};
  return (
    <div className={styles.wrapper}>
      {isLoading && (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '450px' }}>
        <Loader />
      </div>
    )}
      {!isLoading && (
      <div className={styles.card}>
        <div className={styles.textSection}>
          <h2>Match Outfit by Uploading</h2>
          <p>
            "Match Outfit by Uploading" is an AI-powered fashion assistant that helps you find the perfect outfit combinations simply by uploading a photo of a clothing item. Whether it’s a shirt, dress, pants, or accessory, the tool instantly analyzes the item’s style, color, and type, then suggests matching pieces to complete the look. From casual wear to formal attire, it curates options based on the latest fashion trends, season, and occasion.
          </p>
        </div>
        <div className={styles.uploadSection}>
          <div className={styles.tabSwitch}>
            <button className={activeTab === 'scanner' ? styles.activeTab : styles.inactiveTab}
              onClick={() => setActiveTab('scanner')}>Match using scanner</button>
            <button className={activeTab === 'upload' ? styles.activeTab : styles.inactiveTab}
              onClick={() => setActiveTab('upload')}>Match Outfit by Uploading</button>
          </div>
          {activeTab === 'upload' ? (
            <div className={styles.uploadBox}>
              <div className={styles.dropArea}>
                <div className={styles.addButton}>+</div>
                <p className={styles.drop}>Drag & Drop to match outfit</p>
                <span className={styles.warning}>⚠️ Max file size is 10MB</span>
                <input type="file" onChange={handleFileChange} className={styles.fileInput} accept="image/*" />
              </div>

             <div className={styles.imagePreviewWrapper}>
                   <div className={styles.imagePreviewLeft}>
                     <img
                       ref={imgRef}
                       crossOrigin="anonymous"
                       onLoad={handleImageLoad}
                       className={styles.previewImage}
                       alt="Preview"
                     />
                     <p className={styles.fileName}>{fileName}</p>
                   </div>
             
                   {dominantColor && (
                     <div className={styles.colorDisplay}>
                       <p className={styles.rgbText}>RGB: {dominantColor.join(', ')}</p>
                       <div
                         className={styles.colorBox}
                         style={{ backgroundColor: `rgb(${dominantColor.join(',')})` }}
                       />
                     </div>
                   )}
             
                 </div>
              <button className={styles.matchButton} onClick={handleMatchClick}>Make a Match</button>
            </div>
          ) : (
            <div className={styles.uploadBox}>
              <p>📷 Activate webcam to scan your outfit in real-time.</p>
              <img src={Scanner} alt="Scanner" className={styles.Scanner} loading="lazy" />
              <button className={styles.matchButton}>Start Scanner</button>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
});
export default MatchOutfitByImage;