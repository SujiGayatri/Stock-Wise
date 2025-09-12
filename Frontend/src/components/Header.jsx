
import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { FiMenu } from "react-icons/fi";
import "../../src/All.css";


const navLinks = [
  { to: "/home", label: "HOME" },
  { to: "/stock", label: "STOCK" },
  { to: "/style", label: "STYLE" },
  { to: "/", label: "STOCKWISE", className: "header-logo" },
  { to: "/dashboard", label: "DASHBOARD" },
  { to: "/about", label: "ABOUT US" },
];

const Header = React.memo(() => (
  <header className="header">
    <div className="header-container">
      <div className="MenuBar">
        <div className="logo">
          <FiMenu className="icon" />
        </div>
      </div>
      <div className="NavBar">
        {navLinks.map(({ to, label, className }) => (
          <Link key={to} to={to} className={className || undefined}>
            {label}
          </Link>
        ))}
      </div>
      <div className="SearchBar">
        <GrSearch className="icon" />
        <Link to="/profile"><FaRegUser className="icon" /></Link>
      </div>
    </div>
  </header>
));

export default Header;
