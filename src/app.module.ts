import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './api/auth/auth.module'

import { PostModule } from './posts/post.module'
import { UserModule } from './users/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PostModule, UserModule, AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}