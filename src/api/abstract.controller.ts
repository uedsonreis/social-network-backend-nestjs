import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger'
import { Body, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Model } from 'sequelize-typescript'

import { AbstractService } from './abstract.service'

export abstract class AbstractController<T extends Model<T>> {

    constructor(protected readonly service: AbstractService<T>) {}

    @Get('count')
    @ApiQuery({
        name: '', required: false,
        example: "?name=John&age=38",
        description: "Filters to the request (same type of the record)."
    })
    @ApiOkResponse({
        type: Number,
        description: 'A count of the records.'
    })
    @UseGuards(AuthGuard('jwt'))
    public async count(@Query() query: any) {
        return await this.service.count(query)
    }

    @Delete(':id')
    @ApiOkResponse({
        type: Boolean,
        description: 'It tells whether the record has been deleted or not.'
    })
    @UseGuards(AuthGuard('jwt'))
    public async delete(@Param('id') id: number) {
        return await this.service.delete(id)
    }

}