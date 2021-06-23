import { request } from '@/utils/http.js'

export const moneyAll = function() {
    return request({
        url: '/money-all',
        method: "GET"
    })
}
export const moneyChange = function(data) {
    return request({
        url: '/money-change',
        data,
        method: "PUT"
    })
}
export const moneyAdd = function(data) {
    return request({
        url: '/money-add',
        data,
        method: "POST"
    })
}
export const moneyNewPost = function(data) {
    return request({
        url: '/money-new-post',
        data,
        method: "POST"
    })
}
export const moneyFind = function(data) {
    return request({
        url: '/money-find',
        data,
        method: "POST"
    })
}
