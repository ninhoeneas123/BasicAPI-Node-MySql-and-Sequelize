import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "./models/usersModel";

class userController {
  public async findUser(req: Request, res: Response): Promise<Response> {
    const { UserId } = req.query;
    const category = await UserModel.findOne({
      where: {
        id: UserId,
      },
    });
    return category ? res.status(200).json(category) : res.status(400);
  }
  public async findAllUSers(req: Request, res: Response): Promise<Response> {
    const user = await UserModel.findAll();
    return user.length > 0 ? res.status(200).json(user) : res.status(400);
  }
  private async validateUser(cpf: string) {
    const user = await UserModel.findOne({
      where: {
        cpf: cpf,
      },
    });
    return user;
  }

  private cryptPassword(password: string) {
    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }
  private async valityPassword(password: string) {
    const user = await UserModel.findOne({
      where: {
        password: password,
      },
    });
    const valityPassowrd = bcrypt.compare(password, user.password);
    return valityPassowrd;
  }
  public async registerUser(req: Request, res: Response): Promise<any> {
    const { name, cpf, email, password } = req.body;
    const hashPassword = this.cryptPassword(password);
    const userIsVality = this.validateUser(cpf);
    if (userIsVality) {
      return res
        .status(200)
        .send("Usuario ja cadastrado na nossa base de dados");
    }
    const user = await UserModel.create({
      name,
      cpf,
      email,
      hashPassword,
    });
    return res.status(200).json(user);
  }
  public async updateUser(req: Request, res: Response): Promise<Response> {
    const { UserId } = req.params;
    await UserModel.update(req.body, { where: { id: UserId } });
    return res.status(204).send();
  }
  public async deleteUser(req: Request, res: Response) {
    const { UserId } = req.params;
    await UserModel.destroy({ where: { id: UserId } });
    return res.status(204).send();
  }
  public async redefinePassword(
    req: Request,
    res: Response
  ): Promise<Response> {
    const { UserId } = req.params;
    const { oldPassword, newPassword } = req.params;
    const valityOldPassword = this.valityPassword(oldPassword);
    if (!valityOldPassword) {
      return res.status(400).send("senha atual invalida");
    }
    const cryptPassword = this.cryptPassword(newPassword);
    await UserModel.update(
      { newPassword: cryptPassword },
      { where: { id: UserId } }
    );
    return res.status(204).send();
  }
  public async recoverPassword(req: Request, res: Response): Promise<Response> {
    const { newPassword } = req.params;
    const cryptPassword = this.cryptPassword(newPassword);

    await UserModel.update(
      { newPassword: cryptPassword },
      { where: { password: newPassword } }
    );
    return res.status(204).send();
  }
}

export default new userController();
