const Router = require('koa-router');
const { paramsNotNull, validUser, bcryptPassword, verifyLogin } = require('../middleware/index');
const { getName, register, login } = require('../controller/index');

const router = new Router();

router.get('/api/getName', getName);

router.post('/api/register', paramsNotNull, validUser, bcryptPassword, register);

router.post('/api/login', paramsNotNull, verifyLogin, login);

router.get('/api/jsonp', async (ctx, next) => {
    let callbackName = ctx.query.callback || 'callback'
    let data = {
        success: true,
        name:'jonsp',
        security: true
    };
    let jsonpStr = `${callbackName}(${JSON.stringify(data)})`;
    ctx.type='text/javascript';
    ctx.body = jsonpStr;
    next();
});

module.exports = router;