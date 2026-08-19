import express from "express";
import userController from "../userController";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/forgot-password", userController.handleForgotPassword);
router.post("/verify-otp", userController.verifyOtp);
router.post("/reset-password", userController.resetPassword);

export default router;
