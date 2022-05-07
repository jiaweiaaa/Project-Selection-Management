<template>
<div class="project-upload-container">
    <el-card class="box-card">
        <perfect-scrollbar class="background-container">
            <el-form class="form" :label-position="labelPosition" :rules="rules" :model="project" ref="project" size="mini" :inline="true">
                <div>
                    <b>
                        <el-form-item class="title1" label="Title :" prop="title" label-width="80px ">
                            <el-input class="title2" v-model="project.title" />
                        </el-form-item>
                    </b>
                </div>
                <div class="first-row">
                    <b>
                        <el-form-item class="client1" label="Project Client / Supervisor : " prop="client" label-width="220px" style="   y: sans-serif">
                            <el-input class="client2" v-model="project.client" />
                        </el-form-item>
                    </b>
                    <b>
                        <el-form-item class="email" label="Client Email : " prop="email" label-width="220px" st>
                            <el-input class="email2" v-model="project.email" />
                        </el-form-item>
                    </b>
                </div>
                <div class="second-row">
                    <b>
                        <el-form-item class="type1" label="Type : " prop="type" label-width="80px">
                            <el-select v-model="project.type" placeholder="Type">
                                <el-option selected="selected" label="SoftWare Development" value="SoftWare Development"></el-option>
                                <el-option label="Information System" value="Information System"></el-option>
                                <el-option label="Data Science" value="Data Science"></el-option>
                                <el-option label="Security" value="Security"></el-option>
                            </el-select>
                        </el-form-item>
                    </b>
                    <b>
                        <el-form-item class="unit1" label="Accepted Units : " prop="unit" label-width="150px">
                            <el-select class="unit2" v-model="project.unit" placeholder="Class Unit">
                                <el-option selected="selected" label="COMP5703/DATA5703" value="COMP5703/DATA5703"></el-option>
                                <el-option label="COMP5709" value="COMP5709"></el-option>
                                <el-option label="DATA5709" value="DATA5709"></el-option>
                            </el-select>
                        </el-form-item>
                    </b>
                    <b>
                        <el-form-item class="num1" label="Number of groups : " prop="groupnum" label-width="185px">
                            <el-select class="num2" v-model="project.num">
                                <el-option selected="selected" label="1" value="1"></el-option>
                                <el-option label="2" value="2"></el-option>
                                <el-option label="3" value="3"></el-option>
                                <el-option label="4" value="4"></el-option>
                                <el-option label="5" value="5"></el-option>
                                <el-option label="6" value="6"></el-option>
                                <el-option label="7" value="7"></el-option>
                                <el-option label="8" value="8"></el-option>
                                <el-option label="9" value="9"></el-option>
                                <el-option label="10" value="10"></el-option>
                            </el-select>
                        </el-form-item>
                    </b>
                    <b>
                        <el-form-item class="id1" label="ID : " prop="id" label-width="60px">
                            <span>CS </span>
                            <el-input class="id2" v-model="project.id" />
                        </el-form-item>
                    </b>
                </div>

                <div class="thrid-row">
                    <b>
                        <el-form-item class="skill1" label="Required Skill :  " prop="skills" label-width="220px">
                            <el-input type="textarea" class="skill2" v-model="project.skills" :rows="1" style=" ; height:30px" />
                        </el-form-item>
                    </b>
                </div>

                <div class="forth-row">
                    <b>
                        <el-form-item class="text" label="Details :  " prop="details" label-width="220px">
                            <tinymce :height="400" :width="1062" type="textarea" v-model="project.details" />
                        </el-form-item>
                    </b>
                </div>

                <div class="fifth-row">
                    <b>
                        <el-form-item class="ano1" label="Annotation : " prop="annotation" label-width="220px">
                            <el-input class="ano2" type="textarea" v-model="project.annotation" :rows="1" />
                        </el-form-item>
                    </b>
                </div>

                <div class="button">
                    <el-button class="cancel" type="danger">Cancel</el-button>
                    <el-button class="confirm" type="primary" :disabled="saveBtnDisabled" @click="addProject">Confirm</el-button>
                </div>
            </el-form>
        </perfect-scrollbar>
    </el-card>
