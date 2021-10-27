'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('posts', {
            id: {
                autoIncrement: true, primaryKey: true,
                type: Sequelize.BIGINT, allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE, allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                defaultGenerated: true
            },
            updatedAt: {
                type: Sequelize.DATE, allowNull: true,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                defaultGenerated: true
            },

            url_image: {
                type: Sequelize.STRING(700), allowNull: true
            },
            description: {
                type: Sequelize.STRING, allowNull: true
            },
            location: {
                type: Sequelize.STRING, allowNull: true
            },

            owner_id: {
                type: Sequelize.BIGINT, allowNull: false,
                references: { model: 'users', key: 'id' },
                onUpdate: 'CASCADE', onDelete: 'CASCADE',
            },
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('posts')
    }
}
