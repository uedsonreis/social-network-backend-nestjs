import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { IncludeOptions, Transaction } from 'sequelize/types'

import { AbstractService } from '../api/abstract.service'
import Post from './post.entity'

const include = JSON.stringify([{ association: "owner" }])

@Injectable()
export class PostService extends AbstractService<Post> {

    constructor(@InjectModel(Post) repository: typeof Post) {
        super(repository)
    }

    public async getById(id: number, options: any): Promise<Post | null> {
        const postDB = await super.getById(id, { ...options, include })
        return this.removeOwnerIdAndPassword(postDB)
    }

    public async getList(filters: any): Promise<Post[]> {
        const list = await super.getList({ ...filters, include })
        return list.map(this.removeOwnerIdAndPassword)
    }

    private removeOwnerIdAndPassword(post: Post) {
        const { ownerId, ...rest } = post.toJSON() as Post
        const { password, ...owner } = rest.owner
        return { ...rest, owner } as Post
    }

    public async update(id: number, record: Post, transaction?: Transaction) {
        const postDB = await super.getById(id, undefined)

        if (postDB && postDB.ownerId !== record.ownerId) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        }
        return await super.update(id, record, transaction)
    }

}