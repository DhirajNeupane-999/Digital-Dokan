import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'List products (placeholder)' });
});

router.get('/:id', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Get product (placeholder)', id: req.params.id });
});

export default router;


