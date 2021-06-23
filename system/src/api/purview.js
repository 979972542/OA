import { request } from '@/utils/http.js'

export const getPurviewList = function() {
    return request({
        url: '/purview-list',
    })
}
export const purviewAdd = function(data) {
    return request({
        url: '/purview-add',
        data,
        method:"POST"
    })
}
export const purviewTree = function() {
    return request({
        url: '/purview-tree',
        method:"GET"
    })
}
export const purviewData = function(id) {
    return request({
        url: `/purview-data/${id}`,
        method:"GET"
    })
}
export const purviewEdit = function(data){
    return request({
        url:'/purview-edit',
        data,
        method:"PUT"
    })
}
export const purviewDelete = function(id){
    return request({
        url:`/purview-delete/${id}`,
        method:"DELETE"
    })
}
// 
export const accountget = function(){
    return request({
        url:`/account-get`,
        method:"GET"
    })
}
export const accountadd = function(data){
    return request({
        url:`/account-add`,
        data,
        method:"POST"
    })
}
export const accountfind = function(){
    return request({
        url:`/account-find`,
        method:"GET"
    })
}