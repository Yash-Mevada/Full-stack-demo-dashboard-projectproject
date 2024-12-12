import bcrypt from "bcryptjs";
import { readUsersFromFile, writeUsersToFile } from "../model/userModel.js";
import { generateToken, verifyToken } from "../utils/tokenUtils.js";

export const registerUser = (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();
  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);
  writeUsersToFile(users);
  res.status(201).send("User registered successfully");
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const users = readUsersFromFile();
  const user = users.find((user) => user.username === username);
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!user || !isPasswordMatch) {
    return res.status(401).send("Invalid credentials");
  }

  const token = generateToken(user);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).send("Logged in successfully");
};

export const logOutUser = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(200).json({ message: "Cookies deleted successfully" });
};

export const checkAuth = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ authenticated: false });
  }

  try {
    const decoded = await verifyToken(token);
    return res
      .status(200)
      .json({ status: 200, authenticated: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ authenticated: false, error: error.message });
  }
};

export const getUserDashboard = (req, res) => {
  res.status(200).send(`Welcome to your dashboard, ${req.user.username}`);
};
