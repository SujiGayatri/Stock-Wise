const express = require('express');
const router = express.Router();
const authController = require('../Controller/authcontroller');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOtpOnly);
router.post('/reset-password', authController.resetPasswordAfterOtp);

module.exports = router;
