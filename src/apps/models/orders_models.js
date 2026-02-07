import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId },
  category: String,
  name: String,
  price: Number,
  quantity: Number,
  status: { type: String, default: "tayyorlanmoqda" },
});

const ordersModel = mongoose.model("orders", orderSchema);
export default ordersModel;
