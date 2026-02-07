import { Router } from "express";
import { getAllOrders } from "./controller.js";
// import { ordersValidate, validate } from "./order_validate.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const orderRoutes = Router();
// orderRoutes.get("/", verifyToken, getUserOrders);
orderRoutes.get("/", verifyToken, getAllOrders);

export default orderRoutes;
