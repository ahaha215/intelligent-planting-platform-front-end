import axios from 'axios'
//导入element-ui组件库
import { Message } from 'element-ui'

// 创建axios的对象
const instance = axios.create({
    baseURL: "http://127.0.0.1:5000",  //配置固定域名

    timeout: 5000
})

// 请求拦截
// 所有的网络请求都会走这个方法,可以在请求添加自定义内容
// instance.interceptors.request.use(
//     function (config) {
//         // 请求头添加token值
//         config.headers.token = '123456' 
//         //请求头添加info值
//         config.headers.info = 'lxy'  
//         return config
//     },
//     function (err) {
//         return Promise.request(err)
//     }
// )

// 响应拦截
// 此处可以根据服务器返回的状态码做相应的数据
instance.interceptors.response.use(
    function (response) {
        const res = response.data

        if (res.code != 20000) {
            Message({
                message: res.message || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            return Promise.reject(new Error(res.message || 'Error'))
        } else {
            return res;
        }
    },
    function (err) {
        return Promise.request(err)
    }
)

export default instance;