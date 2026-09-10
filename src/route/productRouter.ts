import express, { Router, Request, Response } from 'express';
import ProductController from '../Database/models/controllers/productController';
import UserMiddleware, { Role } from '../middleware/userMiddleware';
import { multer as upload, storage } from '../middleware/multerMiddleware';
const productController = new ProductController();
const router: Router = express.Router();

// Temporary/product placeholder routes — replace with real controllers later
router.get('/', (req: Request, res: Response) => {
	res.status(200).json({ message: 'List products (placeholder)' });
});

router.get('/:id', (req: Request, res: Response) => {
	res.status(200).json({ message: 'Get product (placeholder)', id: req.params.id });
});

export default router;


