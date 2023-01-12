import { IProductRequest, Product } from "../models/product";

import { PagedResult } from "../models/pagedResult";
import mongoose from "mongoose";

export interface IProductService {
  upsertProduct: (productRequest: IProductRequest) => Promise<IProductRequest>;
  getProducts: (
    page: number,
    query: { favorite?: boolean }
  ) => Promise<PagedResult<IProductRequest[]>>;
  deleteProduct: (id: string) => Promise<any>;
}

export const getProductService = (): IProductService => {
  const getProducts = async (
    page: number,
    query: { favorite?: boolean }
  ): Promise<PagedResult<IProductRequest[]>> => {
    const items = await Product.find(query)
      .skip(10 * (page - 1))
      .limit(10)
      .lean();

    const count = await Product.find(query).countDocuments();

    return {
      count,
      items,
    };
  };

  const upsertProduct = async (productRequest: IProductRequest) =>
    await Product.findByIdAndUpdate(
      productRequest._id ? productRequest._id : new mongoose.Types.ObjectId(),
      {
        productName: productRequest.productName,
        productDes: productRequest.productDes,
        favorite: productRequest.favorite,
      },
      {
        upsert: true,
        new: true,
      }
    ).lean();

  const deleteProduct = async (id: string) =>
    await Product.findOneAndDelete({ _id: id });

  return {
    getProducts,
    upsertProduct,
    deleteProduct,
  };
};
