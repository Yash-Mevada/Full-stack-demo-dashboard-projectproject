import express from "express";
import {
  getAverageBudgetOfActiveCampaigns,
  getCompletedProjectsFromEngineering,
  getManagerWithMostHighBudgetProjects,
  getProjectsWithSameTeamMembers,
} from "../controllers/dashboardController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/average-budget-active-campaigns",
  authenticateToken,
  getAverageBudgetOfActiveCampaigns
);
router.get(
  "/completed-projects-engineering",
  authenticateToken,
  getCompletedProjectsFromEngineering
);
router.get(
  "/manager-high-budget-projects",
  authenticateToken,
  getManagerWithMostHighBudgetProjects
);
router.get(
  "/projects-same-team-members",
  authenticateToken,
  getProjectsWithSameTeamMembers
);

export default router;
