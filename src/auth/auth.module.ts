import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    controllers: [ AuthController ],
    providers: [ JwtStrategy, AuthService ],
})
export class AuthModule {}