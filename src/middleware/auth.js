const jwt = require('jsonwebtoken');
const { JWT_SECRUIT } = require('../config/index');
const { tokenError, tokenExpireError, adminPermissonError } = require('../constant/index');

const auth = async(ctx, next) => {
    /*authorization: 必须对应请求头中字段的命名 */
    const {authorization} = ctx.request.header ?? '';
    const token = authorization.replace('Bearer ', '');

    try {
        const res = jwt.verify(token, JWT_SECRUIT);
        ctx.state.user = res;
    } catch (error) {
        console.log('test--用户认证错误', error);
        switch(error.name) {
            case 'JsonWebTokenError': 
                return ctx.app.emit('error', tokenError, ctx);
            case 'TokenExpiredError':
                return ctx.app.emit('error', tokenExpireError, ctx);
            default:
                break;
        }
    }
    await next();
}

const adminPermisson = async(ctx, next) => {
    const { is_admin } = ctx.state.user;
    console.loh('test--鉴权', is_admin);
    if(!is_admin) {
        ctx.app.emit('error', adminPermissonError, ctx);
    } 
    await next();
}
module.exports = {
    auth,
    adminPermisson
}