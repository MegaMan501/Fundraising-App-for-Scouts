const express = require("express");
const checkAuth = require("../middleware/checkauth");
const EventController = require("../controllers/event-controller");
const router = express.Router();

// Get 
router.get("/all-events", EventController.getEvents);  
// Add 
router.post("/add-event", checkAuth, EventController.addEvent);
// Remove
router.delete("/event/:id", checkAuth, EventController.deleteEvent);
// Update
router.put("/event/:id", checkAuth, EventController.updateEvent);

module.exports = router;