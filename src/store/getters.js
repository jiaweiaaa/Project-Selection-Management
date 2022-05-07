const getters = {
    sidebar: state => state.app.sidebar,
    token: state => state.user.token,
    currentAdmin: state => state.user.admin
  }
  
export default getters
  