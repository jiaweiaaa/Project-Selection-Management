<template>
<el-container class="info-container">
    <el-card class="info-box">
        <div class="top-left">
            <el-avatar class="avatar" v-if="admin.avatar" shape="circle" :src="admin.avatar"></el-avatar>  
            <el-avatar class="avatar" v-else shape="circle" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>  
        </div>
        <div class="line" />
        <div class="top-right">
            <el-form status-icon label-width="200px">
                <div class="row1">
                    <el-form-item label="Name :">
                        <span> {{ admin.name }}</span>
                        <i class="el-icon-edit" style="margin-left:10px; border-width:0px;" @click="jump"></i>
                    </el-form-item>
                </div>
                <div class="row2">
                    <el-form-item label="Email :">
                        <!-- <el-input disabled  clearable style="width:300px" v-model="admin.email"   ></el-input> -->
                        <span> {{ admin.email }}</span>
                    </el-form-item>
                </div>
                <div class="row3">
                    <el-form-item style="font-weight:border" label="Type :">
                        <!-- <el-input disabled style="width:300px; "  v-model="admin.type" ></el-input> -->
                        <span v-if="admin.type == 0"> Admin </span>
                        <span v-if="admin.type == 1"> Super admin </span>
                    </el-form-item>
                </div>
                <div class="row4">
                </div>
            </el-form>
        </div>
        <div class="bottom">
            <el-form ref="announcement">
                <el-card class="bottom-card">
                    <perfect-scrollbar class="background-container">
                        <div>
                            <span class="text" style="font-size:18px;">
                                Your Annoucement
                            </span>
                        </div>
                        <div class="ann-card">
                            <el-row :gutter="10" type="flex" justify="end" v-for="(item,index) in announcement" :key="item.id">
                                <el-col :span="12">
                                    <el-card class="item-card" :key="index" :body-style="{padding :'10px', height:'150px'}" shadow="hover" @click.native="goEdit(item.id)">
                                        <div class="item_client_tag">
                                            <span style="color:grey; font-size:15px;"><b>Title : </b></span>
                                        </div>
                                        <div class="item_title">
                                            <span style="font-size:15px">{{ item.title }}</span>
                                        </div>
                                        <div class="item_client_tag">
                                            <span style="color:grey; font-size:15px;"><b>Content :</b></span>
                                        </div>
                                        <div class="item_title">
                                            <span style="font-size:15px" v-html=" item.content "></span>
                                        </div>
                                    </el-card>
                                </el-col>
                            </el-row>
                        </div>
                    </perfect-scrollbar>
                </el-card>
            </el-form>
        </div>
    </el-card>
</el-container>
</template>

<script>
import ann from "@/api/announcement";
import admin from '@/api/admin'


export default {
    inject: ['reload'],
    data() {
        return {
            admin: {
                id: '',
                name: '',
                email: '',
                password: '',
                type: '',
                checkPass: '',
                avatar: '',
            },
            announcement: [],
        
        };
    },
    created() {
        var adminid = JSON.parse(localStorage.getItem("adminList"));
        this.admin.id = adminid
        this.getAnnByAuthorId(this.admin.id)
        this.getAdmin(this.admin.id)
    },
    methods: {
        goEdit(id) {
            this.$router.push('/announcement/edit/' + id)
        },
        jump() {
            this.$router.push({
                name: "ChangePassword"
            })
        },
        getAnnByAuthorId(authorId) {
            ann.getAnnByAuthorId(authorId)
                .then((response) => {
                    console.log(response.data.Announcement)
                    this.announcement = response.data.Announcement
                })
        },
        getAdmin(id) {
            admin.getAdmin(id).then(response => {
                this.admin.name = response.data.admins.name
                this.admin.email = response.data.admins.email
                this.admin.type = response.data.admins.type
                this.admin.avatar = response.data.admins.avatar
            })
        },
    }
}
</script>

<style lang="scss">
.info-container {
    padding: 15px;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    display: grid;
    position: relative;

    .top-left {
        position: absolute;
        left: 20%;
        top: 13%;

        .avatar {
            width: 200px;
            height: 200px;
            display: block;
        }
    }
     
    .background-container {
        height: calc(40vh - 50px);
        padding: 10px;
    }

    .el-input.is-disabled .el-input__inner {
        background-color: #ffffff;
        border-color: #ffffff;
        color: #303133;
        cursor: not-allowed;
        border-width: 0px;
    }

    .el-form-item__label {
        text-align: center;
        vertical-align: middle;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        font-weight: bolder;

    }

    .el-input--suffix .el-input__inner {
        padding-right: 30px;
        border-width: 0px;
    }

    .line {
        position: absolute;
        left: 40%;
        top: 10%;
        width: 0.2em;
        height: 220px;
        margin-right: 1em;
        margin-left: 3.5em;
        background: #0a0a0a;
    }

    .top-right {
        position: absolute;
        left: 47%;
        top: 15%;
    }

    .bottom-card {
        position: absolute;
        height: calc(45% - 10px);
        width: calc(90% - 20px);
        bottom: 10%;
        left: 5.5%;
        top: 47%;
        background-color: rgba(171, 203, 245, 0.4);
        // filter:alpha(Opacity=60);
        // opacity: 0.5 ;
        border-radius: 4px;
        z-index: 0;

        .text {
            position: absolute;
            // z-index: 1;
            color: black;
            margin-left: 2%;
        }
    }

    .item-card {
        background-color: rgba(171, 203, 245, 0.4);
        padding: 10px 30px;
        margin-top: 2%
    }

    .ann-card {
        margin-top: 2%;
        margin-left: -80%;
        margin-right: 10%;
    }

    .item_client_tag {
        margin-bottom: 1.5%;
    }

    .item_title {
        margin-bottom: 1.5%;
    }

    [class*=" el-icon-"],
    [class^=el-icon-] {
        font-family: element-icons !important;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        cursor: pointer;
    }
}
</style>
