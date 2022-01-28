const User = require('../model/index');

class IndexService{
    async createUser(user_name, password, is_admin) {
        // 向数据库表中插入一条数据
        try {
            const res = await User.create({user_name, password, is_admin});
            return res.dataValues;
        } catch (error) {
            console.log('tesd---插入数据失败');
            return null;
        }
    }

    async getUserInfo({ id, user_name, password }) {
        const whereOpt = {};
        id && Object.assign(whereOpt, {id});
        user_name && Object.assign(whereOpt, {user_name});
        password && Object.assign(whereOpt, {password});
        const res = await User.findOne({ 
            attributes: ['id', 'user_name', 'is_admin', 'password'],
            where: whereOpt 
        });
        return res ? res.dataValues : null;
    }
}
module.exports = new IndexService();