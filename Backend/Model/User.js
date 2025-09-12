const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName:     { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String, required: true },
  mobileNumber: { type: String, required: true },
  employeeId:   { type: String, required: true },
 resetPasswordToken: { type: String, default: null },
resetPasswordExpires: { type: Date, default: null },
otp: { type: String },
  otpExpires: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);
