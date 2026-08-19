import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../../config/config";

class UserMiddleware {
  async isUserLoggedIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(403).json({
        message: "Token must be provided",
      });
      return;
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(403).json({
        message: "Invalid authorization format. Use Bearer <token>",
      });
      return;
    }

    const token = parts[1];

    try {
      const decoded = jwt.verify(
        token,
        envConfig.jwtSecretkey as string
      );

      console.log("Decoded token:", decoded);

      next();
    } catch (error) {
      res.status(403).json({
        message: "Invalid or expired token",
      });
      return;
    }
  }
}

export default new UserMiddleware();