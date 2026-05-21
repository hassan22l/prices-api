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

  async getUserPrice(id:string){
  const result = await db.query(
    "SELECT price FROM user_prices WHERE id = $1",
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
  INSERT INTO users_prices (id,price)
  VALUES ($1, $2)
  ON CONFLICT (id)
  DO UPDATE SET 
  price= EXCLUDED.price,
  updated_at =NOW ()
  `,
  [id, price]
  );
  return{
    success: true,
  };

}

}



