import { ApiProperty } from "@nestjs/swagger";

// you can add validate using class-validator
export class FilesUpload{
    @ApiProperty({ type: Array, format: 'binary' })
    file_url:string
}