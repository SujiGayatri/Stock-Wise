import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import './All.css';

const Main = lazy(() => import("../src/pages/Main"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import('./components/Footer'));
const About = lazy(() => import("../src/pages/AboutPage"));
const Stock = lazy(() => import('../src/pages/StockPage'));
const Style = lazy(() => import("../src/pages/StylePage"));
const Profile = lazy(() => import('../src/pages/ProfilePage'));
const DashBoard = lazy(() => import('../src/pages/DashboardPage'));
const LeaderBoard = lazy(() => import('../src/pages/LeaderBoardPage'));
const Products = lazy(() => import('../src/pages/ProductPage'));
const ProductMain = lazy(() => import('../src/pages/ProductDetails'));
const SignInPage = lazy(() => import("../src/pages/SignInPage"));
const SignUpPage = lazy(() => import("../src/pages/SignUpPage"));
const Home = lazy(() => import("../src/pages/Home"));

function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Routes>
              <Route path="/" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/home" element={<Home />} />
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
          </Suspense>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
