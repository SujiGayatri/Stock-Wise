import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "../src/pages/Main";
import Header from "./components/Header";
import Footer from './components/Footer';
import About from "../src/pages/AboutPage";
// import styles from './AboutPage.module.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Stock from '../src/pages/StockPage'
import Style from "../src/pages/StylePage";
import Profile from '../src/pages/ProfilePage';
import DashBoard from '../src/pages/DashboardPage';
import LeaderBoard from '../src/pages/LeaderBoardPage';
import Products from '../src/pages/ProductPage';
import ProductMain from '../src/pages/ProductDetails';
import SignInPage from "../src/pages/SignInPage";
import SignUpPage from "../src/pages/SignUpPage";
import Home from "../src/pages/Home";
import './All.css'

function App() {
  return (
    <>
    <div>
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SignInPage />} />
         <Route path="/signup" element={<SignUpPage />} />
         <Route path="/home" element={<Home/>}/>
        <Route path="/stock" element={<Stock />} />
        <Route path="/style" element={<Style />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/ProductMain" element={<ProductMain />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/LeaderBoard" element={<LeaderBoard />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
    </GoogleOAuthProvider>
    </div>
    </>
  );
}

export default App;
