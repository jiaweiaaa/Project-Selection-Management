<template>
<div class="project-allocation-container">
    <div class="table_container">
        <div class="table_R">
            <project_result_table></project_result_table>
        </div>
        <div class="download">
            <el-button icon="el-icon-download" circle @click="exportExcel()"></el-button>

        </div>
    </div>
    <el-dialog title="Import" :visible.sync="dialogFormVisible" width="30%" height="30%">
        <el-form :model="form">
            <el-form-item label="Import as:" :label-width="formLabelWidth">
                <el-select v-model="form.import_form" placeholder="Select file format">
                    <el-option label="excel" value="excel"></el-option>
                    <el-option label="doxc" value="doxc"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="background:#FFFFFF;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" pain @click="dialogFormVisible = false; exportExcel()">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import project_result_table from '@/components/project_result_table.vue'
import result from '@/api/result'
export default {
    name: 'ProjectResult',
    components: {
        project_result_table

    },
    data() {
        return {
            dialogFormVisible: false,
            form: {
                import_form: '',
                date1: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },

            tableData: [],

        }
    },
    created() {

        this.getAllResult()
    },
    methods: {
        getAllResult() {
            result.getAllResult().then(response => {
                console.log(response)
                this.tableData = response.data.resultList
            })
        },
        exportExcel() {
            let allcolumns = this.tableData
            var newcolumns = []
            for (let re of allcolumns) {
                var students = ''
                for (let student of re.studentList) {
                    students += (student.name + ',')
                }
                newcolumns.push({
                    id: re.id,
                    grid: re.grid,
                    finalId: re.finalId,
                    projectTitle: re.projectTitle,
                    student: students,
                    projectClient: re.projectClient,
                    projectEmail: re.projectEmail
                })

            }

            require.ensure([], () => {
                const {
                    export_json_to_excel
                } = require('../../../excel/Export2Excel.js');
                const tHeader = ['Group ID','Project ID', 'Project Name', 'Students', 'Client name','Client Email'];
                // 上面设置Excel的表格第一行的标题
                const filterVal = ['grid', 'finalId','projectTitle', 'student', 'projectClient','projectEmail'];
                // 上面的index、nickName、name是tableData里对象的属性
                const list = newcolumns; //把data里的tableData存到list
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, 'project_result_table');
            })
        },

        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]))
        }
    }

};
</script>

<style lang="scss" scoped>
.project-allocation-container {
    width: 1156px;
    height: 702px;
    font-size: 14px;
    margin: 0 auto;
}

.project-allocation-container .table_container {
    width: 1128px;
    height: 685px;
    margin: 25px 20px;
    border-radius: 6px;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%), 0 0 5px 0 rgb(0 0 0 / 4%);
}

.project-allocation-container .table_container .table_R {
    width: 1128px;
    height: 610px;
}

.download {
    width: 1128px;
    height: 70px;

    .el-button {
        float: right;
        margin: 20px 51px 0 0;
    }
}
</style>
