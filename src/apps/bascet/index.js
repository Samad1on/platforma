import { Router } from "express";
import {
  bascetBuyAll,
  bascetTake,
  deletBascetById,
  cancelSingleProduct,
} from "./controller.js";
import {
  bascetValidate,
  validate,
  bascetAddValidate,
} from "./bascet_validate.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const bascetRoutes = Router();

bascetRoutes.post("/", validate(bascetAddValidate), verifyToken, bascetTake);
bascetRoutes.post("/buy", verifyToken, bascetBuyAll);

bascetRoutes.delete(
  "/:id",
  validate(bascetValidate),
  verifyToken,
  deletBascetById
);
bascetRoutes.delete(
  "/return/:id",

  verifyToken,
  cancelSingleProduct
);

export default bascetRoutes;
