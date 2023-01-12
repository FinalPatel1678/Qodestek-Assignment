import auth from "./routes/auth";
import cors from "cors";
import express from "express";
import product from "./routes/product";

const app = express();

app.use(cors());

app.use(express.json());

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

app.use("/api/v1/user", auth);
app.use("/api/v1/product", product);

export default app;
