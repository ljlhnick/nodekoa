const {Sequelize} = require('sequelize');
const {MYSQL_USER, MYSQL_PWD, MYSQL_DB, MYSQL_HOST} = require('../config/index.js');

const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
});

// sequelize.authenticate().then(() => {
//     console.log('sequelize---数据库连接成功');
// }).catch(() => {
//     console.log('sequelize---数据库连接不成功');
// })

module.exports = sequelize;