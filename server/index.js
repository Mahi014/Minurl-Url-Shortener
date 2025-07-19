import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./db.js";
import {shortenUrl,redirectUrl} from "./urlController.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/shorten", shortenUrl);
//redirect route
app.get("/:shortCode", redirectUrl);

const createTableIfNotExists = async (retries = 5) => {
  while (retries) {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS urls (
          id SERIAL PRIMARY KEY,
          original_url TEXT NOT NULL,
          short_code VARCHAR(10) UNIQUE NOT NULL,
          click_count INTEGER DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log("Table 'urls' is ready");
      break;
    } catch (err) {
      console.error("Failed to create table. Retrying...", err);
      retries -= 1;
      await new Promise(res => setTimeout(res, 3000)); 
    }
  }

  if (!retries) {
    console.error("Could not connect to DB after multiple attempts");
  }
};

createTableIfNotExists();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
