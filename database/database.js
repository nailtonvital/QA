const Squelize = require('sequelize')

const connection = new Squelize(
    'qa',
    'root',
    'nailton123',{
        host: 'localhost',
        dialect: 'mysql'
    })

module.exports = connection