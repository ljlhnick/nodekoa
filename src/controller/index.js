const { createUser } = require('../service/index');

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
        const {user_name, password} = ctx.request.body; 
        try {
             // 操作数据库
            await createUser(user_name, password);
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
        console.log('test--登录', user_name);
        ctx.body = `${user_name},登录成功`;
        await next();
    }
}

module.exports = new IndexController();