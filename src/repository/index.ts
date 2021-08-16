import { SequelizeModuleOptions } from '@nestjs/sequelize'
import * as dotenv from 'dotenv'

import Post from '../repository/entities/post'

dotenv.config()

export const entities = [ Post ]

let host = process.env.HOST
let port = Number(process.env.DB_PORT)
let username = process.env.USERNAME
let password = process.env.PASSWORD
let database = process.env.DATABASE
let dialect: any = process.env.DIALECT

if (process.env.NODE_ENV === 'test') {
    host = process.env.HOST_TEST
    port = Number(process.env.DB_PORT_TEST)
    database = process.env.DATABASE_TEST
    username = process.env.USERNAME_TEST
    password = process.env.PASSWORD_TEST
    dialect = process.env.DIALECT_TEST
}

export const config: SequelizeModuleOptions = {
    host, port, dialect,
    username, password, database,
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