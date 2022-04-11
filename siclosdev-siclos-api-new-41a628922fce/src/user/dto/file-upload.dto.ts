import { ApiProperty } from "@nestjs/swagger";

// you can add validate using class-validator
export class FileUpload{
    @ApiProperty({type:"string",format:"binary"})
    file_url:string
}