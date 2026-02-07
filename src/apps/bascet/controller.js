import users from "../models/user_models.js";
import product from "../models/product_models.js";
import ordersModel from "../models/orders_models.js";
import statsModel from "../models/oy.js";

export async function bascetTake(req, res, next) {
  try {
    const { productId } = req.body;
    let quanti = Number(req.body.quantity);

    if (isNaN(quanti) || quanti <= 0) {
      quanti = 1;
    }

    const user = await users.findById(req.user.id);
    if (!user) {
      const err = new Error("bunday user mavjud emas");
      err.status = 404;
      throw err;
    }

    // && !mongoose.Types.ObjectId.isValid(req.body.productId)

    const prod = await product.findById(productId);
    if (!prod) {
      const err = new Error("bunday product mavjud emas");
      err.ststus = 404;
      throw err;
    }
    // console.log("ishladi");
    const index = user.bascet.findIndex(
      (p) => p.productId.toString() === String(productId)
    );

    if (prod.quantity < quanti) {
      const err = new Error("mahsulot soni yetarli emas ");
      err.status = 400;
      throw err;
    }
    if (index !== -1) {
      user.bascet[index].quantity += quanti;
    } else {
      user.bascet.push({
        productId: prod._id,
        category: prod.catgory,
        name: prod.name,
        quantity: quanti,
        price: prod.price,
      });
    }
    user.markModified("bascet");
    await user.save();

    res.send({
      message: "Mahsulot savatchaga qo'shildi",
      bascet: user.bascet,
    });
  } catch (error) {
    next(error);
  }
}
export async function bascetBuyAll(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await users.findById(req.user.id);
    if (!user) return res.status(404).send("User topilmadi");

    if (!user.bascet || user.bascet.length === 0)
      return res.status(400).send("Savatcha bosh");

    const ordersToCreate = [];

    for (let item of user.bascet) {
      const productDoc = await product.findById(item.productId);
      if (!productDoc)
        return res.status(404).send(`Product topilmadi: ${item.name}`);
      if (item.quantity > productDoc.quantity)
        return res.status(400).send(`Mahsulot yetarli emas: ${item.name}`);

      const cost = item.quantity * item.price;
      if (user.found < cost) return res.status(400).send("Balans yetarli emas");

      productDoc.quantity -= item.quantity;
      user.found -= cost;
      await productDoc.save();

      // hissoblash oyma oy
      await statsModel.findOneAndUpdate(
        {
          tuman: user.manzil,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
        },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      );
      ordersToCreate.push({
        user: userId,
        category: item.category,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        status: "tayyorlanmoqda",
      });
    }

    const createdOrders = await ordersModel.insertMany(ordersToCreate);

    user.bascet = [];
    await user.save();

    const orderIds = createdOrders.map((o) => o._id);

    setTimeout(async () => {
      await ordersModel.updateMany(
        { _id: { $in: orderIds } },
        { $set: { status: "yolga chqdi" } }
      );
      console.log("Orders status: yolga chqdi " + `id ${orderIds}`);
    }, 1000 * 1000);

    setTimeout(async () => {
      await ordersModel.updateMany(
        { _id: { $in: orderIds } },
        { $set: { status: "yetkazildi" } }
      );
      console.log("Orders status: yetkazildi " + `id ${orderIds}`);
    }, 110 * 1000);

    res.send({
      message: "Savatcha buyurtmaga aylandi. Statuslar avtomatik yangilanadi.",
      orders: createdOrders,
      balans: user.found,
    });
  } catch (err) {
    next(err);
  }
}
// export async function bascetBuyAll(req, res) {
//   try {
//     const userId = req.user.id;
//     const user = await users.findById(userId);
//     if (!user) return res.send("User topilmadi");

//     if (!user.bascet || user.bascet.length === 0)
//       return res.status(400).send("Savatcha bosh");

//     const ordersToPush = [];

