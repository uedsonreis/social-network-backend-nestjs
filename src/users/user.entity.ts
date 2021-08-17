import { Column, Model, Table } from "sequelize-typescript"
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

@Table({ modelName: 'users', timestamps: false })
export default class User extends Model<User> {

    @ApiProperty()
    @Column({ primaryKey: true, autoIncrement: true })
    public id!: number

    @ApiProperty()
    @IsNotEmpty()
    @Column
    public name!: string

    @ApiProperty()
    @IsNotEmpty()
    @Column
    public email!: string

    @ApiProperty()
    @IsNotEmpty()
    @Column
    public password?: string

}