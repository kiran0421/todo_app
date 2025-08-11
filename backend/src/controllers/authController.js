import { registerUserService } from "../services/authService.js";
import { findUserByUsername } from "../models/user.model.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token.utils.js";

export const registerUser = async (req, res) => {
  try {
    console.log("Registering user:", req.body);
    const result = await registerUserService(req.body);
    res.status(201).json({ message: "User registered", userId: result });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. Find user
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // 2. Compare password (hashed)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // 3. Generate tokens
    const payload = { id: user.id, username: user.username };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken({ id: user.id });

    await logRefreshToken(user.id, refreshToken, req.ip);

    // 5. Respond with tokens
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  // Logic for user logout
  res.status(200).json({ message: "User logged out successfully" });
};
