import { Test } from '@nestjs/testing'

import { AppModule } from '../app.module'
import { UserController } from './user.controller'
import User from './user.entity'

describe('UserController', () => {

    let controller: UserController

    beforeAll(async () => {
        const testModule = await Test.createTestingModule({
            imports: [ AppModule ]
        }).compile()

        controller = testModule.get<UserController>(UserController)
    })

    describe('GET', () => {
        it('should return the logged user', async () => {
            const user = { id: 1, email: 'uedsonreis@gmail.com' } as User
            const logged = await controller.index({ user })
            expect(Number(logged.id)).toBe(user.id)
        })
    })

})
