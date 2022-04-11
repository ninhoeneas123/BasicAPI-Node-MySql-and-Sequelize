import { Request, Response } from "express";
import { CategoryModel } from "./models/categoryModel";

class CategoriesController {
  public async findCategory(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.query;
    const category = await CategoryModel.findOne({
      where: {
        id: categoryId,
      },
    });
    return category ? res.status(200).json(category) : res.status(400);
  }

  public async findAllCategory(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.query;
    const category = await CategoryModel.findAll();
    return category.length > 0
      ? res.status(200).json(category)
      : res.status(400);
  }

  public async registerCategory(req: Request, res: Response): Promise<any> {
    const { name, description } = req.body;
    const category = await CategoryModel.create({
      name,
      description,
    });
    return res.status(200).json(category);
  }
  public async updateCategory(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;
    await CategoryModel.update(req.body, { where: { id: categoryId } });
    return res.status(204).send();
  }
  public async deleteCategory(req: Request, res: Response) {
    const { categoryId } = req.params;
    await CategoryModel.destroy({ where: { id: categoryId } });
    return res.status(204).send();
  }
}

export default new CategoriesController();
