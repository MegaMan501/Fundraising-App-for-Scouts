const express = require("express");
const UserController = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", UserController.userLogin); 

// route to user-controller.js
router.get("/getAllUser", UserController.getAllUser);   
router.post("/createUser", UserController.createUser);

module.exports = router;
