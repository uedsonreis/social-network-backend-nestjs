import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { RepositoryModule, entities } from '../repository/repository.module'

@Module({
    imports: [
        SequelizeModule.forFeature(entities),
    ],
    controllers: [ UserController ],
    providers: [ UserService ],
    exports: [ UserService ]
})
export class UserModule {}