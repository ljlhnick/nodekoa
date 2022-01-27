const app = require('./app');
const { APP_PORT } = require('./config/index');
// const koa = require('koa');
// const app = new koa();

// const Router = require('koa-router');
// let router = new Router();
// router.get('/api/getName', async(ctx, next) => {
//     // CROS解决跨域
//     ctx.set("Access-Control-Allow-Origin", "*");
//     ctx.body = {
//         name: 'ljlhnick111',
//         password: '123456'
//     }
//     next();
// });
// router.post('/api/login', async(ctx, next) => {
//     // CROS解决跨域
//     ctx.set('Access-Control-Allow-Origin', '*');
//     ctx.body = {
//         code: 0,
//         message: 'success'
//     };
//     next();
// });
// router.get('/api/jsonp', async (ctx, next) => {
//     let callbackName = ctx.query.callback || 'callback'
//     let data = {
//         success: true,
//         name:'jonsp',
//         security: true
//     };
//     let jsonpStr = `${callbackName}(${JSON.stringify(data)})`;
//     ctx.type='text/javascript';
//     ctx.body = jsonpStr;
//     next();
// });
// app.use(router.routes());
app.listen(APP_PORT, () => {
    console.log(`serve starting on ${APP_PORT}`);
});