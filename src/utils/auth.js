import cookies from 'js-cookie'

function getToken() {
    let token = cookies.get('token')

    if (token) {
        return token
    }
    return ''
}
function getAdmin() {
    let adminStr = cookies.get('admin')
    
    if (adminStr) {
        return JSON.parse(adminStr)
    }
    return {}
}

export {
    getToken,
    getAdmin
}