import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { UserModule } from '../users/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './jwt.strategy'

@Module({
    imports: [
        UserModule,
        JwtModule.register({ secret: process.env.SECRET_JWT }),
    ],
    controllers: [ AuthController ],
    providers: [ JwtStrategy, AuthService ],
})
export class AuthModule {}