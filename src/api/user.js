import request from '../utils/request'

export default {
    getAllUser() {
        return request({
            url: '/user/getAllUser',
            method: 'get'
        })
    },
}