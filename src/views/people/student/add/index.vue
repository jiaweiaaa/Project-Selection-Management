<template>
<div class="add-container">
    <el-card class="box-card">
        <div class="form">
            <el-form :model="student" :rules="rules" ref="student">
                <div class="firstrow">
                    <b>
                        <el-form-item class="sid" label="SID :" prop="sid" label-width="100px " >
                            <el-input class="id2" v-model="student.sid" style="     width: 300px; " />
                        </el-form-item>
                    </b>
                </div>
                <div class="secondrow">
                    <b>
                        <el-form-item class="name" label="Name :" prop="name" label-width="100px " >
                            <el-input class="name2" v-model="student.name" style="    width: 300px; " />
                        </el-form-item>
                    </b>
                </div>
                <div class="thirdrow">
                  <b>
                        <el-form-item class="unikey" label="Unikey :" prop="unikey" label-width="100px " >
                            <el-input class="unikey2" v-model="student.unikey" style="    width: 300px; " />
                        </el-form-item>
                    </b>
                </div>
                <div class="forthrow">
                    <b>
                        <el-form-item class="email" label="Email :" prop="email" label-width="100px " >
                            <el-input class="email2" v-model="student.email" style="    width: 300px; " />
                        </el-form-item>
                    </b>
                </div>
                <div class="fifthrow">
                    <b>
                        <el-form-item class="password" label="Password :" prop="password" label-width="100px " >
                            <el-input class="password2" v-model="student.password"  autocomplete="off"  style="    width: 300px; " />
                        </el-form-item>
                    </b>
                </div>
            </el-form>
            <div class="button">
                <el-button class="confirm" type="primary" @click="addStudent">Confirm</el-button>
                <el-button class="Cancel" type="danger">Cancel</el-button>
            </div>
        </div>
    </el-card>
</div>
</template>

<script>
import student from "@/api/student";

export default {
    data() {
        return {
            student: {
                sid: "",
                name: "",
                email: "",
                password: "",
                unikey:''
            },
            rules: {
                sid: [{
                    required: true,
                    message: "Please fill in with student id !",
                    trigger: "blur",
                }, ],
                name: [{
                    required: true,
                    message: "Please fill in with student name !",
                    trigger: "blur",
                }, ],
                unikey: [{
                    required: true,
                    message: "Please fill in with student unikey !",
                    trigger: "blur",
                }, ],
                email: [{
                    required: true,
                    message: "Please fill in with student email !",
                    trigger: "blur",
                }, ],
                password: [{
                    required: true,
                    message: "Please fill in with student default password !",
                    trigger: "blur",
                }, ],
            },
        };
    },
    methods: {
        addStudent() {
            if (this.student.sid != '') {
                if (this.student.name != '') {
                  if(this.student.unikey !=''){
                    if (this.student.email != '') {
                        if (this.student.password != '') {
                            student.addStudent(this.student).then((response) => {
                                this.$message({
                                    type: "success",
                                    message: "Add successfully !",
                                });
                                this.$router.push({
                                    name: "StudentManagement"
                                });
                            });
                        } else {
                            this.$notify({
                                title: "Error",
                                message: "Student password can not be empty !",
                                type: "error",
                            });
                        }
                    } else {
                        this.$notify({
                            title: "Error",
                            message: "Student email can not be empty !",
                            type: "error",
                        });
                    }
                  }else{
                    this.$notify({
                            title: "Error",
                            message: "Student Unikey can not be empty !",
                            type: "error",
                        });
                  }
                } else {
                    this.$notify({
                        title: "Error",
                        message: "Student name can not be empty !",
                        type: "error",
                    });
                }
            } else {
                this.$notify({
                    title: "Error",
                    message: "Student sid can not be empty !",
                    type: "error",
                });
            }
        },
    },
};
</script>

<style lang="scss">
.add-container {
    position: relative;
    padding: 20px;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    display: grid;

    .box-card {
        padding: 70px 500px;

        .el-form-item__error {
            color: #F56C6C;
            font-size: 12px;
            line-height: 1;
            padding-top: 4px;
            position: absolute;
            top: 100%;
            left: 0;
            width: 300px;
        }

        .form {
            display: fixed;

            .el-form-item__error {
                margin-top: 2px;
                margin-left: 20px;
            }

            .id {
                margin-bottom: 30px;
            }

            .id2 {
                margin-left: 20px;
                margin-bottom: 5px;
            }

            .secondrow {
                margin-top: 45px;
            }

            .thirdrow {
                margin-top: 45px;
            }

            .forthrow {
                margin-top: 45px;
            }
            .fifthrow{
              margin-top: 45px;
                margin-bottom: 60px;
            }

            .password2 {
                margin-left: 20px;
                margin-bottom: 5px;
            }
            .unikey2{
                margin-left: 20px;
                margin-bottom: 5px;
            }

            .name2 {
                margin-left: 20px;
                margin-bottom: 5px;
            }

            .email2 {
                margin-left: 20px;
                margin-bottom: 5px;
            }

            .groupid {
                margin-left: 20px;
            }

            .confirm {
                border-radius: 4px;
                position: absolute;
                vertical-align: middle;
                text-align: center;
                padding: 0px;
                line-height: 22px;
                height: 31px;
                width: 73px;
                margin-left: 220px;
            }

            .Cancel {
                border-radius: 4px;
                position: absolute;
                vertical-align: middle;
                text-align: center;
                padding: 0px;
                line-height: 22px;
                height: 31px;
                width: 73px;
                margin-right: 50px;
                margin-left: 345px;
            }
        }
    }
}
</style>
