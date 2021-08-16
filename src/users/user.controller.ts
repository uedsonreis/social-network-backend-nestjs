
import { Post as PostMethod, Body, Controller, Put, Param, Get, Query, Post, UseGuards, Request, UsePipes, ValidationPipe } from "@nestjs/common"
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger"

import { UserService } from "./user.service"
import { User } from "./user.entity"
import { AuthGuard } from "@nestjs/passport"

@ApiTags('User')
@Controller('/users')
export class UserController {

    constructor(private readonly service: UserService) {}

    @Get()
    @UseGuards(AuthGuard('firebase'))
    @ApiOkResponse({ type: User, description: 'Logged user' })
    public async index(@Request() request: any) {
        return await this.service.getByEmail(request.user.email)
    }

    @PostMethod()
    @UsePipes(new ValidationPipe({ transform: false }))
    @ApiBody({
        type: User,
        description: "The user data to be created."
    })
    @ApiCreatedResponse({
        type: User,
        description: 'The created user.'
    })
    public async store(@Body() record: User) {
        return await this.service.create(record)
    }

}