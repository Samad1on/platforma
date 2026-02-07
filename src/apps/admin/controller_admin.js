import users from "../models/user_models.js";
// import admin from "../models/admin_models.js";

export async function get_users_inspect(req, res) {
  try {
    const admin_inspect = await users.findById(req.user.id);
    const users_inspect = await users.find();
    if (!admin_inspect) {
      console.log(
        "hatolik : adminni emaili yoki paswordi hato tecshrib qatadan urinib koring",
        admin_inspect
      );
      res.send(
        "hatolik : adminni emaili yoki paswordi hato tecshrib qatadan urinib koring"
      );
    } else {
      res.send({
        message: "users",
        users_inspect,
      });
    }
  } catch (error) {
    console.log("hatolik :get userda ", error);
    res.send("hatolik :get userda ");
  }
}

export async function get_user_inspect(req, res) {
  try {
    const id_user = req.params.id;
    const admin_inspect = await users.findById(req.user.id);
    if (!admin_inspect) {
      console.log(
        "hatolik : adminni emaili yoki paswordi hato tecshrib qatadan urinib koring",
        admin_inspect
      );
      res.send(
        "hatolik : adminni emaili yoki paswordi hato tecshrib qatadan urinib koring"
      );
    }
    const users_inspect = await users.findById(id_user);
    if (!users_inspect) {
      console.log("hatolik : userni id si hato", users_inspect);
      res.send("hatolik : userni id si hato");
    } else {
      res.send({
        message: "user",
        users_inspect,
      });
    }
  } catch (error) {
    // return next(error)
    console.log("hatolik  get admin  inspectda", error);
    res.send("hatolik  get admin  inspectda");
  }
}

export async function delete_userById(req, res) {
  try {
    const id_user = req.params.id;
    const users_inspect = await users.findById(id_user);
    const admin_inspect = await users.findById(req.user.id);
    if (!admin_inspect) {
      console.log(
        "hatolik : adminni emaili yoki paswordi hato tecshrib qatadan urinib koring",
        admin_inspect
      );
      res.send(
        "hatolik : adminni emaili yoki paswordi hato tecshrib qatadan urinib koring"
      );
    }
    if (!users_inspect) {
      console.log("hatolik : user id ni topa olmadi ", users_inspect);
      res.send("hatolik : user id ni topa olmadi ");
    } else {
      await users.findByIdAndDelete(id_user);
      res.send({
        message: "user delete",
      });
    }
  } catch (error) {
    console.log("hatolik : admin delete user da", error);
    res.send("hatolik : admin delete user da");
  }
}

export async function update_userById(req, res) {
  try {
    const id = req.params.id;
    const { username, email, password, role } = req.body;
    const users_inspect = await users.findById(id);
    const admin_inspect = await users.findById(req.user.id);
    if (!admin_inspect) {
      console.log(
        "hatolik : adminni emaili yoki paswordi hato tecshrib qatadan urinib koring",
        admin_inspect
      );
      return res.send(
        "hatolik : adminni emaili yoki paswordi hato tecshrib qatadan urinib koring"
      );
    }
    if (!users_inspect) {
      console.log("hatolik : user id ni topa olmadi ", users_inspect);
      return res.send("hatolik : user id ni topa olmadi ");
    }
    const updateData = {
      username: username || users_inspect.username,
      email: email || users_inspect.email,
      password: password || users_inspect.password,
      role: role || users_inspect.role,
      found: users_inspect.found,
      bascet: users_inspect.bascet,
      orders: users_inspect.orders,
    };

    const updatedUser = await users.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    res.send({
      message: "user update",
      updatedUser,
    });
  } catch (error) {
    console.log("hatolik update userda ", error);
    res.send("hatolik update userda ");
  }
}
