const express = require("express");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", UserController.userLogin); 
//router.post("reset-req", UserController.userResetReq);

<<<<<<< HEAD
=======
// route to user-controller.js
router.get("/getUser", UserController.getUser);   
router.post("/addUser", UserController.addUser);

>>>>>>> khang
module.exports = router;
