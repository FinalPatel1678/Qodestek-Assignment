import { getUserByToken, logIn } from "../controllers/auth";

import express from "express";
import { isAuthenticated } from "../middlewares/auth";

const router = express();

router.route("/auth").get(logIn);
router.route("/get-user-by-token").get(isAuthenticated, getUserByToken);

export default router;
