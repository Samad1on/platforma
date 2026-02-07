import { Router } from "express";
import auth from "./apps/auth/index.js";
import admin from "./apps/admin/index.js";
import productsRoute from "./apps/products/index.js";
import bascetUser from "./apps/bascet/index.js";
import orders from "./apps/orders/index.js";
import izoh from "./apps/izoh/index.js";
import profile from "./utils/index.js";
import { errorHandler } from "./apps/middlewares/errorHandler.js";
import hissobodRouter from "./apps/hissobod/index.js";

const router = Router();
router.use("/profile", profile);
router.use("/auth", auth);
router.use("/setings/admin", admin);
router.use("/admin", productsRoute);
router.use("/products", productsRoute);
router.use("/bascet", bascetUser);
router.use("/orders", orders);
router.use("/izoh", izoh);
router.use("/hissobod", hissobodRouter);
router.use(errorHandler);

export default router;
