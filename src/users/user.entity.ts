import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class User {

    @ApiProperty()
    id?: string

    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    password?: string

}

export class Login {

    @ApiProperty()
    @IsNotEmpty()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    password?: string

}