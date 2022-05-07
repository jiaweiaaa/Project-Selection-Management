import request from '../utils/request'

export default {
    getAllAdmins() {
        return request({
            url: '/admin/getAdminList',
            method: 'get'
        })
    },
    updateAdmin(admin) {
        return request({
            url: '/admin/updateAdmin',
            method: 'post',
            data: admin
        })
    },
    addAdmin(admin) {
        return request({
            url: '/admin/saveAdmin',
            method: 'post',
            data: admin
        })
    },
    getAdmin(id) {
        return request({
            url: '/admin/getAdminById',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    deleteAdmin(id) {
        return request({
            url: '/admin/removeAdmin',
            method: 'post',
            params: {
                id: id
            }
        })
    },
    uploadHeadPortrait(file,id){
        return request({
            url: '/admin/uploadHeadPortrait',
            method: 'post',
            params: {
                file : file,
                id: id
            }
        })
    },
    resetAdminPassword(id) {
        return request({
            url: '/admin/resetAdminPassword',
            method: 'post',
            params: {
                id: id
            }
        })
    }

}