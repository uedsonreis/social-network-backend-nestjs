import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction } from 'sequelize/types'
import * as bcrypt from 'bcryptjs'

import User from './user.entity'

@Injectable()
export class UserService {

    constructor(@InjectModel(User) private readonly repository: typeof User) {}

    public async get(id: number) {
        const userDB = await this.repository.findByPk(id)
        if (!userDB) return null

        const { password, ...rest } = userDB.toJSON() as User
        return rest as User
    }

    public async getByEmail(email: string) {
        const userDB = await this.repository.findOne({ where: { email } })
        if (!userDB) return null

        return userDB.toJSON() as User
    }

    public async create(user: User, transaction?: Transaction) {
        const userDB = await this.getByEmail(user.email)
        if (userDB) {
            throw new HttpException('There is another user registered with this E-mail.', HttpStatus.BAD_REQUEST)
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(user.password, salt)

        let saved = await this.repository.create({ ...user, password: hash } as User, { transaction })
        saved = saved.toJSON() as User

        return {
            id: saved.id,
            name: saved.name,
            email: saved.email
        } as User
    }

}