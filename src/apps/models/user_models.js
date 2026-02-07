import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  manzil: { type: String, required: true },
  found: { type: Number, default: 0 },
  bascet: { type: Array },
  role: { type: String, default: "user" },
});

const users = mongoose.model("users", usersSchema);

export default users;
