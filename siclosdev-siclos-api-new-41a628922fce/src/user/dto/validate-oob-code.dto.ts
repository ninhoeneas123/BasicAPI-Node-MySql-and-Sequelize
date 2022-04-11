import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    oobCode: string;
}