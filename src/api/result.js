import request from '../utils/request'

export default {
    getAllResult() {
        return request({
            url: '/result/getResult',
            method: 'get'
        })
    },
}