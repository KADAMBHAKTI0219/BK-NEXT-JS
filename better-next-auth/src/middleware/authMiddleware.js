import { verifyToken } from "@/utils/generateToken";

export function authMiddleware(handler) {
  return async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      req.user = verifyToken(token);
      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}