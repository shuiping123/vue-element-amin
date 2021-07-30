import {request} from '@/network/index'
// import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Ashx/Login.ashx',
    // url: '/vue-element-admin/user/login',
    method: 'get',
    params:data,
    // data
  })
}
export function getInfo(token) {
  // return request({
  //   url: '/vue-element-admin/user/info',
  //   method: 'get',
  //   params: { token }
  // })
  return new Promise(resolve => {
    var obj={"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}};

    resolve(obj)
  })
}

export function logout() {
  return request({
    url: '/Ashx/Index.ashx?ty=signOut&time='+new Date(),
    method: 'get'
  })
}

export function checklog() {
  return request({
    url: '/Ashx/CheckLogin.ashx',
    method: 'get'
  })
}
