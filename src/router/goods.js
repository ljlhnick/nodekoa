const Router = require('koa-router');

const { auth, adminPermisson } = require('../middleware/auth');
const { upload } = require('../controller/good');

const router = new Router({
    prefix: '/good'
});

router.post('/upload', auth, adminPermisson, upload);
module.exports = router;