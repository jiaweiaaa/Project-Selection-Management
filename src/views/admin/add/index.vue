<template>
    <div class="add-admin-container">
        <div class="row">
            <div class="title">Name: </div>
            <div class="row-input">
                <el-input v-model="admin.name" placeholder="Name" @input="clearError('name')"></el-input>
                <div class="error-notification" v-show="errors.name.show">
                    <i class="el-icon-warning-outline"></i>
                    {{errors.name.text}}
                </div>
            </div>
        </div>
        <div class="row">
            <div class="title">Email: </div>
            <div class="row-input">
                <el-input v-model="admin.email" placeholder="Email" v-if="admin.id" :disabled="true"></el-input>
                <el-input v-model="admin.email" placeholder="Email" v-else @input="clearError('email')"></el-input>
                <div class="error-notification" v-show="errors.email.show">
                    <i class="el-icon-warning-outline"></i>
                    {{errors.email.text}}
                </div>
            </div>
        </div>
        <div class="row" v-if="!admin.id">
            <div class="title">Password: </div>
            <div class="row-input">
                <el-input v-model="admin.password" show-password placeholder="Password" @input="clearError('password')"></el-input>
                <div class="error-notification" v-show="errors.password.show">
                    <i class="el-icon-warning-outline"></i>
                    {{errors.password.text}}
                </div>
            </div>
        </div>
        <div class="row" v-if="!admin.id">
            <div class="title">Confirmed Password: </div>
            <div class="row-input">
                <el-input v-model="admin.confirmedPassword" show-password placeholder="Confirmed Password" @input="clearError('confirmedPassword')"></el-input>
                <div class="error-notification" v-show="errors.confirmedPassword.show">
                    <i class="el-icon-warning-outline"></i>
                    {{errors.confirmedPassword.text}}
                </div>
            </div>
        </div>
        <div class="row">
            <div class="title">Type: </div>
            <div class="row-input">
                <el-select v-model="admin.type" placeholder="Please Select" @change="clearError('type')">
                    <el-option 
                        v-for="item in adminTypes"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    >
                    </el-option>
                </el-select>
                <div class="error-notification" v-show="errors.type.show">
                    <i class="el-icon-warning-outline"></i>
                    {{errors.type.text}}
                </div>
            </div>
        </div>
        <div class="row" v-if="admin.id">
            <div class="title">Password: </div>
            <div class="row-input">
                <el-button class="reset-password-btn" @click="resetAdminPassword">Reset Password</el-button>
            </div>
        </div>
        <div class="button-wrapper">
            <i class="el-icon-delete" v-if="admin.id && currentAdmin.id != admin.id" @click="deleteAdmin(admin.id)"></i>
            <el-button type="danger" class="cancel-button" @click="cancel">Cancel</el-button>
            <el-button type="primary" class="confirm-button" @click="addAdmin">Confirm</el-button>
        </div>
    </div>
</template>

