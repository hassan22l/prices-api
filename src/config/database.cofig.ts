import { Pool } from 'pg';
import dotenv from 'dotenv';
import type { Pool as PgPool } from 'pg';

dotenv.config();

export const db: PgPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export class DatabaseConfig {
  constructor() {}
}
