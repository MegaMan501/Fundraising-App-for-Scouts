const express = require("express");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", UserController.userLogin); 

// route to user-controller.js
router.get("/getUser", UserController.getUser);   
router.post("/addUser", UserController.addUser);

module.exports = router;
