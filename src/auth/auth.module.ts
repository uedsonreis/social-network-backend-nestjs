import { Module } from '@nestjs/common'

import { FirebaseStrategy } from './firebase.strategy'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    controllers: [ AuthController ],
    providers: [ FirebaseStrategy, AuthService ],
})
export class AuthModule {}