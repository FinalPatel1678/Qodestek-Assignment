import {
  deleteProduct,
  getProducts,
  upsertProduct,
} from "../controllers/product";

import express from "express";
import { isAuthenticated } from "../middlewares/auth";

const router = express();

router.route("/:id").delete(isAuthenticated, deleteProduct);

router
  .route("/")
  .get(isAuthenticated, getProducts)
  .post(isAuthenticated, upsertProduct);

export default router;
