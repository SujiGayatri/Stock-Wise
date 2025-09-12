import React from "react";
import "../../src/index.css";
import HeroImg from "../assets/HomePage/HeroImg2.png";
import HeroScanner from "../assets/HomePage/HeroScanner1.png";
import BannerIcon from "../assets/HomePage/BannerIcon.png";

const HomeHero = () => {
  return (
    <div className="HeroContent">
      <div className="HeroContentMain">
        <div className="HeroMain">
          <div className="HeroImage">
                <img className="HeroImg" src={HeroImg} loading="lazy" />
          </div>
          <div className="HeroText">
            <label id="HeroFont1">Behind Every Look is a Team That Cares</label>
            <label id="HeroFont2">
              AT STOCKWISE, YOU ARE THE FORCE BEHIND EVERY STYLE WE DELIVER.
              FROM CURATING THE LATEST TRENDS TO ENSURING EVERY DETAIL IS
              PERFECT, YOUR PASSION AND TEAMWORK DRIVE OUR SUCCESS. TOGETHER, WE
              TRANSFORM EFFORT INTO IMPACT, BRINGING FASHION TO LIFE FOR EVERY
              CUSTOMER, EVERY DAY. WE DON'T JUST WORK HERE, WE CREATE STYLE THAT
              MATTERS.
            </label>
          </div>
        </div>
        <div className="HeroScanner">
          <label id="HeroFont3">Scan To Explore</label>
              <img className="HeroScannerImg" src={HeroScanner} loading="lazy" />
          <label id="HeroFont4">DISCOVER THE FASHION LIKE NEVER BEFORE</label>
          <ol className="dotted-list">
            <li>INSTANTLY RECOGNIZE STYLES</li>
            <li>GET PRODUCT DETAILS & PRICES</li>
            <li>FIND SIMILAR ITEMS AVAILABILITY</li>
            <li>SUGGEST CUSTOMERS BEST STYLES</li>
          </ol>
          <button className="ScanButton">Tap to Scan</button>
        </div>
      </div>
      <div className="HeroBanner">
            <img className="HeroBannerImg" src={BannerIcon} loading="lazy" />
        <label className="HeroBannerText">STOCKWISE</label>
            <img className="HeroBannerImg" src={BannerIcon} loading="lazy" />
        <label className="HeroBannerText">STOCKWISE</label>
            <img className="HeroBannerImg" src={BannerIcon} loading="lazy" />
        <label className="HeroBannerText">STOCKWISE</label>
            <img className="HeroBannerImg" src={BannerIcon} loading="lazy" />
        <label className="HeroBannerText">STOCKWISE</label>
            <img className="HeroBannerImg" src={BannerIcon} loading="lazy" />
        <label className="HeroBannerText">STOCKWISE</label>
            <img className="HeroBannerImg" src={BannerIcon} loading="lazy" />
        <label className="HeroBannerText">STOCKWISE</label>
            <img className="HeroBannerImg" src={BannerIcon} loading="lazy" />
      </div>
    </div>
  );
};

export default HomeHero;
