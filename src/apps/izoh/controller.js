import users from "../models/user_models.js";
import product from "../models/product_models.js";

export async function izohPost(req, res) {
  try {
    const { productId, izoh } = req.body;
    const { id } = req.user;
    const user_inspect = users.findById(id);
    if (!user_inspect) {
      console.log("izoh yozghan userni id si hato kirtilgan", user_inspect);
      return res.send("izoh yozghan userni id si hato kirtilgan");
    }
    const product_inspect = product.findById(productId);
    if (!product_inspect) {
      console.log(
        "izoh yozghan userni productid si hato kirtilgan",
        product_inspect
      );
      return res.send("izoh yozghan userni productid si hato kirtilgan");
    }
    console.log({
      user: {
        id: user_inspect.id,
        username: user_inspect.username,
        email: user_inspect.email,
      },
      "mahsulot ": {
        id: product_inspect.id,
        name: product_inspect.name,
      },
      izoh: izoh,
    });
    res.send({
      message: "izoh uchun rahmat",
    });
  } catch (error) {
    console.log("izoh hato", error);
    res.send("error izoh");
  }
}
