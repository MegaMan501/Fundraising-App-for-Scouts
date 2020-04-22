const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decodedToken);
    req.userData = {
      email: decodedToken.email,
      userId: decodedToken.userId,
      leader_flag: decodedToken.leader_flag,
      admin_flag: decodedToken.admin_flag
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "You are not authenticated!"});
  }
};
