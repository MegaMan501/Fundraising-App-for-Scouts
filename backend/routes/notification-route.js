const express = require("express");
const checkAuth = require("../middleware/checkauth");
const NotificationController = require("../controllers/notification-controller");

const router = express.Router();

// Create
router.post("/notification", checkAuth, NotificationController.addNotification);

// Read
router.get("/notifications", checkAuth, NotificationController.getNotifications);
router.get("/sent-notifications", checkAuth, NotificationController.getSentNotifications);

module.exports = router;