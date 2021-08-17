import { Test } from '@nestjs/testing'

import { AppModule } from '../app.module'
import { PostController } from './post.controller'
import Post from './post.entity'

describe('PostController', () => {

    let controller: PostController

    const post = { image: 'teste1', location: 'Salvador, BA' } as Post

    beforeAll(async () => {
        const testModule = await Test.createTestingModule({
            imports: [ AppModule ]
        }).compile();

        controller = testModule.get<PostController>(PostController)
    })

    describe('POST', () => {
        it('should create and return the created post', async () => {
            
            const created = await controller.store({ user: { id: 1 } }, post)
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
