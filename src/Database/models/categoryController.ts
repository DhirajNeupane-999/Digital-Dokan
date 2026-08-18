import categoryModel from "./categoryModel";

class CategoryController {
  categoryData = [
    {
      CategoryName: "Electronics",
    },
    {
      CategoryName: "Clothing",
    },
    {
      CategoryName: "Foods",
    },
    {
      CategoryName: "Books",
    },
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
}

export default CategoryController;