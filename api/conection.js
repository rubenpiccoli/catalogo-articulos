const Sequelize = require('sequelize');

//connect
const sequelize = new Sequelize('microservicios','root','123456789',{
    host:'localhost',
    dialect:'mysql',
    
})

module.exports = sequelize;