import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { PostService } from './post.service'
import { PostController } from './post.controller'
import { config, entities } from '../repository'

@Module({
    imports: [
        SequelizeModule.forRoot(config),
        SequelizeModule.forFeature([...entities]),
    ],
    controllers: [ PostController ],
    providers: [ PostService ],
})
export class PostModule {}