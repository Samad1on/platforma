import { Router } from "express";
import { izohPost } from "./controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const routerIzoh = Router();

routerIzoh.post("/:id", verifyToken, izohPost);
export default routerIzoh;
