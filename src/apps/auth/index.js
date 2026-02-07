import { Router } from "express";
import { sighUpUser, loginUser, me, updateUserById } from "./controller.js";
import {
  signUpSchema,
  loginSchema,
  updateSchema,
  validate,
} from "./user_validator.js";
import { verifyToken } from "../middlewares/verifyToken.js";
// import { validate2 } from "../middlewares/validators.js";

const auth = Router();

auth.post("/sign-up", validate(signUpSchema), sighUpUser);
auth.post("/login", validate(loginSchema), loginUser);

auth.get("/me", verifyToken, me);
auth.patch("/user", validate(updateSchema), verifyToken, updateUserById);

export default auth;
