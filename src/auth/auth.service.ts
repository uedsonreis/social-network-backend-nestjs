import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcryptjs from 'bcryptjs'

import { UserService } from '../users/user.service'
import User from '../users/user.entity'
import { Login } from './login'

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    public async signIn(login: Login): Promise<string | null> {
        const user = await this.userService.getByEmail(login.email)

        if (user && bcryptjs.compareSync(login.password, user.password)) {
            return this.jwtService.sign({
                id: user.id,
                name: user.name,
                email: user.email
            } as User)
        }

        throw new HttpException('Invalid login!', HttpStatus.UNAUTHORIZED)
    }

}