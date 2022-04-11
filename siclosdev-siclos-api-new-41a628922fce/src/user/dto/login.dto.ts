import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';


export class LoginDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;


    @IsNotEmpty()
    @Expose()
    @IsString()
    senha: string;


}