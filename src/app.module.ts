import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'

import { PostModule } from './posts/post.module'
import { RepositoryModule } from './repository/repository.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RepositoryModule, PostModule, AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}