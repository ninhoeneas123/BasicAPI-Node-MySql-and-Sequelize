import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendCodeChangePasswordDto {
    @IsEmail({message:"Por favor insira um e-mail válido"})
    email: string;
}