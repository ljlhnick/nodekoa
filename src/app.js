const path = require('path');

const Koa = require('koa')
const koaBody = require('koa-body');
const KoaStaic = require('koa-static');

const router = require('./router/index');

const app = new Koa();
/*static目录下的静态资源可以被前端访问 */
app.use(KoaStaic(path.join(__dirname, './static')));
/** 配置文件上传 */
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: path.join(__dirname, './static'),
        /*保留文件扩展名 */
        keepExtensions: true
    }
}));
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