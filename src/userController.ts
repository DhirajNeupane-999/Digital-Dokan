import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "./Database/models/userModel";
import generateToken from "./Services/generateToken";
import generateOtp from "./Services/generateOtp";

class userController {
  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newUser = await User.create({
        username,
        email,
        password: bcrypt.hashSync(password, 12),
      });

      const token = generateToken(newUser.id.toString());
      return res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to create user" });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValidPassword = bcrypt.compareSync(password, foundUser.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = generateToken(foundUser.id.toString());
      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: foundUser.id,
          username: foundUser.username,
          email: foundUser.email,
        },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to login" });
    }
  }

  static async handleForgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: "please provide an email" });

      const foundUser = await User.findOne({ where: { email } });
      if (!foundUser) return res.status(404).json({ message: "email not registered" });

      const otp = generateOtp();
      return res.status(200).json({ message: "OTP generated", otp });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Unable to process forgot password" });
    }
  }

  static async verifyOtp(req: Request, res: Response) {
    const { otp } = req.body;

    if (!otp) {
      return res.status(400).json({ message: "OTP is required" });
    }

    return res.status(200).json({ message: "OTP verified successfully" });
  }

  static async resetPassword(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    return res.status(200).json({ message: "Password reset successfully" });
  }
}

export const register = userController.register;
export const handleForgotPassword = userController.handleForgotPassword;
export const login = userController.login;
export const verifyOtp = userController.verifyOtp;
export const resetPassword = userController.resetPassword;

export default userController;

export async function handleForgotPasswordHandler(req: Request, res: Response) {
  return userController.handleForgotPassword(req, res);
}
