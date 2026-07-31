import { Request, Response } from "express";
import { ProductService } from "../service/product.service";

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  async getProduct(req: Request, res: Response): Promise<Response> {
    const { id } = req.params as { id: string };
    const product = await this.productService.getProduct(id);
    return res.status(200).json(product);
  }

  async getUserPrice(req: Request, res: Response) {
    try {
      const result = await this.productService.getUserPrice(
        String(req.params.id),
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: "Error getting my price",
      });
    }
  }
  async saveUserPrice(req: Request, res: Response) {
  try {
    console.log("Body recibido:", req.body);

    const barcode = req.params.id as string;
    const price = Number(req.body.price);

    console.log("Barcode:", barcode, "Precio:", price, "Es número válido:", !isNaN(price));

    if (!barcode || isNaN(price)) {
      return res.status(400).json({
        error: "Barcode o precio inválido",
        barcode,
        price,
      });
    }

    const result = await this.productService.saveUserPrice(
      barcode,
      price
    );

    console.log("Resultado guardado:", result);
    res.json(result);
  } catch (error) {
    console.error("ERROR REAL:", error);

    res.status(500).json({
      error: "Error guardando precio",
      details: error instanceof Error ? error.message : "Error desconocido",
    });
  }
}
}
