import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import styles from '../../src/SignUpPage.module.css';
import SignUpPageImage from '../../src/assets/Login/SignUpPageImage.png';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
  export default function SignUpPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const decoded = jwtDecode(tokenResponse.credential);
      console.log(decoded);
    },
    onError: () => {
      console.log("Login Failed");
    }
    });
     const handleSignup = () => {
    fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        email, 
        password,
        mobileNumber,
        employeeId
      })
    })
    .then(res => {
    if (res.status === 201) {
      alert("User created successfully");
      navigate("/");
    } else {
      return res.json().then(data => {
        alert(data.message || "Signup failed");
      });
    }
  })
  .catch(err => {
    console.error("Signup Error:", err);
    alert("Something went wrong during signup!");
  });
};
  return (
    <div>
      <div className={styles.signupcontainer}>
        <div className={styles.signupleftbox}>
        <div className={styles.signupleftform}>
          <h2><b>Registration</b></h2>
          <div className={styles.para1}>Hey ! Enter your details to </div>
          <div className={styles.para2}>create an account</div>
          <input type="text" placeholder="Enter Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="text" placeholder="Enter Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}/>
          <input type="text" placeholder="Enter Mobile Number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}/>
          <input type="email" placeholder="Enter Mail ID" 	value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" onClick={handleSignup}>Sign Up</button>
          <div className={styles.signupdivider}>
            <div className={styles.line}></div>
           <div className={styles.dividertext}>Or Sign Up with</div>
            <div className={styles.line}></div>
            </div>
          <div className={styles.signupsocialbuttons}>
            <button  onClick={() => login()}><FaGoogle size={8}/> Google</button>
            <button><FaApple size={9}/> Apple</button>
            <button><FaFacebook size={9}/> Facebook</button>
          </div>
          <p className={styles.signupsignintext}>
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </div>
        </div>
       <div className={styles['signuprightimage']} style={{ backgroundImage: `url(${SignUpPageImage})` }}></div>
      </div>
    </div>
  )
}
