import { forwardRef, Module,HttpModule } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthStrategy } from './strategies/firebase-auth.strategy';

@Module({
  imports: [
    forwardRef(() => UserModule),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService,FirebaseAuthStrategy],
  exports: [AuthService, FirebaseAuthStrategy]
})
export class AuthModule { }
