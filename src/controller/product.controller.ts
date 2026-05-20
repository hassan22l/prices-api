import { Request, Response } from 'express';
import { ProductService } from '../service/product.service';

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const product = await this.productService.getProduct(id);
    return res.status(200).json(product);
  }

  async getUserPrice(req: Request, res: Response){
  try {
    const result = await this.productService.getUserPrice(String (req.params.id));
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: 'Error getting my price',
    });
  }
}

async saveUserPrice(req: Request, res: Response){
  try{
    const result = await
    this.productService.saveUserPrice(String(
      req.params.id),
      req.body.price
    );
    res.json(result);

  } catch(error){
    console.error('Error saving user price:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'error',
    });
  }
}
}


