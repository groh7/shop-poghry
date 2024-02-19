import mongoose from "mongoose";

export type SchemaType = {
  id: String;
  name: String;
  description: String;
  price: Number;
  photo: String;
  availability: Number;
};

export type ProductType = {
  id: String;
  name: String;
  description: String;
  price: Number;
  photo: String;
  availability: Number;
  quantity?: Number;
};


const productSchema = new mongoose.Schema<SchemaType>(
  {
    id: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    availability: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models?.products || mongoose.model("products", productSchema);
// const Product = mongoose.model("products",productSchema)

export default Product;
