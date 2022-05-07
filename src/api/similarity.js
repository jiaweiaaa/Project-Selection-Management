import axios from 'axios'

const request = axios.create({
    baseURL: process.env.NODE_ENV == 'production' ? 'http://python.usydprojectallocation.com:5000' : 'http://localhost:5000',
    timeout: 5000
})

export default {
    addProjectSimilarity() {
        return request({
            url: '/addProjectSimilarity',
            method: 'get'
        })
    },
}