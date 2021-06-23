import {request} from '@/utils/http.js'

//获取所有路由列表
export const RouterAll = function(data){
    return request({
        url:'/router-list',
        params:data
    })
}
export const addRouter = function(data){
    return request({
        url:'/add-router',
        data,
        method:"POST"
    })
}
export const editRouter = function(data){
    return request({
        url:'/edit-router',
        data,
        method:"POST"
    })
}
export const deteleRouter = function(id){
    return request({
        url:`/delete-router/${id}`,
        method:"DELETE"
    })
}