const { DataTypes } = require('sequelize');

// 导入连接数据库配置
const sequelize = require('../db/index');

// 创建模型(对应Users表名)
const User = sequelize.define('koa_user', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '唯一'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// 强制同步数据库(创建数据表)
User.sync({ force: true}).then(() => {
    console.log('test--建表成功');
}).catch((error) => {
    console.log('test--建表失败', error);
});


module.exports = User;