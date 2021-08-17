import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { PostService } from './post.service'
import { PostController } from './post.controller'
import { entities } from '../repository/repository.module'

@Module({
    imports: [
        SequelizeModule.forFeature(entities)
    ],
    controllers: [ PostController ],
    providers: [ PostService ],
})
export class PostModule {}