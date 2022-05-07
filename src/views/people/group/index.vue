<template>
<div class="group-container">
    <el-card class="box-card">
        <div class="first-row">
            <el-button class="bulk-deletion" icon="el-icon-delete" type="primary" :disabled="this.sels.length === 0" @click="delGroup">Bulk Deletion</el-button>
            <div class="right">
                <el-input class="search" placeholder="Please Enter Keywords" clearable v-model="keyword" @clear="getPageGroupList"></el-input>
                <el-button class="search-button" icon="el-icon-search" type="primary" @click="wordSearch(keyword)"></el-button>
            </div>
        </div>
        <perfect-scrollbar class="background-container">
            <el-table @selection-change="selsChange" class="group-table" :data="tableColumns" style="width: 97%; font-size:15px" stripe size="mini" max-height="555">
                <el-table-column type="selection" width="90" align="center"></el-table-column>
                <el-table-column prop="grid" label="Group_id" width="150" align="center"></el-table-column>
                <el-table-column prop='name' label="Group Memeber" align="center"></el-table-column>
                <el-table-column sortable prop="numOfStudentStr" label="Num of People" width="250" align="center"></el-table-column>
                <el-table-column prop="pre1" label="Prefer1" width="110" align="center"></el-table-column>
                <el-table-column prop="pre2" label="Prefer2" width="110" align="center"></el-table-column>
                <el-table-column prop="pre3" label="Prefer3" width="110" align="center"></el-table-column>
                <el-table-column prop="edit" label="Edit" width="120" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                        <el-button class="edit" type="primary" @click="handleEdit(scope.$index,scope.row)">Edit</el-button>

                        <el-dialog title="Edit" class="edit-dialog" :visible.sync="dialogFormVisible" width='30%' top="200px">
                            <el-form :model="form">
                                <el-form-item style="font:bolder;" label="ID : " :label-width="formLabelWidth">
                                    <span class="form-grid">{{ form.grid }}</span>
                                </el-form-item>
                                <el-form-item label='Group Memeber : ' :label-width="formLabelWidth">
                                    <div v-for="index in 5" :key="index">
                                        <span style="text-align:left;" class="form-member">{{ form.member[index - 1] }}</span>
                                        <i class="el-icon-remove" @click="exitGroupByAdmin(form.member[index - 1],form.stu_id[index - 1],form.id)"></i>
                                    </div>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false" type="danger">Cancel</el-button>
                            </div>
                        </el-dialog>
                    </template>

                </el-table-column>

                <el-table-column prop="delete" label="Delete" width="120" align="center" :formatter="formatter">
                    <template slot-scope="scope">
                        <el-button class="delete" type="danger" @click="deleteGroup(scope.row.grid)">Delete</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </perfect-scrollbar>

        <el-pagination style="padding:10px 0; text-align:right" class="pagination" background :current-page="page" :page-size="limit" :total="total" layout="total, prev, pager, next, jumper" @current-change="handleCurrentChange" />
    </el-card>

</div>
</template>

