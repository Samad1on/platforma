import { Router } from "express";
import { verifyToken } from "../apps/middlewares/verifyToken.js";
import users from "../apps/models/user_models.js";

const app = Router();

app.get("/", verifyToken, async (req, res) => {
  const user = await users.findById(req.user.id);
  if (!user) return res.send("user topilmadi");

  res.send({
    message: "Sizning profilingiz",
    user,
  });
});
export default app;
