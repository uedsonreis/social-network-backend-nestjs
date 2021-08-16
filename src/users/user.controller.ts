
import { Post as PostMethod, Body, Controller, Put, Param, Get, Query, Post, UseGuards, Request } from "@nestjs/common"
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger"

import { UserService } from "./user.service"
import { User } from "./user.entity"
import { AuthGuard } from "@nestjs/passport"

@ApiTags('User')
@Controller('/users')
export class UserController {

    constructor(private readonly service: UserService) {}

    @Get()
    @ApiOkResponse({ type: User, description: 'User' })
    @UseGuards(AuthGuard('jwt'))
    public async index(@Request() request: any) {
        return await this.service.getByEmail(request.user.email)
    }

    @PostMethod('users')
    @ApiBody({
        type: User,
        description: "The record to be created."
    })
    @ApiCreatedResponse({
        type: User,
        description: 'The created record.'
    })
    @UseGuards(AuthGuard('jwt'))
    public async store(@Body() record: User) {
        return await this.service.create(record)
    }

}