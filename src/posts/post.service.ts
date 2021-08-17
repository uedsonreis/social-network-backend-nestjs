import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction } from 'sequelize/types'

import { AbstractService } from '../api/abstract.service'
import Post from './post.entity'

@Injectable()
export class PostService extends AbstractService<Post> {

    constructor(@InjectModel(Post) repository: typeof Post) {
        super(repository)
    }

    public async update(id: number, record: Post, transaction?: Transaction) {
        const postDB = await super.getById(id, undefined)

        if (postDB && postDB.ownerId !== record.ownerId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
        return await super.update(id, record, transaction)
    }

}