# nodekoa
# 基于koa2搭建的一套API提供系统

#koa框架

#nodemon 可以随时监听文件的改动  nodemon xxxx.js

#dotenv 可以将根目录下的.env 文件中定义的常量(注意不要加分号) 通过dotenv.config()函数注入到process.env中

#koa-router 路由插件
## 使用规则
```js
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router({
  perfix: '/api'
});
app.use(router.routes())
app.listen(3000, () => {
  console.log('serve starting');
 })
```

## 路由自动加载  通过fs读取目录每个文件 将每个路由文件都require后然后router.use(r.routes()) 导出router供app使用

#koa-body 接口传参处理插件
## 配置文件上传
```js
const path = require('path');
const KoaBody = require('koa-body');
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, './static'),
      keepExtension: true
  })
);
```

#sequelize mysql2 操作数据库
```js
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(db, root, pwd, {
  host: localhost,
  dialect: 'mysql'
});
module.exports = sequelize;
```

##定义数据库模型
```js
const { DataTypes } = require('sequelize');
const sequelize = require('./db.js');
const User = sequelize.define('koa_user', {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '唯一字段'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '唯一字段'
  },
  age: {
    type: DataTypes.INTERAGE,
    allowNull: false
  }
});
module.exports = User
```

## 数据库操作  create  fineOne

#bcryptjs 密码加密 中间件
```js
const bcrypt = require('bcryptjs');
const securtPwd = async(ctx, next) => {
  const  {password} = ctx.request.body
  const salt = bcrypt.geSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  ctx.request.body.password = hash;
}
```
## 明文与密文相比较
```js
const bcrypt = require('bcryptjs');
const {password} = ctx.request.body;
bcrypt.compareSync(password, hash)
``

#jsonwebtoken token生成
```js
const jwt = require('jsonwebtoken');
const token = await jwt.sign(payload, privateKey, options);

const userinfo = await jwt.verify(token, privateKey);
ctx.state.user = useriinfo;

```

#koa-static 配置前端访问服务端的静态资源
```js
const KoaStatic = reuqire('koa-static');
app.use(KoaStatic(path.join(__dirname, './static)));
```
