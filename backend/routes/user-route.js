const express = require("express");
const checkAuth = require("../middleware/checkauth");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", UserController.userLogin); 
<<<<<<< HEAD
//router.post("reset-req", UserController.userResetReq);

// route to user-controller.js
router.get("/getUser", UserController.getUser);   
router.post("/addUser", UserController.addUser);
router.delete("/deleteUser", UserController.deleteUser);
=======
router.post("/pass-reset-req", UserController.userPassResetReq);
router.post("/reset-pass", UserController.userResetPass);
router.post("/check-reset-token", UserController.userCheckResetToken);
//router.post("/verify-acc", UserController.userVerifyAccount);
//router.post("/check-verif-token", UserController.userCheckAccountToken);
>>>>>>> master

module.exports = router;
