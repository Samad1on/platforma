import users from "../models/user_models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function sighUpUser(req, res) {
  try {
    const { username, email, password, found, manzil, role } = req.body;
    const inspect_email = await users.findOne({ email });
    if (inspect_email) {
      return res.send("bu emaildan royhatdan utilgan");
    }
    const inspect_username = await users.findOne({ email });
    if (inspect_username) {
      return res.send("bu usernamedan royhatdan utilgan");
    }

    const newUser = new users({
      username,
      email,
      password,
      found,
      manzil,
      role,
    });

    const new_users = await newUser.save();
    res.send(new_users);
  } catch (error) {
    console.log("creat userda hatolik ", error);
    res.send("creat userda hatolik ");
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });

    if (!user) {
      console.log("loginda hatolik userni emailni topa olmadi");
      return res.send("userni  topib bolmadi emailni tekshrib koring");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) return res.send("Parol notogri ");

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
      },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "7d" }
    );

    res.send({
      message: "Login muvaffaqiyatli ",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        found: user.found,
        manzil: user.manzil,
        role: user.role,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.log("auth/loginda hatolik ", error);
    res.send("loginda hatolik ");
  }
}

export async function me(req, res) {
  try {
    const user = await users.findById(req.user.id);
    if (!user) return res.status(404).send("User topilmadi");

    res.send({
      message: "Profil ma'lumotlaringiz",
      user,
    });
  } catch (error) {
    console.log("me da xatolik:", error);
    res.status(500).send("Serverda xatolik");
  }
}

export async function updateUserById(req, res) {
  try {
    const id = req.user.id;
    const { username, email, password, found, manzil, role } = req.body;
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.send("Body bo'sh yoki undefined");
    }
    const user = await users.findById(id);
    if (!user) {
      console.log("hatolik userni topib bolmadi");
      res.send("hatolik : hatolik user update da");
    } else {
      const users_new = await users.findOneAndUpdate(
        { _id: id },
        { username, email, password, found, manzil, role },
        { new: true, runValidator: true }
      );
      res.send({
        message: "user muvofaqayatli yangilandui",
        users_new,
      });
    }
  } catch (error) {
    console.log("hatolik : user updateda ", error);
    res.send("hatolik : user update da ");
  }
}
