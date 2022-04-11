import bcrypt from "bcrypt";
import { Response, Request } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../users/models/usersModel";
class AuthController {
  SECRET: "1221321dsdskadasxcc";

  async authUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const userData = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (!userData) {
      return res.status(401).send({ message: "Usuário ou senha inválidos." });
    }
    const comparePasswords = bcrypt.compareSync(password, userData.password);
    if (comparePasswords === false) {
      return res.status(401).send({ message: "Usuário ou senha inválidos." });
    }

    const token = jwt.sign({ id: userData._id }, "1221321dsdskadasxcc", {
      expiresIn: 5000,
    });

    return res.json({
      id: userData._id,
      tokenauth: true,
      user: userData.name,
      token,
    });
  }
}
export default new AuthController();