//     for (const item of user.bascet) {
//       if (!mongoose.Types.ObjectId.isValid(item.productId))
//         return res.send(`ProductId notogri: ${item.name}`);

//       const productDoc = await product.findById(item.productId);
//       if (!productDoc) return res.send(`Mahsulot topilmadi: ${item.name}`);

//       if (item.quantity > productDoc.quantity) {
//         return res.send(`Mahsulot soni yetarli emas: ${item.name}`);
//       } else {
//         productDoc.quantity -= item.quantity;
//         await productDoc.save();
//       }
//       const totalPrice = item.price * item.quantity;
//       if (user.found < totalPrice)
//         return res.send(`Mablag yetarli emas: ${item.name}`);
//     }

//     for (const item of user.bascet) {
//       const totalPrice = item.price * item.quantity;
//       user.found -= totalPrice;

//       const orderId = new mongoose.Types.ObjectId();
//       const order = {
//         _id: orderId,
//         category: item.category,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//         status: "tayyorlanmoqda",
//       };

//       ordersToPush.push(order);
//     }

//     user.orders.push(...ordersToPush);
//     user.bascet = [];

//     await user.save();

//     const allOrderIds = ordersToPush.map((o) => o._id);

//     setTimeout(async () => {
//       try {
//         await users.updateOne(
//           { _id: userId },
//           { $set: { "orders.$[el].status": "yolga chiqdi" } },
//           { arrayFilters: [{ "el._id": { $in: allOrderIds } }] }
//         );
//         console.log(
//           `User ${userId} Order Id: ${orderId} — yolga chiqdi`,
//           result.modifiedCount
//         );
//       } catch (error) {
//         console.log("error changing status (yolga chqdi ):", error);
//       }
//     }, 10 * 1000);

//     setTimeout(async () => {
//       try {
//         await users.updateOne(
//           { _id: userId },
//           { $set: { "orders.$[el].status": "yetkazildi" } },
//           { arrayFilters: [{ "el._id": { $in: allOrderIds } }] }
//         );
//         console.log(
//           `User ${userId} Order Id: ${orderId} — yetkazildi `,
//           result.modifiedCount
//         );
//       } catch (error) {
//         console.log("error changing status (yetkazildi ):", error);
//       }
//     }, 100 * 1000);
//     //sukarinkatezumoto

//     res.send({
//       message:
//         "Barcha savatcha mahsulotlari buyurtma qilindi. Statuslar avtomatik yangilanadi.",
//       orders: ordersToPush,
//       balans: user.found,
//     });
//   } catch (err) {
//     console.log("Hatolik bascetBuyAll:", err);
//     res.status(500).send({ message: "Xato buyurtma", error: err.message });
//   }
// // }

// export async function bascetBuyUserById(req, res) {
//   try {
//     const id = req.user.id;
//     let { productId } = req.body;
//     let quanti = Number(req.body.quantity);

//     if (isNaN(quanti) || quanti <= 0) {
//       quanti = 1;
//     }
//     const user_inspect = await users.findById(id);
//     if (!user_inspect) {
//       console.log("buyurtmani olishda hatolik ");
//       return res.send("buyurtmani olishda hatolik ");
//     }
//     const orders_inspect = await product.findById(productId);
//     if (!orders_inspect) return res.send("Product topilmadi");

//     const bascet_inspect = user_inspect.bascet.find(
//       (p) => p.productId.toString() === productId
//     );
//     if (!bascet_inspect) return res.send("Savatchada mahsulot yoq");

//     if (orders_inspect.quantity < quanti) {
//       console.log("mahsulot soni kam ");
//       return res.send("mahsulot soni kam ");
//     } else {
//       orders_inspect.quantity -= quanti;
//     }
//     if (user_inspect.found < quanti * orders_inspect.price) {
//       console.log("mahsulot uchun mablag' yetarli emas ");
//       return res.send("mahsulot uchun mablag' yetarli emas ");
//     } else {
//       user_inspect.found -= quanti * orders_inspect.price;
//     }
//     // const orders_inspect_id = user_inspect.orders.map((el) => el == id);
//     // console.log(orders_inspect_id);

