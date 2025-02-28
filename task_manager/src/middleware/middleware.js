const jwt = require("jsonwebtoken");
const User = require("../models/auth.model");

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging

    // Make sure this matches how you store userId in the token
    const userId = decoded.user?.id || decoded.id;

    req.user = await User.findById(userId).select("_id name email");

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

module.exports = authenticateUser;
