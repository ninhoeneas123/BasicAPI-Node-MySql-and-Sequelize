import { BadRequestException, forwardRef, HttpException, HttpService, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { IRefreshToken } from './interfaces/login.interface';
import { IToken } from './interfaces/token.interface';
import { firstValueFrom } from 'rxjs';
import * as admin from 'firebase-admin'
import { ExceptionsConstants } from 'src/utils /constants';
import { SignInAuth } from './interfaces/sign-in.interface';
import { GetUserInterface } from './interfaces/get-user.interface';
import { UpdateFormatReturn } from './interfaces/update.interface';
import { CreateUserAuth } from './interfaces/create-user.interface';



@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private configService: ConfigService
  ) { }

  private async verifyUserAuth(email: string) {
    const authUser = await admin.auth().getUserByEmail(email)
    return authUser
  }

  async createUserAuth(email: string, senha: string): Promise<CreateUserAuth> {
    const url = process.env.GOOGLE_CREATE_USER_URL

    try {

      const parameters = { "email": email, "password": senha, "returnSecureToken": true }
      const data$ = this.httpService.post(url, parameters)

      const { data } = await firstValueFrom(data$);

      return data
    }
    catch {
      throw new BadRequestException(ExceptionsConstants.EMAIL_ALREADY_EXISTS)
    }
  }

  async signIn(loginDto: LoginDto): Promise<SignInAuth> {
    const url = process.env.GOOGLE_LOGIN_URL

    try {
      const parameters = { "email": loginDto.email, "password": loginDto.senha, "returnSecureToken": true }
      const data$ = this.httpService.post(url, parameters)

      const { data } = await firstValueFrom(data$);
      return data
    }
    catch {
      throw new BadRequestException(ExceptionsConstants.INVALID_CREDENTIALS);
    }
  }

  async getUser(id: string): Promise<GetUserInterface> {

    try {
      const url = process.env.GOOGLE_GET_USER_URL

      const idToken = id.split(' ');

      const parameters = { "idToken": idToken[1] }
      const data$ = this.httpService.post(url, parameters)

      const { data } = await firstValueFrom(data$);

      return data
    }
    catch {
      throw new BadRequestException(ExceptionsConstants.USER_NOT_FOUND)
    }

  }
  async updateUserEmail(email: string, id: string): Promise<UpdateFormatReturn> {

    const url = process.env.GOOGLE_UPDATE_USER_EMAIL_URL

    try {
      const idToken = id.split(' ');

      const parameters = { "idToken": idToken[1], "email": email, "returnSecureToken": true }
      const data$ = this.httpService.post(url, parameters)


      const { data } = await firstValueFrom(data$);
      return data
    }
    catch {
      throw new BadRequestException(ExceptionsConstants.FAILED_TO_UPDATE_PASSWORD)
    }
  }

  async updatePassword(password: string, id: string): Promise<UpdateFormatReturn> {

    const url = process.env.GOOGLE_SEND_OOBCODE_URL
    try {
      const parameters = { "idToken": id, "password": password, "returnSecureToken": false }
      const data$ = this.httpService.post(url, parameters)


      const { data } = await firstValueFrom(data$);
      return data
    }
    catch {
      throw new BadRequestException(ExceptionsConstants.BAD_REQUEST)
    }
  }
  async sendCodeChangePassword(email: string): Promise<any> {
    const url = process.env.GOOGLE_SEND_OOBCODE_URL
    try {
      const parameters = { "requestType": "PASSWORD_RESET", "email": email }
      const data$ = this.httpService.post(url, parameters)
      const { data } = await firstValueFrom(data$);
      return data

    }
    catch {
      throw new BadRequestException(ExceptionsConstants.BAD_REQUEST)
    }
  }
  async validateCodechangePassword(oobCode: string): Promise<any>  {
    const url = process.env.GOOGLE_RESET_USER_PASSWORD_URL
    try {
      const parameters = { "oobCode": oobCode }
      const data$ = this.httpService.post(url, parameters)
      const { data } = await firstValueFrom(data$);
      return data

    }
    catch {
      throw new BadRequestException(ExceptionsConstants.BAD_REQUEST)
    }
  }

  async deleteUser(id: string): Promise<any>  {
    const url = process.env.GOOGLE_DELETE_USER_URL
    try {
      const parameters = { "idToken": id }
      const data$ = this.httpService.post(url, parameters)
      const { data } = await firstValueFrom(data$);
      return data
    }
    catch {
      throw new BadRequestException(ExceptionsConstants.FAILED_TO_DELETE_USER)
    }
  }

  async checkUserAlreadyExist(
    email: string,
  ): Promise<admin.auth.UserRecord> {
    try {
      const userAlreadyExist = await this.verifyUserAuth(email)
      return userAlreadyExist;
    } catch {
      return null;
    }
  }

  async refreshToken(refreshTokenData: RefreshTokenDto): Promise<IToken> {
    const { refreshToken } = refreshTokenData;
    try {
      const tokernData = await this.refresh({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      });
      return tokernData;
    } catch {
      throw new UnauthorizedException(ExceptionsConstants.INVALID_CREDENTIALS);
    }
  }

  private async refresh(refreshData: IRefreshToken): Promise<IToken> {
    const url = process.env.GOOGLE_REFRESH_TOKEN_URL
    const data$ = this.httpService.post<{
      access_token: string;
      refresh_token: string;
    }>(url, `grant_type=refresh_token&refresh_token=${refreshData.refresh_token}`, {
      params: {
        key: this.configService.get<string>('GOOGLE_API_KEY'),
      },
    });

    const { data } = await firstValueFrom(data$);

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }
}