# Prices API

## Overview

Prices API is a lightweight backend service that provides product price data and related endpoints for the Prices project. It exposes RESTful endpoints for querying and managing product price information and is intended to be consumed by the price UI frontend.

## Features

- Serve product and price data via HTTP endpoints
- Simple configuration via environment variables
- Database schema provided in `database/db.sql`

## Tech Stack

- Node.js
- TypeScript
- Express
- SQLite (or the database defined in `database/db.sql`)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Install

```bash
npm install
```

### Environment

Copy/create an `.env` file in the project root and set the following (example):

- `PORT` — server port (default: `3000`)
- `DATABASE_URL` — path or connection string to the database (if applicable)

Adjust names to match any config files in `src/config`.

### Database

An initial SQL schema is available at `database/db.sql`. Use it to create or reset the local database.

### Run (development)

```bash
npm run dev
```

### Build & Run (production)

```bash
npm run build
npm start
```

## API Endpoints (examples)

The API routes are defined in `src/routes`. Example endpoints:

- `GET /products` — list products
- `GET /products/:id` — get product by id
- `POST /products` — create product (if implemented)

Inspect `src/routes/product.router.ts` and `src/controller` for the exact routes and payloads.

## Configuration

See `src/config` folder for `env`, `cors`, and `database` config. Ensure your environment variables align with those files.

## Contributing

Contributions are welcome. Open an issue or submit a pull request with a clear description of changes.

## License

This project does not include a license file by default. Add a `LICENSE` if you want to specify one.

## Contact

If you need help, open an issue or contact the repository owner.
