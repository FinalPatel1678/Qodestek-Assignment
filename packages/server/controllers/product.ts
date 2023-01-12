import { IProductService, getProductService } from "../services/productService";
import { Request, Response } from "express";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const productService: IProductService = getProductService();

    const page: number = (req.query?.page as unknown as number) ?? 1;
    const query =
      req.query?.favorite && typeof req.query?.favorite === "string"
        ? { favorite: Boolean(req.query.favorite) }
        : {};

    const result = await productService.getProducts(page, query);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send("Error while getting list of products");
  }
};

export const upsertProduct = async (req: Request, res: Response) => {
  try {
    const productService: IProductService = getProductService();

    const result = await productService.upsertProduct(req.body);

    return res.status(200).send(result);
  } catch (err: any) {
    console.log(err);
    return res.status(500).send("Error while upsert product");
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const productService: IProductService = getProductService();

    await productService.deleteProduct(id);

    return res.status(204).send({ success: true });
  } catch (err: any) {
    return res.status(500).send("Error while deleting product");
  }
};
