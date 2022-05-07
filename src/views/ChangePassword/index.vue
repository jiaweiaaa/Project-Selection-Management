<template>
<el-container class="pw-container">
    <el-card class="admin-box">
        <div class="left-side">
            <el-avatar class="avatar" v-if="admin.avatar" shape="circle" :src="admin.avatar"></el-avatar>  
            <el-avatar class="avatar" v-else shape="circle" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>  
        
            <el-button class="change" type="primary" icon="el-icon-upload" @click="imagecropperShow=true">change
            </el-button>
            <image-cropper v-show="imagecropperShow" :key="imagecropperKey" :url="'/admin/uploadHeadPortrait'" field="file" :params="admin" langType="en" @close="close" @crop-upload-success="cropSuccess" />
        </div>

        <div class="line" />

        <div class="right-side">
            <el-form status-icon :rules="rules" ref="admin" :label-position="labelPosition" label-width="200px" :model="admin">
                <div class="row1">

                    <el-form-item label="Name :">
                        <el-input clearable style="width:300px" v-model="admin.name"></el-input>
                    </el-form-item>

                </div>
                <div class="row2">

                    <el-form-item label="Email :">
                        <span>{{admin.email}}</span>
                    </el-form-item>

                </div>
                <div class="row3">

                    <el-form-item label="Type :">
                        <span v-if="admin.type == 0">Admin</span>
                        <span v-if="admin.type == 1">Super Admin</span>
                    </el-form-item>

                </div>
                <div class="row4">

                    <el-form-item label="New Password :" prop="password">
                        <el-input style="width:300px" type="password" v-model="admin.password" autocomplete="off"></el-input>
                    </el-form-item>

                </div>
                <div class="row5">

                    <el-form-item label="Confirm Password :" prop="checkPass">
                        <el-input style="width:300px" type="password" v-model="admin.checkPass" autocomplete="off"></el-input>

                    </el-form-item>

                </div>
            </el-form>
            <div class="button">
                <el-button class="cancel" type="danger" @click="cancel">Cancel</el-button>
                <el-button class="confirm" type="primary" @click="UpdatePassword">Confirm</el-button>
            </div>
        </div>
    </el-card>
</el-container>
</template>

<script>
import admin from "@/api/admin";
import ImageCropper from '@/components/ImageCropper';
import cookies from 'js-cookie';

export default {
     inject:['reload'],   
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please Enter the Password !'));
            } else {
                if (this.admin.checkPass !== '') {
                    this.$refs.admin.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please Enter the Password again !'));
            } else if (value !== this.admin.password) {
                callback(new Error('The two passwords do not match!'));
            } else {
                callback();
            }
        };
        return {
            timer: null,
            labelPosition: 'right',
            imagecropperShow: false,
            imagecropperKey: 0,
            admin: {
                id: '',
                name: '',
                email: '',
                password: '',
                type: '',
                checkPass: '',
                avatar: '',
            },
            imgSrc: '',
            rules: {
                password: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: 'blur'
                }],
            }
        };
    },
    created() {
        var adminid = JSON.parse(localStorage.getItem("adminList"));
        this.admin.id = adminid
        this.getAdmin(this.admin.id)
    },
    methods: {
        cancel(){
            this.$router.push({name:"PersonalInfo"})
        },
        UpdatePassword() {
            if (this.admin.password != '') {
                if (this.admin.checkPass != '') {
                    if (this.admin.password === this.admin.checkPass) {
                        admin.updateAdmin(this.admin)
                            .then((response) => {
                                this.$message({
                                    type: "success",
                                    message: "Change Successfully !"
                                });
                                this.$router.push({
                                    name: 'Homepages'
                                })
                            })
                    } else {
                        this.timer = window.setTimeout(() => {
                            this.$notify({
                                title: "Error",
                                type: "error",
                                message: "Two password do not equal !",
                            });
                        }, 0)
                    }
                }
            }
        },
        getAdmin(id) {
            admin.getAdmin(id).then(response => {
                this.admin.name = response.data.admins.name
                this.admin.email = response.data.admins.email
                this.admin.type = response.data.admins.type
                this.admin.avatar = response.data.admins.avatar
            })
        },
        close() {
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1;
        },
        cropSuccess() {
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
            this.reload();
        },
    },
    components: {
        ImageCropper
    }

}
</script>

<style lang="scss">
.pw-container {
    padding: 15px;
    height: calc(100vh - 60px);
    box-sizing: border-box;

    display: grid;
    position: relative;

    .line {
        position: absolute;
        left: 40%;
        top: 10%;
        width: 0.2em;
        height: 500px;
        margin-right: 1em;
        margin-left: 3.5em;
        background: #0a0a0a;
    }

    .el-form-item__error {
        color: #F56C6C;
        font-size: 12px;
        line-height: 1;
        padding-top: 4px;
        position: absolute;
        top: 100%;
        left: 0;
        width: 200px;
    }

    .el-form-item__label {
        text-align: right;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        font-weight: bolder;
    }

    .left-side {
        position: absolute;
        left: 15%;
        top: 30%;
    }

    .avatar {
        width: 200px;
        height: 200px;
        display: block;
    }

    .right-side {
        padding: 7% 48%;

        .row1 {
            // margin-bottom: 30px;
            display: inline;
        }

        .row2 {
            margin-bottom: 30px;
        }

        .row3 {
            margin-bottom: 30px;
        }

        .row4 {
            margin-bottom: 30px;
        }
    }

    .button {
        position: absolute;
        margin-top: 40px;
        right: 16%;

        .cancel {
            margin-right: 40px;
        }
    }

    .change {
        margin-left: 90%;
        margin-top: 10%;
    }

}
</style>
