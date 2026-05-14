import { Router } from 'express';
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../service/product.service';
import { db } from '../config/database.cofig'
const productRouter = Router();
const productController = new ProductController(new ProductService());

productRouter.get('/:id', (req, res) => productController.getProduct(req, res));
productRouter.get('/:id/users_prices',(req, res) => productController.getUserPrice(req, res));

productRouter.post('/:id/users_prices', (req, res) => productController.saveUserPrice(req, res));

export default productRouter;

