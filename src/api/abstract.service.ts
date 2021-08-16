import { Model, Repository } from 'sequelize-typescript'
import { Transaction, Op } from 'sequelize'

export abstract class AbstractService<T extends Model<T>> {

    constructor(protected readonly repository: Repository<T>) {}

    public async getById(id: number, options: any): Promise<T | null> {
        if (!options) options = {}
        const { include } = options
        return await this.repository.findByPk(id, {
            include: (include) ? JSON.parse(include) : undefined
        })
    }

    public async getList(filters: any): Promise<T[]> {
        if (!filters) filters = { valid: true }
        if (filters.valid === undefined) filters = { ...filters, valid: true }

        const { include, searchByOr, orderBy, groupBy, limitBy, ...rest } = filters
        const filterWithOr = this.getFilterWithOr(searchByOr)

        return await this.repository.findAll({
            where: { ...rest, ...filterWithOr},
            order: (orderBy) ? JSON.parse(orderBy) : undefined,
            limit: (limitBy) ? JSON.parse(limitBy) : undefined,
            group: (groupBy) ? JSON.parse(groupBy) : undefined,
            include: (include) ? JSON.parse(include) : undefined
        })
    }

    public async count(filters: any): Promise<number> {
        if (!filters) filters = { valid: true }
        if (filters.valid === undefined) filters = { ...filters, valid: true }

        const { searchByOr, ...rest } = filters
        const filterWithOr = this.getFilterWithOr(searchByOr)

        return await this.repository.count({ where: { ...rest, ...filterWithOr }})
    }

    public async sum(field: string, filters: any): Promise<number> {
        if (!filters) filters = { valid: true }
        if (filters.valid === undefined) filters = { ...filters, valid: true }

        const { searchByOr, ...rest } = filters
        const filterWithOr = this.getFilterWithOr(searchByOr)

        return await this.repository.sum(field as any, { where: { ...rest, ...filterWithOr }})
    }

    public async create(record: T, transaction?: Transaction): Promise<T> {
        const saved = await this.repository.create(record, { transaction })
        return saved.toJSON() as T
    }

    public async update(id: number, record: T, transaction?: Transaction): Promise<T | null> {
        if (id) {
            await this.repository.update(record, {
                transaction, where: { id }
            })
            return await this.repository.findByPk(id)            
        }
        return null
    }

    public async delete(id: number, transaction?: Transaction): Promise<Boolean> {
        if (id) {
            const record = await this.repository.findByPk(id, { transaction })
            if (record) {
                await record.destroy({ transaction })
                return true
            }
        }
        return false
    }

    private getFilterWithOr(searchByOr: any) {
        if (!searchByOr) return undefined

        const array: any[] = JSON.parse(searchByOr);
        const attributes = array.map(obj => (
            Object.getOwnPropertyNames(obj).map(attribute => ({
                [attribute]: { [Op.like]: `%${obj[attribute]}%` }
            }))
        ))
        return { [Op.or]: attributes }
    }

}