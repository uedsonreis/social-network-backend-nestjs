import { HttpException } from '@nestjs/common'
import { Test } from '@nestjs/testing'

import { AppModule } from '../app.module'
import { AuthController } from './auth.controller'
import { Login } from './login'

describe('AuthController', () => {

    let controller: AuthController

    beforeAll(async () => {
        const testModule = await Test.createTestingModule({
            imports: [ AppModule ]
        }).compile()

        controller = testModule.get<AuthController>(AuthController)
    })

    describe('LOGIN', () => {
        it('should sign in and return a token', async () => {
            
            const right: Login = { email: 'uedsonreis@gmail.com', password: '123456' }
            const wrong: Login = { email: 'uedsonreis@gmail.com', password: '987654' }

            const token = await controller.login(right)
            expect(token).toBeDefined()

            try {
                await controller.login(wrong)
            } catch (error) {
                expect(error).toBeInstanceOf(HttpException)
            }
        })
    })

})
