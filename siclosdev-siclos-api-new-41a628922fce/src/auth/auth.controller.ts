import { Controller, Post, Body, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LocationRateLimitInterceptor } from './inteceptors/rate-limit.inteceptor';
import { IToken } from './interfaces';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @UseInterceptors(new LocationRateLimitInterceptor())
    @Post('/login')
    create(@Body() loginDto: LoginDto) {
        return this.authService.signIn(loginDto)
    }


    @UseGuards(AuthGuard('firebase-auth'))
    @Post('get-user')
    async getUser(@Request() req: any) {
        const id = await req.headers.authorization
        return this.authService.getUser(id)
    }

    @Post('refresh-token')
    refreshToken(@Body() refreshTokenData: RefreshTokenDto): Promise<IToken> {
      return this.authService.refreshToken(refreshTokenData);
    }

}
