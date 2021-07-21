import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://192.168.0.111:8001/',
    method: 'post',
    withCredentials: true,
    // xhrFields: { withCredentials: true },
    // crossDomain: true
  })
  return instance(config)
}
