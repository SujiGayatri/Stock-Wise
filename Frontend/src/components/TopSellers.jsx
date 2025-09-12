import React, { useMemo } from "react";
import products from "./TopSellersData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
const TopSellers = React.memo(() => {
  const settings = useMemo(() => ({
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  }), []);
  const categories = useMemo(() => ["All", "Men", "Women", "Kids"], []);
  return (
    <div className="TopSellers">
      <div className="TopSellersHead">
        <label className="HomeFont2">TOP SELLERS</label>
        <div className="CategoriesButtons">
          {categories.map((cat) => (
            <button key={cat} className="TopSellersButton">{cat}</button>
          ))}
        </div>
      </div>
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
                <Link to="/ProductMain"><button className="productButton">Check Out</button></Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
});

export default TopSellers;
