import { request } from '@/utils/http.js'

export const limitLeaves = function() {
    return request({
        url: '/limit-leaves',
        method: "GET"
    })
}
export const limitLeavesAdd = function(data) {
    return request({
        url: '/limit-leaves-add',
        data,
        method: "POST"
    })
}
export const limitLeavesEdit = function(data){
    return request({
        url:'/limit-leaves-edit',
        data,
        method:"PUT"
    })
}
export const limitMorework = function() {
    return request({
        url: '/limit-morework',
        method: "GET"
    })
}
export const limitMoreworkAdd = function(data) {
    return request({
        url: '/limit-morework-add',
        data,
        method: "POST"
    })
}
export const limitMoreworkEdit = function(data){
    return request({
        url:'/limit-morework-edit',
        data,
        method:"PUT"
    })
}
export const limitproject = function(data){
    return request({
        url:'/limit-project',
        data,
        method:"GET"
    })
}
export const limitprojectadd = function(data){
    return request({
        url:'/limit-project-add',
        data,
        method:"POST"
    })
}
export const limitprojectedit = function(data){
    return request({
        url:'/limit-project-edit',
        data,
        method:"PUT"
    })
}
export const limitprojectdelete = function(data){
    return request({
        url:'/limit-project-delete',
        data,
        method:"POST"
    })
}
export const limitjudge = function(data){
    return request({
        url:'/limit-judge',
        data,
        method:"POST"
    })
}
// 
export const limitlist = function(data){
    return request({
        url:'/limit-list',
        data,
        method:"POST"
    })
}
export const limitlistadd = function(data){
    return request({
        url:'/limit-list-add',
        data,
        method:"POST"
    })
}
export const limitlistedit = function(data){
    return request({
        url:'/limit-list-edit',
        data,
        method:"PUT"
    })
}
export const limitlistdelete = function(id){
    console.log(id,'id');
    return request({
        url:`/limit-list-delete/${id.id}`,
        method:"DELETE"
    })
}
// 
export const limittracking = function(data){
    return request({
        url:'/limit-tracking',
        data,
        method:"GET"
    })
}