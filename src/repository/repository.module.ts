import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize'
import { Module } from '@nestjs/common'
import * as dotenv from 'dotenv'

import Post from '../posts/post.entity'
import User from '../users/user.entity'

dotenv.config()

export const entities: any[] = [ Post, User ]

let host = process.env.HOST
let username = process.env.USERNAME
let password = process.env.PASSWORD
let database = process.env.DATABASE

if (process.env.NODE_ENV === 'test') {
    host = process.env.HOST_TEST
    database = process.env.DATABASE_TEST
    username = process.env.USERNAME_TEST
    password = process.env.PASSWORD_TEST
}

const config: SequelizeModuleOptions = {
    host, username, password, database,
    port: 5432, dialect: 'postgres',
    logging: console.log,
    models: [ ...entities ],
    pool: { max: 5, acquire: 300000 },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
}

@Module({
    imports: [
        SequelizeModule.forRoot(config)
    ]
})
export class RepositoryModule {}