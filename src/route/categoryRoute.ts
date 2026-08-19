import express, { Router } from "express";
import CategoryController from "../Database/models/categoryController";
import userMiddleware from "../middleware/userMiddleware";
import Role from "../Database/models/userModel";

const router: Router = express.Router();
const categoryController: any = new CategoryController();

router
  .route("/")
  .get(categoryController.getCategories)
  .post(
    categoryController.addCategory,
    userMiddleware.restrictTo(Role.ADMIN),
    categoryController.restrictCategoryToController
  );

router
  .route("/:id")
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;