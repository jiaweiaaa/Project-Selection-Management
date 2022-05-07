import request from '../utils/request'

export default {
    getAllProject() {
        return request({
            url: '/project/getAllProject',
            method: 'get'
        })
    },
    saveProject(project) {
        return request({
            url: '/project/saveProject',
            method: 'post',
            data: project
        })
    },
    removeProject(id) {
        return request({
            url: '/project/removeProject',
            method: 'post',
            params:
            {
                id: id
            }

        })
    },
    updateProject(data) {
        return request({
            url: '/project/updateProject',
            method: 'post',
            data: data
        })

    },
    getProjectById(id) {
        return request({
            url: '/project/getProjectById',
            method: 'get',
            params: {
                id: id
            }
        })
    },
    getByPage(cpage) {
        return request({
            url: '/project/getByPage',
            method: 'get',
            params: {
                cpage: cpage
            }
        })
    },
    keywordSearch(keyword) {
        return request({
            url: '/project/keywordSearch',
            method: 'get',
            params:
            {
                keyword: keyword
            }
        })
    },
    getProjectGroupStatistic() {
        return request({
            url: '/project/getProjectGroups',
            method: 'get',
        })
    }
}
