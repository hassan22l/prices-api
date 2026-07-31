import express from "express";
import cors from "cors";
import * as bodyParser from "body-parser";
import { appRouter } from "./inject"
import { config } from "./config/env.config";
import { db } from "./config/database.cofig";

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json({ limit: "15mb" }));
app.use(appRouter);

db.connect()
.then(() => {
  console.log("Connected to the database");
})
.catch((err: unknown) => {
  console.error("Database connection error:", err);
});


app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});

export default app;