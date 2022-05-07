import request from '../utils/request'

export default {
    getAnnouncementList() {
        return request({
            url: '/announcement/getAnnouncementList',
            method: 'get'
        })
    },
    deleteAnnouncement(id) {
        return request({
            url: '/announcement/deleteAnnouncement',
            method: 'post',
            params: {
                id: id
            }
        })
    },
    addAnnouncement(data) {
        return request({
            url: '/announcement/addAnnouncement',
            method: 'post',
            data: data
        })
    },
    updateAnnouncement(data) {
        return request({
            url: '/announcement/updateAnnouncement',
            method: 'post',
            data: data
        }) 
    },
    getAnnouncementInfo(id) {
        return request({
            url: '/announcement/getAnnouncement',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    getAnnByAuthorId(authorId) {
        return request({
            url: '/announcement/getAnnByAuthorId',
            method: 'get',
            params: {
                authorId: authorId
            }
        })
    }
}