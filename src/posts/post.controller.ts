
import { Post as PostMethod, Body, Controller, Put, Param, Get, Query, Post, UseGuards, Request, UsePipes, ValidationPipe } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger"

import { AbstractController } from "../api/abstract.controller"
import PostEntity from "../repository/entities/post"
import { PostService } from "./post.service"

@ApiTags('Post')
@Controller('/posts')
export class PostController extends AbstractController<PostEntity> {

    constructor(service: PostService) {
        super(service)
    }

    @Get(':id')
    @ApiQuery({
        name: '', required: false,
        example: "?name=John&include=[{\"association\":\"products\"}]}",
        description: "Filters to the request (same type of the record). It can be add a 'include' field to load any association."
    })
    @ApiOkResponse({
        type: PostEntity,
        description: 'The record.'
    })
    @UseGuards(AuthGuard('jwt'))
    public async get(@Param('id') id: number, @Query() query: any) {
        return await this.service.getById(id, query)
    }

    @Get()
    @ApiQuery({
        name: '', required: false,
        example: "?name=John&include=[{\"association\":\"products\"}]}",
        description: "Filters to the request (same type of the record). It can be add a 'include' field to load any association."
    })
    @ApiOkResponse({
        type: [PostEntity],
        description: 'A record list.'
    })
    @UseGuards(AuthGuard('jwt'))
    public async index(@Query() query: any) {
        return await this.service.getList(query)
    }

    @PostMethod()
    @UsePipes(new ValidationPipe({ transform: false }))
    @ApiBody({
        type: PostEntity,
        description: "The record to be created."
    })
    @ApiCreatedResponse({
        type: PostEntity,
        description: 'The created record.'
    })
    @UseGuards(AuthGuard('jwt'))
    public async store(@Request() request: any, @Body() record: PostEntity) {
        record.owner = request.user.email
        return await this.service.create(record)
    }

    @Put(':id')
    @ApiBody({
        type: PostEntity,
        description: "The record to be updated."
    })
    @ApiOkResponse({
        type: PostEntity,
        description: 'The updated record.'
    })
    @UseGuards(AuthGuard('jwt'))
    public async update(@Request() request: any, @Param('id') id: number, @Body() record: PostEntity) {
        record.owner = request.user.email
        return await this.service.update(id, record)
    }

}