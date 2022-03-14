import { guid } from '@/utils/common'

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
      const sessionId = guid();

      if (userName === 'admin' && password === '123456') {
        sessionStorage.setItem('sessionId', sessionId);

        return {
          code: 200,
          message: '登录成功',
          data: {
            sessionId: sessionId
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
  {
    url: '/user/logout',
    type: 'get',
    response: () => {
      sessionStorage.removeItem('sessionId');
      return {
        code: 200,
        message: '成功退出登录',
        data: {
          sessionId: ''
        }
      };
    }
  },
  // getToken
  {
    url: '/user/check',
    type: 'get',
    response: () => {
      const sessionId = sessionStorage.getItem('sessionId');
      return {
        code: 200,
        message: '',
        data: {
          sessionId: sessionId
        }
      };
    }
  },
  {
    url: '/user/getroutes',
    type: 'get',
    response: () => {
      const routerarr = [{
        path: '/about11/about123',
        name: 'About12',
        componenturl: 'Layout',
        redirect: '/about11/about123',
        children: [{
          path: '/about11/about123',
          parentName: 'About12',
          name: 'About121111',
          componenturl: 'About',
          meta: {
            title: '关于12113',
            hidden: false
          }
        },
        {
          path: '/about11/about12',
          parentName: 'About12',
          name: 'About121',
          componenturl: 'About',
          meta: {
            title: '关于1211',
            hidden: false
          }
        }, {
          path: '/about11/about121',
          parentName: 'About12',
          name: 'About1212',
          componenturl: 'About',
          meta: {
            title: '关于12112',
            hidden: false
          }
        }]
      }];
      return {
        code: 200,
        message: '',
        data: {
          routerarr: routerarr
        }
      }
    }
  }
];