</div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import project from "@/api/project";
export default {
    data() {

        return {
            timer: null,
            value: [],
            saveBtnDisabled: false,
            labelPosition: "top",
            textarea: "",
            project: {
                title: "",
                client: "",
                type: '',
                unit: "",
                num: "",
                details: '',
                email: "",
                id: "",
                skills: "",
                annotation: "",
            },
            project_id: [],
            rules: {
                title: [{
                    required: true,
                    message: "Please enter the title",
                    trigger: "blur",
                }, ],
                client: [{
                    required: true,
                    message: "Please choose the client",
                    trigger: "blur",
                }, ],
                email: [{
                    required: true,
                    message: "Please fill in with client email",
                    trigger: "blur",
                }, ],
                groupnum: [{
                    required: true,
                    message: "Please choose group number",
                    trigger: "blur",
                }, ],
            },
        };
    },
    components: {
        Tinymce,
    },
    created() {
        this.getAllProject();
    },
    methods: {
        addProject() {
            if (this.project.client != '') {
                if (this.project.email != '') {
                    if (this.project.title != '') {
                        if (this.project.id != '') {
                            let result = this.project_id.includes(this.project.id)
                            if (result == false) {
                                console.log(this.project.num)
                                if (this.project.num != '') {
                                    project.saveProject(this.project)
                                        .then((response) => {
                                            this.$message({
                                                type: "success",
                                                message: "Add successfully !",
                                            });
                                            this.$router.push({
                                                path: "/project/list"
                                            });
                                        })
                                } else {
                                    this.timer = window.setTimeout(() => {
                                        this.$notify({
                                            title: "Error",
                                            type: "error",
                                            message: "Project need to choose group number!",
                                        });
                                    }, 0)
                                }

                            } else {
                                this.timer = window.setTimeout(() => {
                                    this.$notify({
                                        title: "Error",
                                        type: "error",
                                        message: "Project ID is already exist!",
                                    });
                                }, 0)
                            }
                        } else {
                            this.timer = window.setTimeout(() => {
                                this.$notify({
                                    title: "Error",
                                    type: "error",
                                    message: "Project ID can not be empty !",
                                });
                            }, 0)
                        }
                    } else {
                        this.timer = window.setTimeout(() => {
                            this.$notify({
                                title: "Error",
                                type: "error",
                                message: "Project title can not be empty !",
                            });
                        }, 0)
                    }
                } else {
                    this.timer = window.setTimeout(() => {
                        this.$notify({
                            title: "Error",
                            type: "error",
                            message: "Client email can not be empty !",
                        });
                    }, 0)
                }
            } else {
                this.timer = window.setTimeout(() => {
                    this.$notify({
                        title: "Error",
                        type: "error",
                        message: "Client information can not be empty !",
                    });
                }, 0)
            }
        },
        getAllProject() {
            let project_id = []
            project
                .getAllProject()
                .then((response) => {
                    for (let i = 0; i < response.data.Project.length; i++) {
                        // console.log(response.data.Project[i].id)
                        project_id.push(response.data.Project[i].id)
                    }
                    this.project_id = project_id
                })
        },
    }
}
</script>

<style lang="scss">
.project-upload-container {
    padding: 10px;
    height: calc(100vh - 70px);
    box-sizing: border-box;

    display: grid;

    .background-container {
        height: calc(85vh - 100px);
        padding: 2% 2% 20px 20px;
    }

    .box-card {
        display: block;
        margin-top: 15px;
        margin-left: 17px;
        margin-right: 15px;
    }

    .editor-custom-btn-container {
        display: none;
    }

    .form {
        padding: 40px 120px;
        height: 610px;

        .el-textarea__inner {
            font-size: 17px;
        }

        .el-input__inner {
            font-size: 17px;
            border-radius: 0px;
            border-bottom-width: 1px;
            border-left-width: 0px;
            border-right-width: 0px;
            border-top-width: 0px;
        }

        .title2 {
            border-top-width: 0px;
            border-right-width: 0px;
            border-left-width: 0px;
            border-bottom-width: 1px;
            height: 25px;
            width: 1000px;
            margin-right: 40px;
            margin-bottom: 20px;
        }

        .client2 {
            border-top-width: 0px;
            border-right-width: 0px;
            border-left-width: 0px;
            border-bottom-width: 1px;
            height: 25px;
            width: 400px;
            margin-right: 120px;
            margin-bottom: 20px;
        }

        .email2 {
            border-top-width: 0px;
            border-right-width: 0px;
            border-left-width: 0px;
            border-bottom-width: 1px;
            height: 25px;
            width: 400px;
            margin-bottom: 20px;
        }

        .id1 {
            margin-top: 10px;
        }

        .id2 {
            border-top-width: 0px;
            border-right-width: 0px;
            border-left-width: 0px;
            border-bottom-width: 1px;
            border-radius: 0px;
            margin-left: 10px;
            height: 20px;
            width: 80px;
        }

        .type1 {
            margin-top: 10px;
            margin-right: 50px;
        }

        .unit1 {
            margin-top: 10px;
            margin-right: 60px;
            width: 200px;
        }

        .unit2 {
            width: 210px;
        }

        .num1 {
            margin-top: 10px;
            margin-right: 80px;
            width: 200px;
        }

        .num2 {
            margin-right: 100px;
            width: 225px;
        }

        .el-form-item--mini .el-form-item__content,
        .el-form-item--mini .el-form-item__label {
            line-height: inherit;
        }

        .skill2 {
            width: 1060px;
        }

        .ano2 {
            width: 1060px;
        }

        .button {
            position: relative;

            .confirm {
                border-radius: 4px;
                position: absolute;
                vertical-align: middle;
                text-align: center;
                padding: 0px;
                line-height: 22px;
                height: 31px;
                width: 73px;
                margin-left: 980px;
            }

            .cancel {
                border-radius: 4px;
                position: absolute;
                vertical-align: middle;
                text-align: center;
                padding: 0px;
                line-height: 22px;
                height: 31px;
                width: 73px;
                margin-right: 50px;
                margin-left: 800px;
            }
        }
    }
}
</style>
