import { verifyToken } from "../utils/tokenUtils.js";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const user = verifyToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(403);
  }
};
