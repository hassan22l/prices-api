import { Request, Response } from 'express';
import { ProductService } from '../service/product.service';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const product = await this.productService.getProduct(id);
    return res.status(200).json(product);
  }
}
