import { Router } from "express";
import { isAdmin, verifyToken } from "../middlewares/verifyToken.js";
import { getLyState, getMonthLyState } from "./controller.js";

const hissobodRouter = Router();

hissobodRouter.get("/", verifyToken, isAdmin, getLyState);
hissobodRouter.get("/oylik", verifyToken, isAdmin, getMonthLyState);

export default hissobodRouter;
