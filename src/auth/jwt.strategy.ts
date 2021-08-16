import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { User } from 'src/users/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        console.log('Strategy:', process.env.SECRET_KEY)
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET_KEY,
        });
    }

    validate(payload: any) {
        return {
            id: payload.user_id,
            name: payload.name,
            email: payload.email
        } as User
    }
}