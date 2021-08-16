import { Column, CreatedAt, Model, Table, UpdatedAt } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

@Table({ modelName: 'posts' })
export default class Post extends Model<Post> {

    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number

    @ApiProperty()
    @Column
    public valid: boolean = true

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

    @ApiProperty()
    @Column
    public owner!: string

}