<template>
    <div class="admin-list-container">
        <div class="admin-wrapper">
            <div class="header">Super Admin</div>
            <div class="admin-list" v-if="superAdmins.length > 0">
                <div v-for="(admin, index) in superAdmins" @click="editAdmin(admin.id)" class="single-admin-wrapper" :key="index">
                    <div class="admin-avatar" v-if="admin.avatar" :style="{backgroundImage: 'url(' + admin.avatar + ')'}"></div>
                    <div class="admin-avatar default-avatar" v-else></div>
                    <div class="admin-name">{{admin.name}}</div>
                </div>
            </div>
            <no-data v-else></no-data>
        </div>
        <div class="admin-wrapper">
            <div class="header">Admin</div>
            <div class="admin-list" v-if="ordinaryAdmins.length > 0">
                <div v-for="(admin, index) in ordinaryAdmins" @click="editAdmin(admin.id)" class="single-admin-wrapper" :key="index">
                    <div class="admin-avatar" v-if="admin.avatar" :style="{backgroundImage: 'url(' + admin.avatar + ')'}"></div>
                    <div class="admin-avatar default-avatar" v-else></div>
                    <div class="admin-name">{{admin.name}}</div>
                </div>
            </div>
            <no-data v-else></no-data>
        </div>
        <el-button class="add-admin-button" type="primary" @click="toAddAdmin">Add Admin</el-button>
    </div>
</template>

<script>
import userApi from '@/api/user'
import adminApi from '@/api/admin'
import NoData from '@/components/NoData'
import mapGetters from 'vuex'
export default {
    data() {
        return {
            admins: [],
        }
    },
    components: {
        NoData
    },
    computed: {
        superAdmins () {
            return this.admins.filter( admin => {
                return admin.type == 0
            })
        },
        ordinaryAdmins() {
            return this.admins.filter( admin => {
                return admin.type == 1
            })
        }

    },
    created() {
        //this.getAllUser()
        this.getAllAdmins()
    },
    methods: {
        getAllUser() {
            userApi.getAllUser().then( response => {
                console.log(response)
                this.users = response.data.users
            })
        },
        getAllAdmins() {
            adminApi.getAllAdmins().then(response => {
                this.admins = response.data.admins
            })
        },
        toAddAdmin () {
            this.$router.push('/admin/add')
        },
        editAdmin(id) {
            this.$router.push('/admin/add/' + id)
        },
    }
}
</script>

<style lang="scss">
.admin-list-container {
    padding: 30px;
    position: relative;
    .admin-wrapper {
        margin-bottom: 20px;
        .header {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .admin-list {
            width: 60%;
        }
        .single-admin-wrapper {
            display: inline-block;
            margin-right: 40px;
            margin-bottom: 20px;
            cursor: pointer;
            text-align: center;
        }
        .admin-avatar {
            margin: 0 auto 10px auto;
            width: 60px;
            height: 60px;
            background-size: cover;
            border-radius: 100%;
        }
        .admin-name {
            font-size: 12px;
        }
        .default-avatar {
            background-image: url('../../../assets/default-avatar.png');
        }
    }
    .add-admin-button {
        position: absolute;
        right: 30px;
        top: 30px;
    }

}

</style>