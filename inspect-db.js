const { Client } = require('pg');
require('dotenv').config();
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

(async () => {
  await client.connect();
  const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE '%price%' ORDER BY table_name");
  console.log('tables:', JSON.stringify(tables.rows, null, 2));

  const cols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'user_prices' ORDER BY ordinal_position");
  console.log('user_prices columns:', JSON.stringify(cols.rows, null, 2));

  const cols2 = await client.query("SELECT column_name FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users_prices' ORDER BY ordinal_position");
  console.log('users_prices columns:', JSON.stringify(cols2.rows, null, 2));

  await client.end();
})();
