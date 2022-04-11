import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateEmailUserDto } from './dto/update-email-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, UserDocument } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { SendCodeChangePasswordDto } from './dto/send-change-password.dto';
import { ChangePasswordDto } from './dto/validate-oob-code.dto';
import { HashPassword } from 'src/utils /hash-password';
import { ExceptionsConstants } from 'src/utils /constants';
let csvToJson = require('convert-csv-to-json');



@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private hashPassword: HashPassword
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    let user = createUserDto

    const userAuth = await this.authService.createUserAuth(user.email, user.senha)

    user.senha = await this.hashPassword.hashPassword(user.senha)
    user.localId = userAuth.localId

    await this.userModel.create(user)
    return userAuth;
  }

  async updateEmail(updateEmailUserDto: UpdateEmailUserDto, idToken: string) {

    const user = await this.userModel.findOne({ email: updateEmailUserDto.oldEmail });

    if (!user) {
      throw new BadRequestException(ExceptionsConstants.INVALID_OLD_EMAIL);
    }

    const localId = user.localId

    await this.authService.updateUserEmail(updateEmailUserDto.newEmail, idToken)
    await await this.userModel.updateOne({ localId }, { $set: { email: updateEmailUserDto.newEmail } })

    return { message: "Email atualizado com sucesso" }
  }

  async updatePassword(updatePassword: UpdatePasswordDto, idToken: string, email: string) {
    const user = await this.userModel.findOne({ email })
    const oldPassword = updatePassword.oldPassword
    const newPassword = updatePassword.newPassword
    const compareOldPasswprd = await bcrypt.compare(oldPassword, user.senha)

    if (compareOldPasswprd === false) {
      throw new BadRequestException(ExceptionsConstants.INVALID_PASSWORD)
    }
    const newPasswordHash = await this.hashPassword.hashPassword(newPassword)

    await this.userModel.updateOne({ email }, { $set: { senha: newPasswordHash } })

    const googleData = await this.authService.updatePassword(newPassword, idToken)
    return googleData
  }

  async sendEmailChangePassword(sendCodeChangePasswordDto: SendCodeChangePasswordDto) {

    await this.authService.sendCodeChangePassword(sendCodeChangePasswordDto.email)

    return { mesage: "Caso este e-mail estaja cadastrado no nosso sistema você receberá um código de verificação" }
  }

  async validateCodeChangePassword(changePasswordDto: ChangePasswordDto) {

    const validateOoBCode = await this.authService.validateCodechangePassword(changePasswordDto.oobCode)

    return validateOoBCode
  }

  async findUserByEmail(localId: string) {
    return await this.userModel.findOne({ localId })
  }

  async deleteUser(idToken: string, email: string) {

    await this.userModel.deleteOne({ email })
    await this.authService.deleteUser(idToken)

    return { message: "Usuário deletado com sucesso" }
  }

  async updateUserData(localId: string, updateUserDto: UpdateUserDto) {
    let post = await this.userModel.findOneAndUpdate({ localId }, { $set: updateUserDto })
    if (!post) throw new NotFoundException();
    return post
  }

  async convertUpload(file: any) {
    let users = []

    for (let i in file.file_url) {
      const fileJson = csvToJson.fieldDelimiter(',').getJsonFromCsv(file.file_url[i].file_url);
      const user = fileJson[0]
      const userDataDb = await this.userModel.create(user)
      const userAuthGoogle = await this.authService.createUserAuth(user.email, user.senha)

      let userJson = {
        email: userAuthGoogle.email,
        identityId: userAuthGoogle.localId,
        IdLocal: userDataDb._id
      }
      users.push(userJson)
    }
    return users
  }
  async getAllUsers() {
    const users = await this.userModel.find()
    const usersNumber = users.length

    return { usersNumber, users }
  }

}
