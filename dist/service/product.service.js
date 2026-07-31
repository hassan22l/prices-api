"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const goverment_prices_client_1 = require("../client/goverment-prices.client");
const database_cofig_1 = require("../config/database.cofig");
class ProductService {
    constructor() {
        this.client = new goverment_prices_client_1.GovernmentPricesClient();
    }
    async getProduct(id) {
        const product = await this.client.getPrice(id);
        const userPriceResult = await database_cofig_1.db.query("SELECT price FROM user_prices WHERE barcode = $1", [id]);
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
    async getUserPrice(id) {
        const result = await database_cofig_1.db.query("SELECT price FROM user_prices WHERE barcode = $1", [id]);
        if (result.rows.length === 0) {
            return {
                price: null,
            };
        }
        return result.rows[0];
    }
    async saveUserPrice(id, price) {
        await database_cofig_1.db.query(`
  INSERT INTO user_prices (barcode, price)
  VALUES ($1, $2)
  ON CONFLICT (barcode)
  DO UPDATE SET 
  price = EXCLUDED.price,
  updated_at = NOW()
  `, [id, price]);
        return {
            success: true,
            price: price,
        };
    }
}
exports.ProductService = ProductService;
