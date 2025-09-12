import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../../src/SignInPage.module.css';
import { Link } from 'react-router-dom';
import { FaEnvelope } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import loginImage from '../../src/assets/Login/loginimg.png';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
export default function SignInPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
   const [showForgotForm, setShowForgotForm] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const decoded = jwtDecode(tokenResponse.credential);
      console.log(decoded);
    },
    onError: () => {
      console.log("Login Failed");
    }
    });
    const handleLogin = () => {
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: employeeId, password })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.message === "Login successful") {
        console.log("Logged in user:", data.user);
        navigate('/home');
      }
    })
    .catch(err => console.error("Login Error:", err));
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/send-otp", {
        email: forgotEmail,
      });
      toast.success("OTP sent to registered email");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/verify-otp", {
        email: forgotEmail,
        otp,
      });
      toast.success("OTP Verified");
      setIsOtpVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must include 1 uppercase, 1 lowercase, 1 number, 1 special character and 6+ chars");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }
try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: forgotEmail,
        otp,
        newPassword,
        confirmPassword,
      });
      toast.success("Password changed successfully!");
      setShowForgotForm(false);
      setOtpSent(false);
      setIsOtpVerified(false);
      setForgotEmail("");
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!showForgotForm ? (
      <div className={styles.logincontainer}>
       <div className={styles['loginimg']} style={{ backgroundImage: `url(${loginImage})` }}></div>
      <div className={styles.loginbox1}>
        <div className={styles.loginbox2}>
        <h2>Employee Login</h2>
        <div className={styles.descrip}>Hey ! Enter you details to login</div> 
          <div className={styles.descrip}>to your account</div><br></br>
        <input type="text" placeholder="Employee ID / Mobile Number" value={employeeId}
  onChange={(e) => setEmployeeId(e.target.value)}/>
        <input type="password" placeholder="Password" value={password}
  onChange={(e) => setPassword(e.target.value)}/>
        <a href="#" className={styles.forgot} onClick={() => setShowForgotForm(true)}>Forgot Password?</a>
        <button className={styles.signinbtn} onClick={handleLogin}>Sign In</button>
        <div className={styles.divider}>
           <div className={styles.line}></div>
           <div className={styles.dividertext}>Or Log in with</div>
            <div className={styles.line}></div>
          </div>
        <div className={styles.socialbuttons}>
          <button className={styles.google} onClick={() => login()}>
          < FaGoogle size={9}/> Google
          </button>
          <button className={styles.apple}><FaApple size={9}/> Apple</button>
          <button className={styles.facebook}><FaFacebook size={9}/> Facebook</button>
        </div>
        <p className={styles.register}>Don’t have an account? <Link to="/signup">Register Now</Link></p>
      </div>
      <footer className={styles.footer}>Copyright ©stockwise 2025 | <a href="#">Privacy Policy</a></footer>
      </div>
    </div>
    ) : !otpSent ? (
                  <form onSubmit={handleSendOtp} className={styles.formdiv}>
                    <h2 className={styles.authtitle}>Forgot Password</h2>
                    <div className={styles.authinputfield}>
                      <FaEnvelope />
                      <input
                        type="email"
                        placeholder="Enter Registered Email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className={styles.authbtn}>Send OTP</button>
                    <p className={styles.authforgot} onClick={() => setShowForgotForm(false)}>Back to Login</p>
                  </form>
                ) : !isOtpVerified ? (
                  <form onSubmit={handleVerifyOtp} className={styles.formdiv}>
                    <h2 className={styles.authtitle}>Verify OTP</h2>
                    <p>Enter the 6-digit OTP sent to your email</p>
                    <div className={styles.otpinputcontainer}>
                      {Array(6).fill("").map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          className={styles.otpbox}
                          value={otp[index] || ""}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, "");
                            if (!val) return;
                            const newOtp = otp.split("");
                            newOtp[index] = val;
                            setOtp(newOtp.join(""));
                            const next = e.target.nextSibling;
                            if (next) next.focus();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                              const newOtp = otp.split("");
                              newOtp[index] = "";
                              setOtp(newOtp.join(""));
                              const prev = e.target.previousSibling;
                              if (prev) prev.focus();
                            }
                          }}
                          required
                        />
                      ))}
                    </div>
                    <button type="submit" className={styles.authbtn}>Verify OTP</button>
                    <p className={styles.authforgot} onClick={() => {
                      setShowForgotForm(false);
                      setOtpSent(false);
                      setOtp("");
                    }}>Back to Login</p>
                  </form>
                   ) : (
                  <form onSubmit={handleResetPassword} className={styles.formdiv}>
                    <h2 className={styles.authtitle}>Reset Password</h2>

                    <div className={styles.authinputfield}> <input
                      type="password"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required

                    />
                    </div>
                    <div className={styles.authinputfield}><input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                       /></div>

                    <button type="submit" className={styles.authbtn}>Change Password</button>
                    <p className="authforgot" onClick={() => {
                      setShowForgotForm(false);
                      setOtpSent(false);
                      setIsOtpVerified(false);
                      setOtp("");
                      setForgotEmail("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}>Back to Login</p>
                  </form>
                   )}
    </div>
  )
}