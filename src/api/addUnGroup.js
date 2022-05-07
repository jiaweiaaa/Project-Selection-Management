import request from '../utils/request'

export default {
    unassignedGroup() {
        return request({
            url: '/allocation/getUnassignedGroup',
            method: 'get'
        })
    },
}