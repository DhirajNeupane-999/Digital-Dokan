import { Request, Response } from "express";
import user from "./Database/models/userModel";
import bcrypt from "bcrypt";
import generateToken from "./Services/generateToken";

class userController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          message: "All fields are required"
        });
      }

      const newUser = await user.create({
        username,
        email,
        password: bcrypt.hashSync(password, 12)
      });
      const token = generateToken(newUser.id.toString());
      return res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Unable to create user"
      });
    }
  }
}

export default userController;
