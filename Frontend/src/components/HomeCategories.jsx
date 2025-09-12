import CategoriesMenData from "./CategoriesMenData";
import CategoriesWomenData from "./CategoriesWomenData";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
 
const HomeCategories = () => {
  const [indexMen1, setIndexMen1] = useState(0);
  const [indexMen2, setIndexMen2] = useState(1);
  const [indexWomen1, setIndexWomen1] = useState(0);
  const [indexWomen2, setIndexWomen2] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndexMen1((prev) => (prev + 1) % CategoriesMenData.length);
      setIndexMen2((prev) => (prev + 1) % CategoriesMenData.length);
      setIndexWomen1((prev) => (prev + 1) % CategoriesWomenData.length);
      setIndexWomen2((prev) => (prev + 1) % CategoriesWomenData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderCard = (item, type) => (
    <div className="card visible">
      <div className="card-bg-text">{item.label}</div>
  <img src={item.image} alt={item.label} className="card-image" loading="lazy" />
      <Link to="/Products"><button
        className={`explore-btn ${
          type === "Men" ? "explore-btn-men" : "explore-btn-women"
        }`}
      >
        EXPLORE NOW *
      </button></Link>
    </div>
  );
  return (
    <div className="HomeCategories">
      <div className="HomeFont1">CATEGORIES</div>
      <div className="HomeCategoriesMain">
        <div className="HomeCategoriesMen">
          <div className="CategoriesMen1">
            {renderCard(CategoriesMenData[indexMen1], "Men")}
          </div>
          <div className="CategoriesMen2">
            {renderCard(CategoriesMenData[indexMen2], "Men")}
          </div>
        </div>

        <div className="HomeCategoriesWomen">
          <div className="CategoriesWomen1">
            {renderCard(CategoriesWomenData[indexWomen1], "Women")}
          </div>
          <div className="CategoriesWomen2">
            {renderCard(CategoriesWomenData[indexWomen2], "Women")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCategories;
