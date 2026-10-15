import express from "express";
import paymentController from "../paymentController";

const router = express.Router();

router.post("/khalti/initiate", paymentController.initiateKhaltiPayment);
router.post("/khalti/verify", paymentController.verifyKhaltiPayment);

export default router;
