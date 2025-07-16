import express from "express";
import dotenv from "dotenv";
import cors from "cors";
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

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
