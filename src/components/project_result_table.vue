<template>
  <div class="pad">
    <el-table
      :data="tableData"
      :cell-style="rowClass"
      :header-cell-style="headerClass"
      height="585"
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="grid"
        label="Group ID"
        width="110">
      </el-table-column>
      <el-table-column
        prop="finalId"
        label="Project ID"
        width="90">
      </el-table-column>
      <el-table-column
        prop="projectTitle"
        label="Project Name"
        width="180">
      </el-table-column>
      <el-table-column
        label="Group Information">
        <template slot-scope="scope">
          <span style="width:100px; height:30px; float:left" v-for="(student, index) in scope.row.studentList" :key="index">{{ student.name }}</span>
        </template>
      </el-table-column>
      

      <el-table-column
        prop="projectClient"
        label="Client information"
        >
          <template slot-scope="scope">
            <p>Name: {{ scope.row.projectClient }}</p>
            <p>Email: {{ scope.row.projectEmail }}</p>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import result from '@/api/result'
  export default {
    data() {
      return {
        tableData: [],
      }
    },
    created() {
        //this.getAllUser()
        this.getAllResult()
    },
    methods: {
      getAllResult() {
            result.getAllResult().then( response => {
                console.log(response)
                this.tableData = response.data.resultList
            })
        },
    rowClass() { 
            return " color:#7787A7; height:50px;";
             },
        headerClass() { 
            return " color:#7787A7;font-size:20px;";
             }
        } 
  }
</script>

<style scoped>
.pad{
  width:1036px;
  height:590px;
  padding:9px 0 0 31px
}


</style>