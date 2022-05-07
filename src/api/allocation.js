import request from '../utils/request'

export default {
    getAllProject() {
        return request({
            url: '/project/getAllProject',
            method: 'get'
        })
    },
    getValidGroup(keyword,num) {
        return request({
            url: '/allocation/getValidGroup',
            method: 'get',
            params: {
                keyword: keyword,
                num: num
            }
        })
    },
    getAllValidGroup() {
        return request({
            url: '/allocation/getAllValidGroup',
            method: 'get',
            
        })
    },
    addGroup(ProjectId,groupId) {
        return request({
            url: '/allocation/addGroup',
            method: 'get',
            params: {
                ProjectId: ProjectId,
                groupId: groupId
            }
        })
    },
    deleteGroup(ProjectId,groupId) {
        return request({
            url: '/allocation/deleteGroup',
            method: 'get',
            params: {
                ProjectId: ProjectId,
                groupId: groupId
            }
        })
    },
    unassignedGroup() {
        return request({
            url: '/allocation/getUnassignedGroup',
            method: 'get'
        })
    },
    getProject(id) {
        return request({
            url: '/allocation/getProject',
            method: 'get',
            params: {
                id: id,
            }
        })
    },
    getFreeProject(){
        return request({
            url: '/allocation/getFreeProject',
            method: 'get'
        })
    },
    getInvalidGroup(){
        return request({
            url: '/allocation/getInvalidGroup',
            method: 'get'
        })
    },
    invalidGroupSearch(keyword){
        return request({
            url: '/allocation/invalidGroupSearch',
            method: 'get',
            params: {
                keyword: keyword,
            }
        })
    },
    mergeInvalidGroup(firstGroupid,secGroupid){
        return request({
            url: '/group/mergeInvalidGroup',
            method: 'post',
            params: {
                firstGroupid: firstGroupid,
                secGroupid: secGroupid
            }
        })
    },
}