import { Request, Response } from "express";

interface IProduct {
  productId: string;
  productQty: number;
}

class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    const { phoneNumber, address, products, totalAmount } = req.body;

    if (!phoneNumber || !address || !products || !totalAmount) {
      res.status(400).json({
        message: "Missing required fields",
      });
      return;
    }

    const parsedProducts: IProduct[] = Array.isArray(products) ? products : [];

    if (parsedProducts.length === 0) {
      res.status(400).json({ message: "Order must include at least one product" });
      return;
    }

    res.status(201).json({
      message: "Order created successfully",
      order: {
        phoneNumber,
        address,
        products: parsedProducts,
        totalAmount,
      },
    });
  }
}

export default OrderController;