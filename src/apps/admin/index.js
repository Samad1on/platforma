import { Router } from "express";
import {
  delete_userById,
  get_user_inspect,
  get_users_inspect,
  update_userById,
} from "./controller_admin.js";
import { updateSchema, userIdValidation, validate } from "./admin_validator.js";
import { verifyToken, isAdmin } from "../middlewares/verifyToken.js";
// import productsRoute from "../products/index.js";

const admin = Router();

admin.get("/users", verifyToken, isAdmin, get_users_inspect);
admin.get(
  "/user/:id",
  validate(userIdValidation),
  verifyToken,
  isAdmin,
  get_user_inspect
);
admin.patch(
  "/user_update/:id",
  validate(updateSchema),
  verifyToken,
  isAdmin,
  update_userById
);
admin.delete(
  "/user_delete/:id",

  verifyToken,
  isAdmin,
  delete_userById
);

export default admin;
