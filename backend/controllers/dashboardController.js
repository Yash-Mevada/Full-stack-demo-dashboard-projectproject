import { readCompanyDataFromFile } from "../model/companyModel.js";

export const getAverageBudgetOfActiveCampaigns = (req, res) => {
  const companyData = readCompanyDataFromFile();
  const marketingDept = companyData.departments.find(
    (department) => department.name === "Marketing"
  );

  if (!marketingDept) {
    return res.status(404).send("Marketing department not found");
  }

  const activeCampaigns = marketingDept.teams.flatMap((team) =>
    team.campaigns.filter((campaign) => campaign.active)
  );
  const totalBudget = activeCampaigns.reduce(
    (sum, campaign) => sum + campaign.budget,
    0
  );
  const averageBudget = activeCampaigns.length
    ? totalBudget / activeCampaigns.length
    : 0;

  res.status(200).json({ averageBudget });
};

export const getCompletedProjectsFromEngineering = (req, res) => {
  const companyData = readCompanyDataFromFile();
  const engineeringDept = companyData.departments.find(
    (department) => department.name === "Engineering"
  );

  if (!engineeringDept) {
    return res.status(404).send("Engineering department not found");
  }

  const completedProjects = engineeringDept.teams.flatMap((team) =>
    team.projects.filter((project) => project.completed)
  );
  res.status(200).json({ completedProjects });
};

export const getManagerWithMostHighBudgetProjects = (req, res) => {
  const companyData = readCompanyDataFromFile();
  let manager = null;
  let maxCount = 0;

  companyData.departments.forEach((department) => {
    department.teams.forEach((team) => {
      const highBudgetProjects = team.projects?.filter(
        (project) => project.budget > 100000
      );
      const highBudgetCampaigns = team.campaigns
        ? team.campaigns?.filter((campaign) => campaign?.budget > 100000)
        : [];
      const totalProjects =
        highBudgetProjects?.length + highBudgetCampaigns?.length;

      if (totalProjects > maxCount) {
        maxCount = totalProjects;
        manager = team.lead;
      }
    });
  });

  if (manager) {
    res.status(200).json({ manager });
  } else {
    res
      .status(404)
      .send("No manager found with high-budget projects or campaigns");
  }
};

export const getProjectsWithSameTeamMembers = (req, res) => {
  const companyData = readCompanyDataFromFile();
  const projectTeams = {};

  companyData.departments?.forEach((department) => {
    department.teams?.forEach((team) => {
      team.projects?.forEach((project) => {
        const membersKey = project.team_members?.sort()?.join(",");
        if (!projectTeams[membersKey]) {
          projectTeams[membersKey] = [];
        }
        projectTeams[membersKey].push(project.name);
      });
    });
  });

  const sameMembersProjects = Object.values(projectTeams)?.filter(
    (projects) => projects.length > 1
  );
  res.status(200).json({ sameMembersProjects });
};
