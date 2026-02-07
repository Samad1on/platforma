import mongoose from "mongoose";
const statsSchema = new mongoose.Schema({
  tuman: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  count: { type: Number, default: 0 },
});

const statsModel = mongoose.model("states", statsSchema);
export default statsModel;
