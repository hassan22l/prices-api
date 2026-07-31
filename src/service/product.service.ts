import { GovernmentPricesClient } from "../client/goverment-prices.client";
import {db} from "../config/database.cofig"

export class ProductService {
  private readonly client: GovernmentPricesClient;

  constructor() {
    this.client = new GovernmentPricesClient();
  }

  async getProduct(id: string): Promise<any> {
    const product = await this.client.getPrice(id);
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



