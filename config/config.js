const sequelize = require('sequelize')

module.exports = new sequelize('corporate', 'root', '14022619',{
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})