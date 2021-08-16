import { Test, TestingModule } from '@nestjs/testing'
import { Repository } from 'sequelize-typescript'
import { SequelizeModule } from '@nestjs/sequelize'

import { PostController } from './post.controller'
import { PostService } from './post.service'
import { config, entities } from '../repository'
import Post from '../repository/entities/post'

describe('PostController', () => {

    let controller: PostController

    const post = { image: 'teste1', location: 'Salvador, BA' } as Post

    beforeAll(async () => {
        const testModule = await Test.createTestingModule({
            imports: [
                SequelizeModule.forRoot(config),
                SequelizeModule.forFeature([...entities]),
            ],
            controllers: [ PostController ],
            providers: [ PostService ],
        }).compile();

        controller = testModule.get<PostController>(PostController)
    })

    describe('POST', () => {
        it('should create and return the created post', async () => {
            
            const created = await controller.store({ user: { email: 'uedsonreis@gmail.com' } }, post)
            expect(Number(created.id)).toBeGreaterThan(0)

            post.id = created.id
        })
    })
    
    describe('GET', () => {
        it('should return the post list', async () => {
            const list = await controller.index({ image: "teste1" })
            expect(list[0].image).toBe(post.image)
        })
    })

    describe('DELETE', () => {
        it('should delete the post', async () => {
            const removed = await controller.delete(Number(post.id))
            expect(removed).toBe(true)
        })
    })

})
