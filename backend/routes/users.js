const express = require('express');
const router = express.Router();
const UserController = require("../controllers/users"); 
const verifiedUser = require('../middleware/check-auth'); 

router.post("/login", UserController.userLogin);                    // login the user
//router.put("/:id", verifiedUser, UserController.updateUser);  // update the user, if they are verified

module.exports = router;
