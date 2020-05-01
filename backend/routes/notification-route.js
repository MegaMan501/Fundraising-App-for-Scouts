const express = require("express");
const checkAuth = require("../middleware/checkauth");
const NotificationController = require("../controllers/notification-controller");

const router = express.Router();

// Read
router.get("/notifications", checkAuth, NotificationController.getNotifications);

module.exports = router;