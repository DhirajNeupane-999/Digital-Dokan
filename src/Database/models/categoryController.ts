import { NextFunction, Request, Response } from "express";
import categoryModel from "./categoryModel";

class CategoryController {
  categoryData = [
    { categoryName: "Electronics" },
    { categoryName: "Clothing" },
    { categoryName: "Foods" },
    { categoryName: "Books" },
  ];

  async seedCategories(): Promise<void> {
    const data = await categoryModel.findAll();
    if (data.length === 0) {
      await categoryModel.bulkCreate(this.categoryData as any);
      console.log("categories seeded successfully");
    } else {
      console.log("categories already seeded");
    }
  }

  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryModel.findAll();
      res.status(200).json({ categories });
    } catch (error: any) {
      res.status(500).json({ message: "Unable to fetch categories", error: error.message });
    }
  }

  async addCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryName } = req.body;
      if (!categoryName) {
        res.status(400).json({ message: "Category name is required" });
        return;
      }

      const newCategory = await categoryModel.create({ categoryName });
      res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error: any) {
      res.status(500).json({ message: "Unable to create category", error: error.message });
    }
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { categoryName } = req.body;
      const category = await categoryModel.findByPk(id);

      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      category.categoryName = categoryName ?? category.categoryName;
      await category.save();
      res.status(200).json({ message: "Category updated successfully", category });
    } catch (error: any) {
      res.status(500).json({ message: "Unable to update category", error: error.message });
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const category = await categoryModel.findByPk(id);

      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }

      await category.destroy();
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: "Unable to delete category", error: error.message });
    }
  }

  restrictCategoryToController(req: Request, res: Response, next: NextFunction): void {
    next();
  }
}

export default CategoryController;
