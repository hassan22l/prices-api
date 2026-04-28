import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const required = ['PORT', 'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'GOVERNMENT_API_URL'];
required.forEach((key) => {
  if (!process.env[key]) throw new Error(`Missing env variable: ${key}`);});

export const config = {
  port: process.env.PORT || 3000,
  corsOrigins: process.env.CORS_ORIGINS?.split(';') || [],
  db: {
    host: process.env.DB_HOST || '',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || '',
  },
  governmentApiUrl: process.env.GOVERNMENT_API_URL || '',
};
