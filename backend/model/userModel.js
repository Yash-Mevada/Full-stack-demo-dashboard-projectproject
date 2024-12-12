import fs from "fs";
import { USERS_FILE } from "../utils/constant.js";

export const readUsersFromFile = () => {
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
};

export const writeUsersToFile = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};
