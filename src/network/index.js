import axios from 'axios'
import context from '@/main'


export function request(config) {
  const instance = axios.create({
    method: 'post',
    withCredentials: true,
    headers:{
        'Content-Type': ' application/x-www-form-urlencoded',
    },
    // headers: {
    //   'Access-Control-Allow-Headers': 'x-requested-with,content-type',
    //   'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    //   'Access-Control-Allow-Origin': '*',
    //   'Cache-Control': 'private',
    //   'Content-Length': '373',
    //   'Content-Type': ' application/json; charset=utf-8',
    //   'Server': 'Microsoft-IIS/10.0'
    // }
    // xhrFields: { withCredentials: true },
    // crossDomain: true
  })
  instance.interceptors.response.use(res=>{
    if (res.data.returncode==2){
      if (context.$store.state.login.logState!=='logout'){
        context.$store.commit('CHANGE_LOG_STATE','logout');
        context.$alert(res.data.returnmsg, "错误信息", {
          confirmButtonText: "重新登录",
          callback: action => {
            context.$current.toLoginOut();
          }
        })
        return false;
      }
    }
    return res.data
  },error => {
    return error
  })
  return instance(config)
}

