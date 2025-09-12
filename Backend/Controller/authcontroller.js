const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require('../Model/User');
require('dotenv').config();


exports.signup = async (req, res) => {
  const { fullName, email, password, mobileNumber, employeeId } = req.body;
  try {
    if (!fullName || !email || !password || !mobileNumber || !employeeId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8 ||
      !/[a-z]/.test(password) ||
      !/[A-Z]/.test(password) ||
      !/\d/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      });
    }

    if (!/^[a-zA-Z ]+$/.test(fullName)) {
      return res.status(400).json({ message: "Full name can only contain letters and spaces" });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      return res.status(400).json({ message: "Invalid Mobile Number" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword, mobileNumber, employeeId });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ $or: [{ email: email }, { employeeId: email }] });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!email || !password) return res.status(400).json({ message: "Email and Password are required" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:3000/resetpassword/${token}`;
    console.log("Reset Link:", resetLink);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'yourappemail@gmail.com',
      to: email,
      subject: 'Password Reset Link',
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    };

    await transporter.sendMail(mailOptions);
    transporter.verify((error, success) => {
      if (error) console.log("Email transporter error:", error);
      else console.log("Ready to send email");
    });

    res.status(200).json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
const sendPasswordResetSuccess = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Successful",
    html: `<p>Your password was successfully reset. If this wasn’t you, please contact support immediately.</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Utility function to send OTP via email
const sendOTP = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
};


exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpires = expiry;
    await user.save();

    await sendOTP(email, otp); 
    res.status(200).json({ message: "OTP sent to registered email" });
  } catch (err) {
    console.error("Error sending OTP:", err.message);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};

exports.verifyAndResetPassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    const trimmedPassword = newPassword.trim();

if (
  trimmedPassword.length < 8 ||
  !/[a-z]/.test(trimmedPassword) ||
  !/[A-Z]/.test(trimmedPassword) ||
  !/\d/.test(trimmedPassword) ||
  !/[^A-Za-z0-9]/.test(trimmedPassword)
) {
  return res.status(400).json({
    message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
  });
}

if (trimmedPassword !== confirmPassword.trim()) {
  return res.status(400).json({ message: "Passwords do not match" });
}

    user.password = await bcrypt.hash(trimmedPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();
    await sendPasswordResetSuccess(user.email);

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset error:", err.message);
    res.status(500).json({ message: "Password reset failed", error: err.message });
  }
};

exports.verifyOtpOnly = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (!user.otpExpires || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
};

exports.resetPasswordAfterOtp = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const trimmedPassword = newPassword.trim();

if (
  trimmedPassword.length < 8 ||
  !/[a-z]/.test(trimmedPassword) ||
  !/[A-Z]/.test(trimmedPassword) ||
  !/\d/.test(trimmedPassword) ||
  !/[^A-Za-z0-9]/.test(trimmedPassword)
) {
  return res.status(400).json({
    message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
  });
}

if (trimmedPassword !== confirmPassword.trim()) {
  return res.status(400).json({ message: "Passwords do not match" });
}


   user.password = await bcrypt.hash(trimmedPassword, 10);
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();
    await sendPasswordResetSuccess(user.email);

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Reset error:", err.message);
    res.status(500).json({ message: "Password reset failed", error: err.message });
  }
};
