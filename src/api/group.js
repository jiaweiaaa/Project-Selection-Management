import request from '../utils/request'

export default {
    getAllGroup() {
        return request({
            url: '/group/getAllGroup',
            method: 'get'
        })
    },
    keywordGroupSearch(keyword) {
        return request({
            url: '/group/keywordGroupSearch',
            method: 'get',
            params: {
                keyword: keyword
            }
        })
    },
    getGroupByPage(cpage) {
        return request({
            url: '/group/getGroupByPage',
            method: 'get',
            params: {
                cpage: cpage
            }
        })
    },
    removeGroup(id) {
        return request({
            url: '/group/removeGroup',
            method: 'post',
            params:
            {
                id: id
            }

        })
    },
    removeGroupBatch(idList) {
        return request({
            url: '/group/removeGroupBatch',
            method: 'post',
            params:
            {
                idList: idList
            }
        })
    },
    getGroupList() {
        return request({
            url: '/group/getGroupList',
            method: 'get',
        })
    },
    getPageGroupList(keyword, page, limit) {
        return request({
            url: '/group/getPageGroupList',
            method: 'get',
            params:
            {
                keyword: keyword,
                page: page,
                limit: limit
            }
        })
    },
    exitGroupByAdmin(studentId,groupid){
        return request({
            url: '/group/exitGroupByAdmin',
            method : 'post',
            params : 
            {
                studentId : studentId + "",
                groupid : groupid +"",

            }
    })
}
}