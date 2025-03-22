import mongoose from "mongoose";
const itemSchema = new mongoose.Schema({
  name: String,
  value: Number,
  description: String,
});

const Item = mongoose.model("item", itemSchema);
export default Item;