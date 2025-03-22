import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
        unique:true
    },
    name: {
        type: String,
        required: true
      },
      altNames: {
        type: [String],
        required: []
      },
      price:{
        type: Number,
        required: true
      },
      labeledPrice: {
        type: Number,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      images: {
        type: [String],
        required: true,
        default:["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdtOgASJdSWc1YAaucCExVYQWadhbWKybQUg&s"]
      },
      stock:{
        type: Number,
        required: true
      },
    })
    const Product = mongoose.model("product", productSchema)
    export default Product;