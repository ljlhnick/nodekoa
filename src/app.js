const Koa = require('koa')
const koaBody = require('koa-body');

const router = require('./router/index');

const app = new Koa();
app.use(koaBody());
app.use(router.routes());

// 全局错误处理
app.on('error', (error, ctx) => {
    let status;
    switch(error.code) {
        case '10001':
            status = 401
            break
        case '10002':
            status = 403
            break
        default:
            status = 500
            break
    };
    ctx.status = status;
    ctx.body = error;
});

module.exports = app;