import request from '../utils/request'

export default {
    getStudentList() {
        return request({
            url: '/student/getStudentList',
            method: 'get'
        })
    },
    removeStudent(id){
        return request({
            url: '/student/removeStudent',
            method: 'post',
            params :
            {
                id : id
            } 
        })
    },
    getStudentByPage(cpage){
        return request({
            url: '/student/getStudentByPage',
            method: 'get',
            params: {
                cpage: cpage
            }
        })
    },
    addStudent(student){
        return request({
            url: '/student/addStudent',
            method: 'post',
            data : student
        })
    },
    keywordSearchStudent(keyword){
        return request({
            url: '/student/keywordSearchStudent',
            method: 'get',
            params :
                {
                    keyword : keyword
                } 
        })
    },
    removeStudentBatch(idList){
        return request({
            url: '/student/removeStudentBatch',
            method : 'post',
            params :
            {
                idList : idList
            }
        })
    },
    resetPassword(id){
        return request({
            url: '/student/resetPassword',
            method : 'post',
            params :
            {
                id : id
            }
    })
    },
    getTemplate(){
        return request({
            url: '/student/batch/template',
            method : 'get',
    })
    },
    uploadFile(file){
        return request({
            url: '/student/batch/import',
            method : 'post',
            params:
            {
                file : file
            }
    })
    }
}