
import express from "express";
const _uc = require("./userController");
const register = _uc.register ?? _uc.default?.register;
const handleForgotPassword = _uc.handleForgotPassword ?? _uc.default?.handleForgotPassword ?? _uc.handleForgotPasswordHandler;

console.log('userRoute handlers:', { registerType: typeof register, handleForgotPasswordType: typeof handleForgotPassword });
console.log('userController module keys:', Object.keys(_uc));
console.log('userController.default present:', !!_uc.default);
console.log('default.register type:', typeof _uc.default.register);
console.log('default.handleForgotPassword type:', typeof _uc.default.handleForgotPassword);
console.log('default own props:', Object.getOwnPropertyNames(_uc.default));

const router = express.Router();

router.post("/register", register);
router.post("/forgot-password", async (req: any, res: any) => {
	try {
		const { email } = req.body;
		if (!email) return res.status(400).json({ message: "please provide an email" });

		const User = require("./Database/models/userModel").default;
		const foundUser = await User.findOne({ where: { email } });
		if (!foundUser) return res.status(404).json({ message: "email not registered" });

		const generateOtp = require("./Services/generateOtp").default;
		const otp = generateOtp();
		return res.status(200).json({ message: "OTP generated", otp });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Unable to process forgot password" });
	}
});
 

export default router;