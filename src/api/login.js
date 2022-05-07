import request from '../utils/request'

export default {
    // Login function
    login(data) {
        return request({
            url: '/auth/adminLogin',
            method: 'post',
            data: data
        })
    },

    // After login, get admin info by token 
    getAdminInfo() {
        return request({
            url: '/auth/getAdminInfo',
            method: 'get'
        })
    }
}