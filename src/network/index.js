import axios from 'axios'
import context from '@/main'


export function request(config) {
  const instance = axios.create({
    method: 'post',
    withCredentials: true,
    headers:{
        'Content-Type': ' application/x-www-form-urlencoded',
    },
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

