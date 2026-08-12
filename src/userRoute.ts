
import express from 'express';
import userController from './userController';
const router = express.Router()
//router.post('/register', userController.register)
//router.get('/register', userController.register)

router.route("/register").post(userController.register)
router.route("/register").get(userController.register)

export default router;