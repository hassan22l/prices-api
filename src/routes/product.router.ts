import { Router } from 'express';
import { ProductController } from '../controller/product.controller';
import { ProductService } from '../service/product.service';

const productRouter = Router();
const productController = new ProductController(new ProductService());

productRouter.get('/:id', (req, res) => productController.getProduct(req, res));

export default productRouter;
