const path = require('path');

class GoodUploadController {
    async upload(ctx, next){
        /*文件从请求头files拿 */
        const { file } = ctx.request.files;
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