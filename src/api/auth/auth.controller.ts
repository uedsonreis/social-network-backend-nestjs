import { Body, Controller, Post } from "@nestjs/common"
import { ApiBody, ApiCreatedResponse, ApiTags } from "@nestjs/swagger"

import { Login } from "../../users/user.entity"
import { AuthService } from "./auth.service"

@ApiTags('Authorization')
@Controller('/auth')
export class AuthController {

    constructor(private readonly service: AuthService) {}

    @Post('login')
    @ApiBody({
        type: Login,
        description: "The user to sign in."
    })
    @ApiCreatedResponse({
        type: String,
        description: 'The user token.'
    })
    public async login(@Body() login: Login) {
        return await this.service.signIn(login)
    }

}