import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../Database/models/userModel";
import { envConfig } from "../../config/config";

export enum Role {
  Admin = "admin",
  Customer = "customer",
}

interface IExtendedRequest extends Request {
  user?: any;
}

class UserMiddleware {
  async isUserLoggedIn(
    req: IExtendedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(403).json({ message: "Token must be provided" });
      return;
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(403).json({ message: "Invalid authorization format. Use Bearer <token>" });
      return;
    }

    const token = parts[1];

    try {
      const decoded = jwt.verify(token, envConfig.jwtSecretkey as string) as any;

      const userData = await User.findByPk(decoded.userId || decoded.id);
      if (!userData) {
        res.status(404).json({ message: "No user with that id" });
        return;
      }

      req.user = userData;
      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  }

  restrictTo(...roles: Role[]) {
    return (req: IExtendedRequest, res: Response, next: NextFunction) => {
      const userRole = req.user?.role as Role | undefined;
      if (!userRole || !roles.includes(userRole)) {
        res.status(403).json({ message: "You do not have permission to perform this action" });
        return;
      }
      next();
    };
  }
}

export default new UserMiddleware();