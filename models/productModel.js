import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    photo: {
      type: String,
      // require: true,
    },
    shipping: {
      type: Boolean,
    },
    SKU: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false, // Mark if this is a "best product"
    },
    priority: {
      type: Number,
      default: 0, // Higher numbers indicate higher priority
    },
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);

