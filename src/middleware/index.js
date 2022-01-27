const bcrypt = require('bcryptjs');

const { getUserInfo } = require("../service");
const { ExistedError, NotNullError, userNotExsite, passWordError} = require('../constant/index');

const paramsNotNull = async (ctx, next) => {
    const {user_name, password} = ctx.request.body;
    if(!user_name || !password) {
        ctx.app.emit('error', NotNullError, ctx);
        // ctx.body = {
        //     code: '10001',
        //     message: '用户名或者年龄为空',
        //     result: ''
        // }
        return ;
    }
    await next();
}

const validUser = async (ctx, next) => {
    const { user_name } = ctx.request.body;

    const res = await getUserInfo({user_name});
    if(res) {
        ctx.app.emit('error', ExistedError, ctx);
        // ctx.body = {
        //     code: '10002',
        //     message: `${user_name}用户名已经存在`,
        //     result: ''
        // }
        return ;
    }
    await next();
}

const createFail = async(ctx, next) => {
    ctx.body={
        code: '10003',
        message: '注册失败',
        result: ''
    }
    await next();
}

const bcryptPassword = async(ctx, next) => {
    const {password} = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    // 将明文加密保存的密文
    const hash = bcrypt.hashSync(password, salt);
    // 将密文挂在body上
    ctx.request.body.password = hash;
    await next();
}

const verifyLogin = async(ctx, next) => {
    const {user_name, password} = ctx.request.body;
    const res = await getUserInfo({user_name});
    if(!res) {
        ctx.app.emit('error', userNotExsite, ctx);
        return;
    } else {
        if(!bcrypt.compareSync(password, res.password)){
            ctx.app.emit('error', passWordError, ctx);
            return;
        }
    }
    await next();
}

module.exports = {
    paramsNotNull,
    validUser,
    createFail,
    bcryptPassword,
    verifyLogin
}