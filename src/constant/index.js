const NotNullError = {
    code: '10001',
    message: '用户名或者年龄为空',
    result: ''
};

const ExistedError = {
    code: '10002',
    message: `户名已经存在`,
    result: ''
};

const RegisterError = {
    code: '10003',
    message: '用户注册失败',
    result: ''
}

const userNotExsite = {
    code: '10004',
    message: '用户不存在',
    result: ''
}

const passWordError = {
    code: '10005',
    message: '密码错误',
    result: ''
}

const userLoginError = {
    code: '10004',
    message: '登录错误',
    result: ''
}
module.exports = {
    NotNullError,
    ExistedError,
    RegisterError,
    userNotExsite,
    userLoginError,
    passWordError
};