import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { FiMenu } from "react-icons/fi";

import "../../src/All.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="MenuBar">
          <div className="logo">
            <FiMenu className="icon" />
          </div>
        </div>
        <div className="NavBar">
          <Link to="/home">HOME</Link>
          <Link to="/stock">STOCK</Link>
          <Link to="/style">STYLE</Link>
          <Link to="/" className="header-logo">
            STOCKWISE
          </Link>
          <Link to="/dashboard">DASHBOARD</Link>
          <Link to="/about">ABOUT US</Link>
        </div>
        <div className="SearchBar">
          <GrSearch className="icon" />
          <Link to="/profile"><FaRegUser className="icon" /></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
