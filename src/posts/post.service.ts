import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { AbstractService } from '../api/abstract.service'
import Post from '../repository/entities/post'

@Injectable()
export class PostService extends AbstractService<Post> {

    constructor(@InjectModel(Post) repository: typeof Post) {
        super(repository)
    }

}