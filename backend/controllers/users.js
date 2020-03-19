const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// login a user and get there profile
exports.userLogin = (req, res, next) => {
    let fetchedUser; // the user fetched from db
   
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({
                    message: "Authentication Failed!"
                });
            }
            fetchedUser = user; 
            return bcrypt.compare(req.body.password, user.password); 
        })
        .then(result => {
            if(!result) {
                return res.status(401).json({
                    message: "Authentication Failed!"
                });
            }
            const token = jwt.sign(
                /*Changed ._id (assuming this was a mongodb thing for document 
                    id's) to user_id to match table schema */ 
                {email: fetchedUser.email, userId: fetchedUser.user_id}, 
                process.env.JWT_KEY,
                /*May want to change length of expire time (will need to ask 
                  professor how long she wants persistent login
                  to last) */
                {expiresIn: "1h"}
            );
            fetchedUser.password = null;    // null out password
            res.status(200).json({
                token: token,
                /*May want to change length of expire time (will need to ask 
                    professor how long she wants persistent login
                    to last) */
                expiresIn: 3600, // 1 hour in seconds
                userId: fetchedUser.user_id,
                user: fetchedUser
            })
        })
        .catch(err => {
         return res.status(401).json({
             message: "Invalid Authentication Credentials!"
         })
        });
}