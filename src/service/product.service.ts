import { GovernmentPricesClient } from "../client/goverment-prices.client";

export class ProductService {
  private readonly client: GovernmentPricesClient;

  constructor() {
    this.client = new GovernmentPricesClient();
  }

  async getProduct(id: string): Promise<any> {
    return this.client.getPrice(id);
  }
}
