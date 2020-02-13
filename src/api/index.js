let dev = (function f() {
  if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production') {
    return false
  }
  return true
})()
// 配置API接口地址

//const API_ROOT = dev ? 'http://192.168.8.239:10200/zhifanapp' : 'http://192.168.8.239:10200/zhifanapp'
 const API_ROOT = dev ? 'http://39.108.220.178:10200/zhifanapp' : 'http://39.108.220.178:10200/zhifanapp'
const IMAGE_ROOT = 'https://zhifanapp.oss-cn-hangzhou.aliyuncs.com/'
export default {
  API_ROOT: API_ROOT,
  IMAGE_ROOT: IMAGE_ROOT
}
