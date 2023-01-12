import mongoose from "mongoose";

export interface IProductRequest {
  _id?: string;
  productName: string;
  productDes: string;
  favorite: boolean;
}

export interface IProduct extends mongoose.Document {
  productName: string;
  productDes: string;
  favorite: boolean;
}

const productSchema = new mongoose.Schema<IProduct>({
  productName: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 12,
  },
  productDes: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 12,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
