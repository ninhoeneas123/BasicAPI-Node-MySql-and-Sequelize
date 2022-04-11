import { IsNotEmpty, IsString } from 'class-validator';
import { EmailIsUnique } from 'src/utils /pipes/email-unique.validator';

export class UpdateEmailUserDto {

    @IsString()
    @IsNotEmpty({message: 'O campo email antigo precisa ser preenchido'})
    oldEmail: string;

    @EmailIsUnique({message:'O novo email não está disponivel'})
    @IsNotEmpty({message: 'O campo novo email precisa ser preenchido'})
    newEmail: string;

} 
 