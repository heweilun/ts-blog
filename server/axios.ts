import axios from 'axios'
const isDev = process.env.NODE_ENV == 'development'

const requestInstance = axios.create({
    baseURL: '/',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json'
    },
})
//请求拦截器
requestInstance.interceptors.request.use(config => config, error => Promise.reject(error))

// 添加响应拦截器
requestInstance.interceptors.response.use(response => {
    if (response?.status === 200) {            
        return Promise.resolve(response);        
    } else {            
        return Promise.reject(response);        
    }
},error => {

})

export default requestInstance