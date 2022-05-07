<template>
    <div class="login-page">
        <div class="form-container">
            <img src="../assets/usyd-logo.png" alt="" class="usyd-logo">
            <div class="input-container">
                <div class="input-field">Email</div>
                <el-input
                    placeholder="email"
                    v-model="email"
                    class="login-input email-input"
                    @input="clearError('email')"
                    @keyup.enter.native="login"
                    clearable>
                </el-input>
                <div class="error-wrapper email-error" v-show="error.email.isShow">{{error.email.message}}</div>
            </div>
            <div class="input-container">
                <div class="input-field">Password</div>
                <el-input
                    placeholder="password"
                    v-model="password"
                    class="login-input password-input"
                    @keyup.enter.native="login"
                    @input="clearError('password')"
                    show-password>
                </el-input>
                <div class="error-wrapper email-error" v-show="error.password.isShow">{{error.password.message}}</div>
            </div>
            <el-button type="primary" class="login-button" @click="login">Login</el-button>

        </div>
    </div>
</template>

<script>
import loginApi from '@/api/login'
import CONSTANTS from '@/utils/constants'
import cookies from 'js-cookie'

export default {
    data() {
        return {
            email: '',
            password: '',
            error: {
                email: {
                    isShow: false,
                    message: 'Email cannot be empty'
                },
                password: {
                    isShow: false,
                    message: 'Password cannot be empty'
                }
            }
        }
    },
    methods: {
        login() {
            let loginData = {
                email: this.email,
                password: this.password
            }
            
            if (this.validateBeforeLogin()) {
                loginApi.login(loginData).then(response => {
    
                    if (response.code == CONSTANTS.RESPONSE_CODE.SUCCESS) {
                        let token = response.data.token
                        // TODO
                        cookies.set('token', token)
                        loginApi.getAdminInfo().then(response => {
                            debugger
                            cookies.set('admin', JSON.stringify(response.data.admin))
                            let currentAdmin = response.data.admin
                            this.$store.dispatch('user/login', {token, currentAdmin})
                            // TODO
                            // change /admin
                            this.$router.push('/home/index')
                        })
                        return
                    }
    
                    if (response.code == CONSTANTS.RESPONSE_CODE.EMAIL_NOT_EXIST) {
                        this.error.email.message = 'Email not exist'
                        this.error.email.isShow = true
                        return
                    }

                    if (response.code == CONSTANTS.RESPONSE_CODE.ERROR_PASSWORD) {
                        this.error.password.message = 'Passowrd not correct'
                        this.error.password.isShow = true
                        return
                    }
                })
            }
        },
        validateBeforeLogin() {
            if (this.email.trim() == '') {
                this.error.email.message = 'Email cannot be empty'
                this.error.email.isShow = true
                return false
            }

            let email_reg = new RegExp(CONSTANTS.REG.EMAIL_REG)
            if (!email_reg.test(this.email)) {
                this.error.email.message = 'Email format error'
                this.error.email.isShow = true
                return false
            }

            if (this.password == '') {
                this.error.email.message = 'Password cannot be empty'
                this.error.password.isShow = true
                return false
            }

            return true
        },
        clearError(label) {
            this.error[label].isShow = false
        }
    }
}
</script>


<style lang="scss" scoped>
.login-page {
    min-height: 100%;
    width: 100%;
    background-color: #003344;
    .usyd-logo {
        width: 80%;
        margin-bottom: 20px;
    }
    .error-wrapper {
        background-color: #880000;
        color: white;
        font-size: 14px;
        line-height: 2.5;
        border-radius: 0 0 3px 3px;
    }
    .form-container {
        width: 520px;
        margin: 0 auto;
        padding: 200px 35px 0;
        text-align: center;
    }
    .input-container {
        width: 80%;
        margin:0 auto 20px;
        .input-field {
            color: white;
            text-align: left;
            margin-bottom: 10px;
            font-size: 12px;
        }
    }
    .login-input {

    }
    .login-button {
        width: 80%;
        margin-top: 15px;
    }
    .email-input {
    }
}
</style>