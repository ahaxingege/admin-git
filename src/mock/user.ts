interface resParams {
  body: string,
  url: string,
  type: string,
}
interface bodyParams {
  userName: string,
  password: string,
}

export default [
  // GetUserInfo
  {
    url: '/user/login',
    type: 'post',
    response: (res: resParams) => {
      console.log(res.body)
      const bodyData: bodyParams = JSON.parse(res.body)
      const { userName, password } = bodyData;
      if (userName === 'admin' && password === '123456') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            name: 'testName'
          }
        };
      } else {
        return {
          code: 0,
          message: '账号或密码不匹配',
          data: {}
        };
      }
    }
  },
  // getToken
  {
    url: '/auth/oauth/token',
    type: 'post',
    response: () => {
      return {
        code: 200,
        message: '成功',
        data: {
          name: 'testName'
        }
      };
    }
  }
];
