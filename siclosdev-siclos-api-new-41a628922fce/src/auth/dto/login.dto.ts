import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({
        type: String,
        example: 'Auth user',
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        type: String,
        example: 'Auth user',
    })
    @IsNotEmpty()
    @IsString()
    senha: string;

}