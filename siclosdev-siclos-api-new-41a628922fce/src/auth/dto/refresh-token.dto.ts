import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    example: 'Firebase refresh token',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