//     const orderId = new mongoose.Types.ObjectId();
//     const orders = {
//       _id: orderId,
//       catgory: orders_inspect.catgory,
//       name: orders_inspect.name,
//       price: orders_inspect.price,
//       quantity: quanti,
//       status: "tayyorlanmoqda",
//     };
//     user_inspect.orders.push(orders);

//     await user_inspect.save();

//     await orders_inspect.save();

//     setTimeout(async () => {
//       try {
//         const result = await users.updateOne(
//           { _id: id, "orders._id": orderId },
//           { $set: { "orders.$.status": "yolga chiqdi" } }
//         );
//         console.log(
//           `User ${id} Order Id: ${orderId} — yolga chiqdi`,
//           result.modifiedCount
//         );
//       } catch (err) {
//         console.log(" Error changing status (yolga chiqdi):", err);
//       }
//     }, 10 * 1000);

//     setTimeout(async () => {
//       try {
//         const result = await users.updateOne(
//           { _id: id, "orders._id": orderId },
//           { $set: { "orders.$.status": "yetkazildi" } }
//         );
//         console.log(
//           `User ${id} Order Id: ${orderId} — yetkazildi `,
//           result.modifiedCount
//         );
//       } catch (err) {
//         console.log(" Error changing status (yetkazildi):", err);
//       }
//     }, 100 * 1000);

//     res.send({
//       satatus: `mahsulot yetkazishga tayyorlnmoqda mahsulotni qabul qilib olganingizdan song uni 1 hafta ichda qaytarishingiz mumki9n savollar bolsa szni //izoh// bolimida kutamiz`,
//       orders,
//     });
//   } catch (error) {
//     console.log("hatolik ordeer Buy da ", error);
//     res.send({
//       message: "hato buyurtma",
//       error,
//     });
//   }
// }

export async function deletBascetById(req, res) {
  try {
    const productId = req.params.id;
    const user_inspect = await users.findById(req.user.id);
    if (!user_inspect) {
      console.log("bunday userni topib bolmadi", user_inspect);
      satatus = 404;
      throw error("bunday user mavjud emas");
    }
    const product_inspect = await user_inspect.bascet.findIndex(
      (e) => e.productId.toString() === productId
    );
    if (product_inspect === -1) {
      console.log("bunday productni topib bolmadi bascetida ", product_inspect);
      return res.send("bunday product userni bascetid mavjud  emas");
    }
    user_inspect.bascet.splice(product_inspect, 1);
    await user_inspect.save();

    res.send({
      message: "mahsulot userni bascetidan tashqariga chqarildi",
      bascet: user_inspect.bascet,
    });
  } catch (error) {
    next(error);
    // console.log("hatolik get bascetda ", error);
    // res.send("bascetni topishda hatolik");
  }
}

export async function cancelSingleProduct(req, res, next) {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const user = await users.findById(userId);
    if (!user)
      return res.status(404).send({ error: "Foydalanuvchi topilmadi" });

    const order = await ordersModel
      .findOne({ user: userId })
      .populate("products.product");

    if (!order) return res.status(404).send({ error: "Buyurtma topilmadi" });

    const item = order.products.find(
      (p) => p.product && p.product._id.toString() === productId
    );
    if (!item)
      return res.status(404).send({ error: "Buyurtmada bunday mahsulot yo'q" });

    await product.findByIdAndUpdate(productId, {
      $inc: { quantity: item.quantity },
    });

    order.products = order.products.filter(
      (p) => p.product._id.toString() !== productId
    );

    if (order.products.length === 0) order.status = "passive";

    await order.save();

    res.status(200).send({
      message: "Buyurtmadan mahsulot olib tashlandi",
      order,
    });
  } catch (err) {
    next(err);
  }
}
