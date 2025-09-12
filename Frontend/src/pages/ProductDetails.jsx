import React, { useState } from "react";
import "../ProductDetails.css";
import productImg from "../assets/ProductDetails/hoodie1.jpg";
import cardImg1 from "../assets/ProductDetails/hoodie2.jpg";
import cardImg2 from "../assets/ProductDetails/hoodie3.jpg";
import cardImg3 from "../assets/ProductDetails/hoodie4.jpg";
import cardImg4 from "../assets/ProductDetails/hoodie5.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import products from "../components/TopSellersData";
import '../All.css';
import {Link} from 'react-router-dom';

const product = {
  image: cardImg1,
  title: "Cool Hoodie",
  desc: "Elevate your layering game with this timeless black zip-up sweater. Crafted with a soft, ribbed knit texture, this piece offers both comfort and sophistication. The high collar and full-front silver zipper bring modern functionality, while the minimalist design ensures it pairs effortlessly with any outfit.",
  price: "$49.99",
};


const ProductPage = () => {
  const [showDetails, setShowDetails] = useState(false);

  const settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="product-container">
      <div className="product-main">
        <div className="left">
          <img src={productImg} alt="Sweater" />
        </div>
        <div className="product-right">
          <h3>{product.title}</h3>
          <p className="description">{product.desc}</p>
          <div className="price">Price : {product.price}</div>
          <div className="size">Size</div>
          <div className="sizes">
            {["S", "M", "L", "XL"].map((sz) => (
              <button key={sz}>{sz}</button>
            ))}
          </div>
          <div className="button-column">
            <button className="availability">Available</button>
            <button
              className="details-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? "Hide Product Details" : "Product Details"}
            </button>
          </div>
          {showDetails && (
            <ul className="details-list">
              {[
                ["Color", "Dark Teal"],
                ["Material", "Premium ribbed knit (cotton/wool blend)"],
                ["Neckline", "High collar (mock neck)"],
                ["Sleeves", "Long with ribbed cuffs"],
                ["Hem", "Ribbed for structure and comfort"],
                ["Style", "Minimalist, versatile, modern"],
              ].map(([label, val]) => (
                <li key={label}>
                  <strong>{label}:</strong> {val}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <h1 className="Tilte">Related Products</h1>
      <div className="TopSellersScroll">
        <div className="carouselWrapper">
          <Slider {...settings}>
            {products.map((item, index) => (
              <div className="productCard" key={index}>
                <span className="productTag">&nbsp;New Season</span>
                <div className="productMain">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="productImage"
                  />
                  <h3 className="productTitle">{item.title}</h3>
                  <p className="productDescription">{item.desc}</p>
                  <strong className="productPrice">{item.price}</strong>
                  <Link to="/ProductMain">
                    <button className="productButton">Check Out</button>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <h1 className="Tilte">Suggested Products</h1>
      <div className="TopSellersScroll">
        <div className="carouselWrapper">
          <Slider {...settings}>
            {products.map((item, index) => (
              <div className="productCard" key={index}>
                <span className="productTag">&nbsp;New Season</span>
                <div className="productMain">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="productImage"
                  />
                  <h3 className="productTitle">{item.title}</h3>
                  <p className="productDescription">{item.desc}</p>
                  <strong className="productPrice">{item.price}</strong>
                  <Link to="/ProductMain">
                    <button className="productButton">Check Out</button>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
