<template>
  <div class="student-container">
    <el-card class="box-card">
      <div class="firstrow">
        <div class="letf-items" style="float: left; margin-left:50px; margin-top:10px">
          <el-button class="bulk-deletion" icon="el-icon-delete" type="primary" :disabled="this.sels.length === 0" @click="delStudent" >Bulk Deletion</el-button>
          <el-button class="add-maunally" icon="el-icon-circle-plus-outline" type="primary" @click="addManually" >Add Manually</el-button>
          <el-button @click="upload" class="bulk-upload" icon="el-icon-folder-add" type="primary" >Bulk Upload</el-button>
        </div>
        <div class="right-items" >
          <el-input class="search" placeholder="Please Enter Keywords" clearable v-model="query" @clear="getStudentList" ></el-input>
          <el-button icon="el-icon-search" type="primary" @click="wordSearch(query)"></el-button>
        </div>
      </div>
      <div class="stu-table">
      <perfect-scrollbar class="background-container">
        <el-table  class="student-table" @selection-change="selsChange" :data="students" style="width: 97% ;   font-size:15px;" stripe size="mini"  max-height="555">
          <el-table-column  type="selection" width="70" align="center"></el-table-column>
          <el-table-column  prop="unikey" label="Unikey" width="150" align="center"></el-table-column>
          <el-table-column  prop="sid" label=" SID " width="150" align="center"></el-table-column>
          <el-table-column prop="name" label="Name" width="150" align="center"></el-table-column>
          <el-table-column prop="email" label="Email" align="center"></el-table-column>
          <el-table-column prop="groupId" label="Group_id" align="center" width="200"></el-table-column>
          <el-table-column label="Reset password"  width="150" :formatter="formatter" align="center">
            <template slot-scope="scope">
              <el-button class="reset" type="primary" @click="resetPassword(scope.row.id)">Reset password</el-button>
            </template>
          </el-table-column>
          <el-table-column label="Delete" width="130" :formatter="formatter" align="center">
            <template slot-scope="scope">
              <el-button class="delete" type="danger" size="mini" align="center" @click="deleteStudent(scope.row.id)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </perfect-scrollbar>
      </div> 
      <el-pagination
        style="padding:10px 0; text-align:right"
        class="pagination"
        background
        :current-page="page"
        :page-size="limit"
        :total="total"
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"/>
    </el-card>
  </div>
</template>


<script>
import student from "@/api/student";

export default {
  data() {
    return {
      sels: [],
      page: 2,
      limit: 8,
      total: 0,
      query: "",
      students: [],
    };
  },
  created() {
    this.getStudentList();
  },
  methods: {
    selsChange(sels) {
      this.sels = sels;
    },
    resetPassword(id){
      this.$confirm(
        "This student password will be reset, still continue (New password will be the '123456')?",
        "Confirm",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(() => {
      student.resetPassword(id)
      .then((response) =>{
        this.$message({
          type: "success",
          message: "Reset successfully!",
          });
          this.getStudentList();
      })
      })
    },
    delStudent() {
      var ids = this.sels.map((item) => item.id).join();
      this.$confirm(
        "These students will be deleted fovever, still continue?",
        "Confirm",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(() => {
        student
          .removeStudentBatch(ids)
          .then((response) => {
            this.$message({
              type: "success",
              message: "Delete successfully!",
            });
            this.getStudentList();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Delete Canceled",
            });
          });
      });
    },
    wordSearch(keyword) {
      student.keywordSearchStudent(keyword).then((response) => {
        console.log(response)
        this.students = response.data.Student;
      });
    },
    addManually() {
      this.$router.push({ name: "add" });
    },
    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getPage(this.page);
    },
    getPage(cpage) {
      student.getStudentByPage(cpage).then((response) => {
        this.students = response.data.Student.records;
      });
    },

    getStudentList(page = 1) {
      this.page = page;
      student
        .getStudentList(this.page)
        .then((response) => {
          console.log(response)
          this.getPage(this.page);
          this.total = response.data.students.length;
          this.students = response.data.students;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatter(row) {
      return row.address;
    },
    upload() {
      this.$router.push({ name: "bulkupload" });
    },

    deleteStudent(id) {
      this.$confirm(
        "This student will be deleted fovever, still continue?",
        "Confirm",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(() => {
        student
          .removeStudent(id)
          .then((response) => {
            this.$message({
              type: "success",
              message: "Delete successfully!",
            });
            this.getStudentList();
          })
          .catch(() => {
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

<style lang="scss" scoped>
.student-container {
  padding: 10px;
  height: calc(100vh - 60px);
  box-sizing: border-box;
  display: grid;
  .background-container {
    // height: calc(40vh - 10px);
    box-sizing: border-box;
    padding: 10px 20px 20px;
  }
  .left-items{
    .bulk-deletion {
      border-radius: 4px;
      vertical-align: middle;
      text-align: center;
      padding: 0px;
      line-height: 22px;
      margin-top: 10px;
      margin-left: 40px;
      margin-bottom: 10px;
      margin-right: 10px;
      height: 31px;
      width: 136px;
    }
    .add-maunally {
      border-radius: 4px;
      vertical-align: middle;
      text-align: center;
      padding: 0px;
      line-height: 22px;
      margin-top: 10px;
      margin-right: 10px;
      margin-bottom: 10px;
      height: 31px;
      width: 136px;
    }
    .bulk-upload {
      border-radius: 4px;
      vertical-align: middle;
      text-align: center;
      padding: 0px;
      line-height: 22px;
      margin-bottom: 10px;
      margin-top: 10px;
      height: 31px;
      width: 136px;
    }
  }
    .right-items{
      float: right;
      margin-top:10px;
      margin-right:70px;
    .search {
      border-radius: 4px;
      height: 41px;
      width: 400px;
    }
  }
  .pagination {
    margin-right: 100px;
  }
  .stu-table{
    box-sizing: border-box;
    margin-top:55px;
    padding:15px;
  .reset {
    border-radius: 4px;
    vertical-align: middle;
    text-align: center;
    padding: 0px;
    line-height: 22px;
    margin: 0px;
    margin-top: 5px;
    height: 31px;
    width: 138px;
    margin-right: 20px;
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
    width: 73px;
  }
  }
}
</style>
