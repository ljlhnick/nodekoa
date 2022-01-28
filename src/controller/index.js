const jwt = require('jsonwebtoken');
const { createUser, getUserInfo } = require('../service/index');
const {JWT_SECRUIT} = require('../config/index.js');

class IndexController {
    async getName(ctx, next) {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.body = {
            name: 'ljlhnicknodemon',
            password: '123456'
        }
        next();
    }

    async register(ctx, next) {
        ctx.set('Access-Control-Allow-Origin', '*');
        // 接收传参
        const {user_name, password, is_admin = false} = ctx.request.body; 
        try {
             // 操作数据库
            await createUser(user_name, password, is_admin);
            // 返回数据
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    user_name,
                    password
                }
            };
        } catch (error) {
            // 注册失败
            ctx.app.emit('error', RegisterError, ctx);
        }
       
        await next();
    }

    async login(ctx, next) {
        const {user_name} = ctx.request.body;
        // 获取用户信息 在token的payload中获取id user_name 
        try {
            const res = await getUserInfo({user_name});
            const {password, ...restRecord} = res;
            ctx.body = {
                code: 0,
                message: '用户登陆成功',
                result: {
                    /*颁发token */
                    token: jwt.sign(restRecord, JWT_SECRUIT, {expiresIn: '1d'})
                }
            }
            // console.log('test--token', restRecord, JWT_SECRUIT);
            await next();
        } catch (error) {
            console.log('test--登录失败', error);
        }
        
    }
}

module.exports = new IndexController();