<script>
import adminApi from '@/api/admin'
import { mapGetters} from 'vuex'
import CONSTANTS from '@/utils/constants'
export default {
    data () {
        return {
            admin: {
                id: '',
                name: '',
                email: '',
                password: '',
                confirmedPassword: '',
                type: ''
            },
            adminTypes: [
                {
                    value: '0',
                    label: 'Super Admin'
                },
                {
                    value: '1',
                    label: 'Admin'
                }
            ],
            errors: {
                name: {
                    show: false,
                    text: 'Please input name.'
                },
                email: {
                    show: false,
                    text: 'Please input email.'
                },
                password: {
                    show: false,
                    text: 'Please input password.'
                },
                confirmedPassword: {
                    show: false,
                    text: 'Please input confirmed password.'
                },
                type: {
                    show: false,
                    text: 'Please select admin type.'
                }
            },
        }
    },
    created() {
        let id = this.$route.params.id
        if (id) {
            this.admin.id = id
            this.getAdmin(id)
        }

        console.log(this.currentAdmin.id)
        console.log(this.admin.id)
        console.log(this.currentAdmin.id != this.admin.id)
    },
    computed: {
        ...mapGetters([
            'currentAdmin'
        ])
    },
    methods: {
        resetAdminPassword() {
            this.$confirm('The admin password will be reset as 123456, continue?', 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                adminApi.resetAdminPassword(this.admin.id).then(response => {
                    if (response.code == CONSTANTS.RESPONSE_CODE.SUCCESS) {
                        this.$message({
                            message: 'Reset password succeed',
                            type: 'success'
                        })
                    }
                    this.$router.push("/admin/list")
                })
            })
        },
        getAdmin(id) {
            adminApi.getAdmin(id).then((response) => {
                let adminInfo = response.data.admins
                let confirmedPassword = adminInfo.password
                this.admin = {
                    id: adminInfo.id,
                    name: adminInfo.name,
                    email: adminInfo.email,
                    password: adminInfo.password,
                    confirmedPassword: adminInfo.password,
                    type: adminInfo.type 
                }
            })

        },
        deleteAdmin(id) {
            if (id == this.currentAdmin.id) {
                this.$message({
                    message: 'You can not delete yourself.',
                    type: 'error'
                })
            }

            this.$confirm('Are you sure delete this admin?', 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                adminApi.deleteAdmin(id).then(response => {
                    if (response.code == CONSTANTS.RESPONSE_CODE.SUCCESS) {
                        this.$message({
                            type: 'success',
                            message: 'Delete Successfully'
                        })
                        this.$router.push('/admin/list')
                    }
                })
            })
        },
        clearError(errorName) {
            this.errors[errorName].show = false

            if (errorName == 'password' || errorName == 'confirmedPassword') {
                this.errors.password.show = false
                this.errors.confirmedPassword.show = false
            }
        },
        cancel() {
            this.$router.push('/admin/list')
        },
        validateBeforeAdd() {
            let isPassed = true

            if (!this.admin.name) {
                this.errors.name.text = 'Please input name.'
                this.errors.name.show = true
                isPassed = false
                return isPassed
            } 

            if (!this.admin.email) {
                this.errors.email.text = 'Please input email.'
                this.errors.email.show = true
                isPassed = false
                return isPassed
            } 

            if (!this.admin.password) {
                this.errors.password.text = 'Please input password.'
                this.errors.password.show = true
                isPassed = false
                return isPassed
            } 

            if (!this.admin.confirmedPassword) {
                this.errors.confirmedPassword.text = 'Please input confirmed Password.'
                this.errors.confirmedPassword.show = true
                isPassed = false
                return isPassed
            } 

            if (!this.admin.type) {
                this.errors.type.text = 'Please select admin type.'
                this.errors.type.show = true
                isPassed = false
                return isPassed
            } 

            if (this.admin.password !== this.admin.confirmedPassword) {
                this.errors.password.text = 'Unmatched password'
                this.errors.password.show = true

                this.errors.confirmedPassword.text = 'Unmatched password'
                this.errors.confirmedPassword.show = true
                isPassed = false
                return isPassed
            }

            return isPassed
        },
        addAdmin() {
            if (!this.validateBeforeAdd()) {
                return
            }
            this.showConfirmDialog()
        },
        submitAdminInfo() {
            let admin = {}
            if (this.$route.params.id) {
                admin = {
                    id: this.admin.id,
                    name: this.admin.name,
                    email: this.admin.email,
                    password: this.admin.password,
                    type: this.admin.type
                }

                adminApi.updateAdmin(admin).then(() => {
                    this.$message({
                        type: 'success',
                        message: 'Add Successfully'
                    })
                    this.$router.push('/admin/list')
                })
            } else {
                admin = {
                    name: this.admin.name,
                    email: this.admin.email,
                    password: this.admin.password,
                    type: this.admin.type
                }

                adminApi.addAdmin(admin).then(() => {
                    this.$message({
                        type: 'success',
                        message: 'Update Successfully'
                    })
                    this.$router.push('/admin/list')
                })
            }
        },
        showConfirmDialog() {
            let text = this.$route.params.id ? 'Are you sure update this admin?' : 'Are you sure add this admin?'
            this.$confirm(text, 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                this.submitAdminInfo()

            })
        }
    },
    watch: {
        '$route' () {
            this.admin = {
                id: '',
                name: '',
                email: '',
                password: '',
                confirmedPassword: '',
                type: '',
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.add-admin-container {
    padding-top: 80px;
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    .row {
        margin-bottom: 25px;
        .title {
            font-size: 14px;
            margin-bottom: 15px;
        }
        .row-input {
            display: inline-block;
            width: 300px;
            position: relative;
        }
        .error-notification {
            display: inline-block;
            color: red;
            margin-left: 20px;
            font-size: 12px;
            position: absolute;
            right: -10px;
            top: 50%;
            transform: translateX(100%) translateY(-50%);
            .el-icon-warning-outline {
                margin-right: 5px;
            }
        }
        .el-select {
            width: 300px;
        }
    }
    .button-wrapper {
        text-align: right;
        .el-icon-delete {
            margin-right: 10px;
            color: #cacaca;
            cursor: pointer;
        }
    }
    .reset-password-btn {
        width: 100%;
    }
}

</style>