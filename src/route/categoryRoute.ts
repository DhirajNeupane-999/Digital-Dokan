import express, { Router } from "express";
import CategoryController from "../Database/models/categoryController";

const router: Router = express.Router();
const categoryController: any = new CategoryController();

router.route("/").get(categoryController.getCategories).post(categoryController.addCategory);
router.route("/:id").patch(categoryController.updateCategory).delete(categoryController.deleteCategory);

export default router;
