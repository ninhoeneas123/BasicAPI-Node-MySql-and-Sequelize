import { IsNotEmpty, IsString } from 'class-validator';
import { PasswordIsValid } from 'src/utils /pipes/password-validation.validator';

export class UpdatePasswordDto {

    @IsString()
    @IsNotEmpty({message: 'O campo senha antiga precisa ser preenchido'})
    oldPassword: string;

    @PasswordIsValid({ message: "A nova senha deve conter no minimo 8 caracteres e pelo menos 1 letra maiúscula, 1 número, 1 caractere especial(@,#,$)" })
    @IsNotEmpty({message: 'O campo novo senha precisa ser preenchido'})
    newPassword: string;

} 
 