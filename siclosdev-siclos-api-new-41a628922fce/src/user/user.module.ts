import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';
import { CpfIsUniqueConstraint } from 'src/utils /pipes/cpf-unique.validator';
import { EmailIsUniqueConstraint } from 'src/utils /pipes/email-unique.validator';
import { PasswordIsValidConstraint } from 'src/utils /pipes/password-validation.validator';
import { HashPassword } from 'src/utils /hash-password';
import { InssIsUniqueConstraint } from 'src/utils /pipes/inss-unique.validator';
import { MatriculaUniqueConstraint } from 'src/utils /pipes/matricula-unique.validator';
import { RgIsUniqueConstraint } from 'src/utils /pipes/rg-unique.vallidator';
import { CpfIsValidConstraint } from 'src/utils /pipes/cpf-validation.validator';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService,
    CpfIsUniqueConstraint, 
    EmailIsUniqueConstraint, 
    PasswordIsValidConstraint, 
    CpfIsValidConstraint,
    RgIsUniqueConstraint, 
    MatriculaUniqueConstraint,
    InssIsUniqueConstraint,
    HashPassword],
    exports:[UserService]
})
export class UserModule {}
