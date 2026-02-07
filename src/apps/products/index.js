import { Router } from "express";
import { validate, productCreateValdatr } from "./product_validator.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/verifyToken.js";
import {
  createProduct,
  getProduct,
  getProductTypes,
  updateProduct,
} from "./controller.js";
const productsRoutes = Router();

productsRoutes.post(
  "/products",
  validate(productCreateValdatr),
  verifyToken,
  isAdmin,
  createProduct
);
productsRoutes.get("/:types", verifyToken, getProductTypes);
productsRoutes.get("/", verifyToken, getProduct);
productsRoutes.patch(
  "/products/:id",
  validate(productCreateValdatr),
  verifyToken,
  isAdmin,
  updateProduct
);

export default productsRoutes;
