import React, { useEffect, useState } from "react";
import { apiCall } from "../utills/ApiServices.js";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Box, Typography, Grid2, Button, Paper } from "@mui/material";
import Header from "./Header.js";
import { useNavigate } from "react-router-dom";

Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [averageBudget, setAverageBudget] = useState();
  const [completedProjects, setCompletedProjects] = useState([]);
  const [managerInfo, setManagerInfo] = useState(null);
  const [sameTeamProjects, setSameTeamProjects] = useState([]);
  const navigate = useNavigate();

  const fetchAverageBudget = async () => {
    try {
      const avgBudgetData = await apiCall(
        "/api/average-budget-active-campaigns"
      );
      setAverageBudget(avgBudgetData.averageBudget);
    } catch (error) {
      console.error("Error fetching average budget data:", error);
    }
  };

  const fetchCompletedProjects = async () => {
    try {
      const completedProjectsData = await apiCall(
        "/api/completed-projects-engineering"
      );
      setCompletedProjects(completedProjectsData.completedProjects);
    } catch (error) {
      console.error("Error fetching completed projects data:", error);
    }
  };

  const fetchManagerInfo = async () => {
    try {
      const managerData = await apiCall("/api/manager-high-budget-projects");
      setManagerInfo(managerData.manager);
    } catch (error) {
      console.error("Error fetching manager info:", error);
    }
  };

  const fetchSameTeamProjects = async () => {
    try {
      const sameTeamData = await apiCall("/api/projects-same-team-members");
      setSameTeamProjects(sameTeamData.sameMembersProjects);
    } catch (error) {
      console.error("Error fetching same team projects data:", error);
    }
  };

  const departmentChartData = {
    labels: [
      "Marketing\n(Product, Digital)",
      "Development\n(Hardware, Software)",
    ],
    datasets: [
      {
        data: [50, 50],
        backgroundColor: ["rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
      },
    ],
  };

  const logout = async () => {
    try {
      await apiCall("/auth/logout", "POST", {});
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <Box sx={{ padding: 3, marginTop: 8 }}>
      <Header onLogout={logout} />

      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={fetchAverageBudget}
              sx={{ marginBottom: 1 }}
            >
              Get Average Budget
            </Button>
            <Typography variant="h6">
              Average Budget of Active Campaigns:
            </Typography>
            <ul>{averageBudget}</ul>
          </Paper>
        </Grid2>

        <Grid2 item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={fetchCompletedProjects}
              sx={{ marginBottom: 1 }}
            >
              Get Completed Projects
            </Button>
            <Typography variant="h6">Completed Projects:</Typography>
            <ul>
              {completedProjects.map((project, index) => (
                <li key={index}>{project.name}</li>
              ))}
            </ul>
          </Paper>
        </Grid2>

        <Grid2 item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={fetchManagerInfo}
              sx={{ marginBottom: 1 }}
            >
              Get Manager Info
            </Button>
            <Typography variant="h6">
              Manager with High-Budget Projects:
            </Typography>
            {managerInfo && (
              <p>
                {managerInfo.name} (Experience: {managerInfo.experience_years}{" "}
                years)
              </p>
            )}
          </Paper>
        </Grid2>

        <Grid2 item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={fetchSameTeamProjects}
              sx={{ marginBottom: 1 }}
            >
              Get Same Team Projects
            </Button>
            <Typography variant="h6">
              Projects with Same Team Members:
            </Typography>
            <ul>
              {sameTeamProjects.map((projectGroup, index) => (
                <li key={index}>{projectGroup.join(", ")}</li>
              ))}
            </ul>
          </Paper>
        </Grid2>

        <Grid2 item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center" }}>
            <Typography variant="h6">Department Allocation Chart</Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Pie data={departmentChartData} />
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
