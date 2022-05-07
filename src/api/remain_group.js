import request from '../utils/request'

export default {
    getUnallocatedGroup() {
        return request({
            url: '/home/getUnallocatedGroup',
            method: 'get'
        })
    },
}