const express = require('express');
const router = express.Router();
const EmailController = require("../controllers/emailtest");

router.get("/", (req, res) => res.send('This will be used to send out a test email with gmail (or possibly twilio sengrid). Will be used for a reset password system and a email notification system in the future'));

//router.get("/", EmailController.emailSend);

module.exports = router;
