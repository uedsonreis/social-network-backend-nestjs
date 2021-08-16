import { FirebaseAuthStrategy, FirebaseUser } from '@tfarras/nestjs-firebase-auth'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ExtractJwt } from 'passport-jwt'

import { User } from 'src/users/user.entity'

@Injectable()
export class FirebaseStrategy extends PassportStrategy(FirebaseAuthStrategy, 'firebase') {

    constructor() {
        super({
            extractor: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    public async validate(payload: FirebaseUser) {
        return {
            id: payload.user_id,
            name: payload.name,
            email: payload.email
        } as User
    }

}