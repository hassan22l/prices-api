import { GovernmentPricesClient } from "../client/goverment-prices.client";
import {db} from "../config/database.cofig"

export class ProductService {
  private readonly client: GovernmentPricesClient;

  constructor() {
    this.client = new GovernmentPricesClient();
  }

  async getProduct(id: string): Promise<any> {
    const product = await this.client.getPrice(id);

    await this.saveProductIfNew(product);

    const storedProductResult = await db.query(
      "SELECT image FROM products WHERE barcode = $1",
      [id]
    );
    const storedImage = storedProductResult.rows[0]?.image ?? null;
    if (storedImage) {
      product.image = storedImage;
    }

    const userPriceResult = await db.query(
      "SELECT price FROM user_prices WHERE barcode = $1",
      [id]
    );

    const userPrice = userPriceResult.rows[0]?.price ?? null;
    const response = userPrice !== null
      ? {
          ...product,
          userPrice,
        }
      : product;

    console.log("[SCAN PRODUCT DEBUG]", {
      id,
      product,
      userPrice,
      response,
    });

    return response;
  }

  private async saveProductIfNew(product: any): Promise<void> {
    if (!product?.barcode || !product?.name) {
      return;
    }

    try {
      await db.query(
        `
        INSERT INTO products (barcode, name, description, image, price)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (barcode) DO NOTHING
        `,
        [
          product.barcode,
          product.name,
          product.description ?? null,
          product.image ?? null,
          0,
        ]
      );
    } catch (error) {
      console.error("[SAVE PRODUCT ERROR]", error);
    }
  }

  async getUserPrice(id:string){
  const result = await db.query(
    "SELECT price FROM user_prices WHERE barcode = $1",
    [id]
  );

  if (result.rows.length === 0 ){
    return {
      price: null,
    };
  }
  return result.rows[0];
}
  async saveUserPrice(id: string, price: number){
  await db.query(
  `
  INSERT INTO user_prices (barcode, price)
  VALUES ($1, $2)
  ON CONFLICT (barcode)
  DO UPDATE SET 
  price = EXCLUDED.price,
  updated_at = NOW()
  `,
  [id, price]
  );
  return{
    success: true,
    price: price,
  };

}

}



