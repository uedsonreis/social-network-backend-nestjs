'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('posts', {
            id: {
                autoIncrement: true, primaryKey: true,
                type: Sequelize.BIGINT, allowNull: false,
            },
            valid: {
                type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true
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
                type: Sequelize.STRING, allowNull: false
            },
            owner: {
                type: Sequelize.STRING, allowNull: false
            },
            description: {
                type: Sequelize.STRING, allowNull: true
            },
            location: {
                type: Sequelize.STRING, allowNull: true
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('posts')
    }
}
