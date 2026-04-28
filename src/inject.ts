import { Router } from 'express';
import productRouter from './routes/product.router';

export const appRouter = Router();

appRouter.use('/api/v1/products', productRouter);

appRouter.get('/api/v1/status', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});
