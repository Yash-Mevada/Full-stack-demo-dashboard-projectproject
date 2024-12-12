import fs from "fs";
import { COMPANY_DATA_FILE } from "../utils/constant.js";

export const readCompanyDataFromFile = () => {
  const data = fs.readFileSync(COMPANY_DATA_FILE);
  return JSON.parse(data);
};
