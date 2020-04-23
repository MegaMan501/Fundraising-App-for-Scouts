const express = require("express");
const checkAuth = require("../middleware/checkauth");
const MemberController = require("../controllers/member-controller");
const router = express.Router();

// Get back all groups, leaders, and scouts
router.get("/all-groups", checkAuth, MemberController.getGroups);  
router.get("/all-leaders", checkAuth, MemberController.getLeaders);
router.get("/all-scouts", checkAuth, MemberController.getScouts); 

// Get back a single group, leader, and scout by id
router.get("/group/:id", checkAuth, MemberController.getGroup); 
router.get("/leader/:id", checkAuth, MemberController.getLeader); 
router.get("/scout/:id", checkAuth, MemberController.getScout);

// Add a new group, leader, and scout
router.post("/add-group", checkAuth, MemberController.addGroup);
router.post("/add-leader", checkAuth, MemberController.addLeader);
router.post("/add-scout", checkAuth, MemberController.addScout);

// Remove a group, leader, scout
router.delete("/group/:id", checkAuth, MemberController.deleteGroup);
router.delete("/leader/:id", checkAuth, MemberController.deleteLeader);
router.delete("/scout/:uid/:gid", checkAuth, MemberController.deleteScout);

// Update a group, leader, scout
router.put("/group/:id", checkAuth, MemberController.updateGroup);
router.put("/leader/:id", checkAuth, MemberController.updateLeader);
// router.put("/scout/:id", checkAuth, MemberController.);

module.exports = router;