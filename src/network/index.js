import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    method: 'post',
    withCredentials: true,
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
    return res.data
  },error => {
    return error
  })
  return instance(config)
}

