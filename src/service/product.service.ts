import { GovernmentPricesClient } from "../client/goverment-prices.client";
import {db} from "../config/database.cofig"

export class ProductService {
  private readonly client: GovernmentPricesClient;

  constructor() {
    this.client = new GovernmentPricesClient();
  }

  async getProduct(id: string): Promise<any> {
    return this.client.getPrice(id);
  }

  async getUserPrice(barcode:string){
  const result = await db.query(
    "SELECT price FROM user_prices WHERE barcode = $1",
    [barcode]
  );

  if (result.rows.length === 0 ){
    return {
      price: null,
    };
  }
  return result.rows[0];
}

async saveUserPrice(barcode: string, price: number){
  await db.query(
  `
  INSERT INTO user_prices (barcode,price)
  VALUES ($1, $2)
  ON CONFLICT (barcode)
  DO UPDATE SET 
  price= EXCLUDED.price,
  updated_at =NOW ()
  `,
  [barcode, price]
  );
  return{
    success: true,
  };

}

}

