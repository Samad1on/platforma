import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  catgory: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});
const product = mongoose.model("product", productSchema);

export default product;