<script>
import Group from "@/api/group";
export default {
    data() {
        return {
            form: {
                grid:'',
                stu_id: '',
                id: '',
                member: '',
            },
            dialogFormVisible: false,
            sels: [],
            page: 1,
            limit: 8,
            total: 0,
            keyword: "",
            Group: {},
            tableColumns: [],
            formLabelWidth: '200px',
        };

    },
    created() {
        this.getPageGroupList();
    },
    methods: {
        exitGroupByAdmin(item, studentId, groupid) {
            if (studentId != undefined & groupid != undefined) {
                this.$confirm(
                    "This student " + '" ' + item + ' "' + " will be deleted from this group, still continue?",
                    "Confirm", {
                        confirmButtonText: "Confirm",
                        cancelButtonText: "Cancel",
                        type: "warning",
                    }).then(() => {

                    Group.exitGroupByAdmin(studentId, groupid)
                        .then((response) => {
                            this.$message({
                                type: "success",
                                message: "Delete successfully!",
                            });
                            this.dialogFormVisible = false,
                                this.getPageGroupList()
                        })
                        .catch((error) => {
                            console.log(error)
                            this.$message({
                                type: "info",
                                message: "Delete Canceled",
                            });
                        });

                })
            } else {
                this.$notify({
                    title: "Error",
                    message: "You can not delete None student !",
                    type: "error",
                });
                this.dialogFormVisible = true
            }
            
        },
        handleEdit(index, row) {
            console.log(row)
            this.dialogFormVisible = true
            this.form.id = row.id
            this.form.member = row.name
            this.form.member = this.form.member.split(', ')
            this.form.stu_id = row.stu_id
            this.form.stu_id = this.form.stu_id.split(', ')
            this.form.grid = row.grid

        },
        selsChange(sels) {
            this.sels = sels;
        },
        delGroup() {
            var ids = this.sels.map((item) => item.id).join();
            this.$confirm(
                "These group will be deleted fovever, still continue?",
                "Confirm", {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            ).then(() => {
                Group.removeGroupBatch(ids)
                    .then((response) => {
                        this.$message({
                            type: "success",
                            message: "Delete successfully!",
                        });
                        this.getPageGroupList();
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "Delete Canceled",
                        });
                    });
            });
        },
        handleCurrentChange(newPage) {
            this.page = newPage;
            this.getPageGroupList();
        },

        wordSearch(keyword) {
            this.page = 1
            this.getPageGroupList()
        },

        getPageGroupList() {
            let idList = []
            let items = [];
            Group.getPageGroupList(this.keyword, this.page, this.limit)
                .then((response) => {
                    // console.log(response)
                    for (let item of response.data.list) {
                        let name = ''
                        let stu_id = ''
                        for (let i = 0; i < item.studentList.length; i++) {
                            let student = item.studentList[i]
                            if (i == item.studentList.length - 1) {
                                name = name + student.name
                                stu_id = stu_id + student.id

                            } else {
                                name = name + student.name + ' , '
                                stu_id = stu_id + student.id + ', '
                            }
                        }
                        item.stu_id = stu_id
                        item.name = name
                        item.numOfStudentStr = item.studentList.length + ' / 5'
                        item.numOfStudent = item.studentList.length
                        items.push(item)
                    }
                    this.tableColumns = items
                    this.total = response.data.total
                    console.log(this.tableColumns)
                })

        },
        formatter(row) {
            return row.address;
        },

        deleteGroup(id) {
            this.$confirm(
                "This group will be deleted fovever, still continue?",
                "Confirm", {
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    type: "warning",
                }
            ).then(() => {
                Group.removeGroup(id)
                    .then((response) => {
                        this.$message({
                            type: "success",
                            message: "Delete successfully!",
                        });
                        this.getPageGroupList();
                    })
                    .catch((error) => {
                        this.$message({
                            type: "info",
                            message: "Delete Canceled",
                        });
                    });
            });
        },
    },
};
</script>

<style lang="scss">
.group-container {
    padding: 10px;
    height: calc(100vh - 60px);
    box-sizing: border-box;
    display: grid;
    box-sizing: border-box;

    .background-container {
        height: calc(70vh - 10px);
        box-sizing: border-box;
        padding: 10px 20px 20px;
    }

    .box-card {
        .first-row {
            display: fixed;
            padding-left: 40px;
            padding-top: 20px;
            padding-bottom: 50px;

            .bulk-deletion {
                border-radius: 4px;
                vertical-align: middle;
                text-align: center;
                padding: 0px;
                line-height: 22px;
                height: 31px;
                width: 136px;
                margin-left: 20px;
                float: left;
            }

            .right {
                float: right;
                margin-right: 100px;

                .search {
                    border-radius: 4px;
                    height: 41px;
                    width: 400px;
                }

                .search-button {
                    margin-right: 50px;
                    width: 50px;
                }
            }
        }

        .group-table {
            margin-top: 10px;
            margin-left: 20px;
            margin-right: 5px;
            margin-bottom: 5px;

            .edit {
                border-radius: 4px;
                vertical-align: middle;
                text-align: center;
                padding: 0px;
                line-height: 22px;
                margin: 0px;
                margin-top: 5px;
                height: 31px;
                width: 100px;
            }

            .delete {
                border-radius: 4px;
                vertical-align: middle;
                text-align: center;
                padding: 0px;
                line-height: 22px;
                margin: 0px;
                margin-top: 5px;
                height: 31px;
                width: 100px;
            }

        }

        .form-grid {
            margin-left: -75%;
        }

        .form-member {
            margin-left: -65%;
        }
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
        padding: 0% 4%;
    }

    .el-icon-remove {
        position: absolute;
        left: 70%;
        margin-top: 15px;
        cursor: pointer;
    }

    .el-form-item__label {
        /* text-align: right; */
        /* vertical-align: middle; */
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0% 4%;
        font-weight: bold;
    }

    .el-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
        font-weight: bolder;
    }
}
</style>
