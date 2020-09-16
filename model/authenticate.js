const Sequelize = require('sequelize')
const dbConfig = require('../config/config')

var authenticate = dbConfig.define('authenticate', {
    username:{
        type: Sequelize.STRING
    },
    password:
    {
        type: Sequelize.STRING
    }
},
{
    tableName: 'authenticate',
    timestamps: false
})
authenticate.removeAttribute('id')
// authenticate.removeAttribute('updatedAt')
// authenticate.removeAttribute('createdAt')

module.exports = authenticate