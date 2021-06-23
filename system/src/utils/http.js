import axios from 'axios';
import Router from '@/router';
import {Message} from 'element-ui';

export const request = axios.create({
    baseURL:'http://localhost:7001',
    timeout:5000,
})

//请求拦截
// 其实就是先执行要添加的数据，然后再执行ajax
request.interceptors.request.use(config=>{
    const token = window.localStorage.getItem('token')
    // console.log(token);
    if(token){
        config.headers.token=token;
    }
    return config
})

//响应拦截
// 响应拦截器的作用是在接收到响应后进行一些操作，
// 例如在服务器返回登录状态失效，需要重新登录的时候，跳转到登录页。
// 就是在请求结果返回后，先不直接导出，而是先对响应码等等进行处理，处理好后再导出给页面
request.interceptors.response.use(respone=>{
    return respone.data
},err=>{
    // console.dir(err)
    //判断状态码
    if(err.response.status === 401){
        Router.push('/login')
        // 利用路由实例跳转
    }
    if(err.response.status === 402){
        console.log(111);
        //处理错误信息
        Message.error(err.response.data.message)
        // alert(err.response.data.message)
    }
    throw err
    // return err
})

// exports.request= server
