import BaseService, { BaseProps } from "./base.service";

import { Filter } from "@mui/icons-material";
import { PagedResult } from "../models/PagedResult";
import { ProductModel } from "../models/ProductModel";
import { useEffect } from "react";

export function useProductService(bearerToken?: string) {
  let productService = new ProductServices({ bearerToken });
  useEffect(() => {
    productService = new ProductServices({ bearerToken });
  }, [bearerToken]);
  return productService;
}

export default class ProductServices extends BaseService {
  constructor(props: BaseProps) {
    super(props);
  }

  getList = async (page: number, filter?: { favorite: boolean }) =>
    await this.callApi<PagedResult<ProductModel[]>>(
      "GET",
      "/product",
      new URLSearchParams(
        filter?.favorite
          ? {
              page: page.toString(),
              favorite: "true",
            }
          : { page: page.toString() }
      )
    );

  upsertProduct = async (product: ProductModel) =>
    await this.callApi<ProductModel>("POST", `/product`, undefined, product);

  deleteProduct = async (id: string) =>
    await this.callApi("DELETE", `/product/${id}`);
}
