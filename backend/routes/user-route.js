const express = require("express");
const checkAuth = require("../middleware/checkauth");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", UserController.userLogin); 
router.post("/pass-reset-req", UserController.userPassResetReq);
//router.post("/reset-pass", UserController.userResetPass);
//router.post("/check-reset-token", UserController.userCheckResetToken);
//router.post("/verify-acc", UserController.userVerifyAccount);
//router.post("/check-verif-token", UserController.userCheckAccountToken);

// router.get("/getUser", UserController.getUser); 

// router.get("/leaders", checkAuth, UserController.getLeaders);
// router.get("/scouts", checkAuth, UserController.getScouts); 
// router.get("/groups", checkAuth, UserController.getGroups);  

// router.post("/addLeader", checkAuth, UserController.addLeader);
// router.post("/addScout", checkAuth, UserController.addScout);
// router.post("/addGroup", checkAuth, UserController.addGroup);

module.exports = router;
