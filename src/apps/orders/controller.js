import ordersModel from "../models/orders_models.js";
import users from "../models/user_models.js";

export async function getAllOrders(req, res, next) {
  try {
    const status = req.query.status;
    const user = req.user.id;
    const user_inspect = await users.findById(user);
    if (!user_inspect) {
      const err = new Error("foydalanuvchi topilmadi");
      err.status = 404;
      throw err;
    }
    if (status === "active") {
      const orders = await ordersModel
        .find({ user: user })
        .sort({ createdAt: -1 });

      res.send({
        message: "Sizning aktiv buyurtmalaringiz",
        orders,
      });
    } else if (status === "passive") {
      const orders = await ordersModel
        .find({ user: user, status: "qaytarilgan" })
        .sort({ createdAt: -1 });
      res.send({
        message: "Sizning passiv buyurtmalaringiz",
        orders,
      });
    }
  } catch (err) {
    next(err);
  }
}

// export async function getUserOrders(req, res, next) {
//   try {
//     const userId = req.user.id;
//     const user_inspect = await users.findById(userId);
//     if (!user_inspect) {
//       const err = new Error("foydalanuvchi topilmadi");
//       err.status = 404;
//       throw err;
//     }

//     const orders = await ordersModel
//       .find({ user: userId })
//       .sort({ createdAt: -1 });

//     res.send({
//       message: "Sizning buyurtmalaringiz",
//       orders,
//     });
//   } catch (err) {
//     next(err);
//   }
// }
