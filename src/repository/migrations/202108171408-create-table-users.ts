'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('users', {
            id: {
                autoIncrement: true, primaryKey: true,
                type: Sequelize.BIGINT, allowNull: false,
            },

            email: {
                type: Sequelize.STRING, allowNull: false
            },
            name: {
                type: Sequelize.STRING, allowNull: false
            },
            password: {
                type: Sequelize.STRING, allowNull: true
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users')
    }
}
