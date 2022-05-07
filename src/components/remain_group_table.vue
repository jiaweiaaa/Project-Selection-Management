<template>
<el-table :data="tableData" :cell-style="rowClass" :height="508" :header-cell-style="headerClass">
    <el-table-column prop="grid" label="ID" width="113">
    </el-table-column>
    <el-table-column prop="count" label="count" width="113">
    </el-table-column>
    <el-table-column prop="studentsStr" label="students" width="200">
    </el-table-column>
</el-table>
</template>

  
<script>
import remain_group from '@/api/remain_group'
export default {
    data() {
        return {
            tableData: []
        }
    },
    created() {
        this.getUnallocatedGroup()
    },
    methods: {
        getUnallocatedGroup() {
            remain_group.getUnallocatedGroup().then(response => {
                let groupList = response.data.unallocatedGroupVos
                let formatedGroup = []
                for (let group of groupList) {
                  group.count = group.studentList.length
                  formatedGroup.push(group)
                  
                  let studentsStr = ''

                  if (group.studentList && group.studentList.length > 0) {
                      for (let student of group.studentList) {
                        studentsStr = studentsStr + student.name + ', '
                      }
                      studentsStr = studentsStr.slice(0, studentsStr.length - 2)
                  } else {
                      studentsStr = '-'
                  }
                  group.studentsStr = studentsStr
                }
                this.tableData = formatedGroup
                console.log(this.tableData)
            })
        },
        rowClass() {
            return "text-align: center;color:#7787A7;";
        },
        headerClass() {
            return "text-align: center;color:#7787A7;";
        }
    }
}
</script>

  
<style lang="scss">
.el-table {
    width: 100%;
}

.el-table-column {
    text-align: center;
}
</style>
