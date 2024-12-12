import express from "express";
import {
  registerUser,
  loginUser,
  getUserDashboard,
  checkAuth,
  logOutUser,
} from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/check", checkAuth);
router.get("/dashboard", authenticateToken, getUserDashboard);

export default router;
