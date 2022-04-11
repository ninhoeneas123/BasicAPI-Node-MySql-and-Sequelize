import { Request, Response } from "express";
import { ProductModel } from "./models/productModel";

require("dotenv/config");

class ProductsController {
  public async findOneProduct(req: Request, res: Response): Promise<Response> {
    const { productId } = req.query;
    const category = await ProductModel.findOne({
      where: {
        id: productId,
      },
    });
    return category ? res.status(200).json(category) : res.status(400);
  }

  public async findAllProduct(req: Request, res: Response): Promise<Response> {
    const category = await ProductModel.findAll();
    return category.length > 0
      ? res.status(200).json(category)
      : res.status(400);
  }

  public async registerProduct(req: Request, res: Response): Promise<any> {
    const { name, description } = req.body;
    const category = await ProductModel.create({
      name,
      description,
    });
    return res.status(200).json(category);
  }
  public async updateProduct(req: Request, res: Response): Promise<Response> {
    const { productId } = req.params;
    await ProductModel.update(req.body, { where: { id: productId } });
    return res.status(204).send();
  }
  public async deleteProduct(req: Request, res: Response) {
    const { productId } = req.params;
    await ProductModel.destroy({ where: { id: productId } });
    return res.status(204).send();
  }
}
export default new ProductsController();
