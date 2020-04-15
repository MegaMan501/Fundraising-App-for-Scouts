const express = require("express");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", UserController.userLogin); 
//router.post("reset-req", UserController.userResetReq);

module.exports = router;
