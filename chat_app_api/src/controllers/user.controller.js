import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({ name, username, email, password: hashedPassword });
    res.status(201).json({ user });
    await user.save();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Find the user by either email or username
    const user = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user details
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // Set token expiry (optional)
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { register, login };
