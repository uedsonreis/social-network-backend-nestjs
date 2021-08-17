import { BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

import User from "../users/user.entity"

@Table({ modelName: 'posts' })
export default class Post extends Model<Post> {

    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number

    @ApiProperty()
    @Column
    @CreatedAt
    public createdAt!: Date

    @ApiProperty()
    @Column
    @UpdatedAt
    public updatedAt!: Date

    @ApiProperty()
    @IsNotEmpty()
    @Column({ field: 'url_image' })
    public image!: string

    @ApiProperty()
    @Column
    public description!: string

    @ApiProperty()
    @IsNotEmpty()
    @Column
    public location!: string

    @ForeignKey(() => User)
    @Column({ field: 'owner_id' })
    public ownerId!: number

    @ApiProperty()
    @BelongsTo(() => User, 'ownerId')
    public owner!: User

}