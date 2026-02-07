import product from "../models/product_models.js";
import users from "../models/user_models.js";

export async function createProduct(req, res) {
  try {
    const { catgory, name, price, quantity } = req.body;
    const inspect_product = await product.findOne({ name });
    if (inspect_product) {
      console.log("bunday product allaqachon mavjud ", inspect_product);
      return res.send("bunday product allaqachon mavjud ");
    }
    const new_product = new product({
      catgory,
      name,
      price,
      quantity,
    });
    await new_product.save();
    res.send({
      message: "product create",
      new_product,
    });
  } catch (error) {
    console.log("hatolik creat productda");
    res.send("hatolik productni qoshib bolmadi");
  }
}

export async function getProductTypes(req, res) {
  try {
    const user_inspect = await users.findById(req.user.id);
    if (!user_inspect) {
      console.log("bunday userni topib bolmadi", user_inspect);
      res.send("bunday user mavjud emas ");
    }
    const { types } = req.params;
    const inspect_product = await product.find({ catgory: types });
    if (!inspect_product) {
      console.log("hatolik catgoriyni topa oilmadi ", inspect_product);
      return res.send("hatolik bunday catgoriyni topilmadi");
    }
    res.send({
      message: {
        inspect_product,
      },
    });
  } catch (error) {
    console.log("hatolik getproductda ", error);
    res.send("product search error");
  }
}

export async function getProduct(req, res) {
  try {
    const id = req.user.id;
    const user_inspect = await users.findById(id);
    if (!user_inspect) {
      console.log("bunday userni topib bolmadi", user_inspect);
      res.send("bunday user mavjud emas ");
    }

    const inspect_product = await product.find();
    if (!inspect_product) {
      console.log("hatolik productlarni topilmadi ", inspect_product);
      return res.send("hatolik productlarni topilmadi ");
    }
    res.send({
      message: {
        inspect_product,
      },
    });
    res.send();
  } catch (error) {
    console.log("hatolik get productda ", error);
    res.send("product search error");
  }
}

export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { catgory, name, quantity, price } = req.body;
    const inspect_product = await product.findById(id);
    if (!inspect_product) {
      console.log("bunday productni topib bolmadi ", inspect_product);
      return res.send("productni topib bolmadi ");
    }
    const new_Schema = await product.findByIdAndUpdate(
      { _id: id },
      { catgory, name, price, quantity },
      { new: true, runValidator: true }
    );
    res.send({
      message: {
        new_Schema,
      },
    });
  } catch (error) {
    console.log("delete productda hatolik ", error);
    res.send("delete products error");
  }
}
