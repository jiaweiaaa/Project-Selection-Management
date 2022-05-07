<template>
    <el-container class="layout-container">
        <el-container>
            <el-header class="header">
                 <div>
                <i class="el-icon-s-fold nav-icon" v-show="!sidebar.opened" @click="toggleCollapsed"></i>
                <i class="el-icon-s-unfold nav-icon" v-show="sidebar.opened" @click="toggleCollapsed"></i>
               </div>
 
               <el-dropdown>
            <span class="el-dropdown-link">
                <i class="el-icon-user nav-menu"></i>
                <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item   @click.native="PersonalInfo">
                            <i class="el-icon-s-custom nav-info"></i>
                            Personal Information
                            </el-dropdown-item>
                        <el-dropdown-item  @click.native="ChangePassword">
                            <i class="el-icon-setting nav-setting"></i>
                            Change Password
                            </el-dropdown-item>
                        <el-dropdown-item @click.native="logout">
                            <i class="el-icon-switch-button nav-out"></i>
                            Log out
                            </el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
               
            </el-header>
        </el-container>
    </el-container>

</template>

<script>
import { mapGetters } from 'vuex'
import cookies from 'js-cookie'

export default {
    data () {
        return {
            isCollapsed: false
        }
    },
    methods: {
        toggleCollapsed () {
            this.$store.dispatch('app/toggleSideBar')
        },
        logout() {
            cookies.set('admin', '')
            cookies.set('token', '')
            this.$store.dispatch('user/logout')
            this.$router.push('/')
        },
        ChangePassword(){
            this.$router.push({name:'ChangePassword'})
        },
        PersonalInfo(){
            this.$router.push({name:'PersonalInfo'})
        }
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
    }
    
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
 .el-header {
    padding: 15px 20px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

.nav-icon {
    cursor: pointer;
    font-size: 20px;
    }
.nav-menu{
    cursor: pointer;
    font-size: 20px;
}
.bread{
    display: flex;
}

</style>