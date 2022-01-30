const path = require('path');
const { fileTypeError } = require('../constant/index');
class GoodUploadController {
    async upload(ctx, next){
        /*文件从请求头files拿 */
        const { file } = ctx.request.files;
        const fileTypes = ['image/jpeg', 'image/png'];
        if(!fileTypes.includes(file.type)) {
            return ctx.app.emit('error', fileTypeError, ctx);
        }
        ctx.body = {
            code: 0,
            message: '图片上传成功',
            result: {
                /*获取文件名 不保留前面的路径 */
                path: path.basename(file.path)
            }
        };
        await next();
    }
}
module.exports = new GoodUploadController();