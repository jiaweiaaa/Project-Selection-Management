<template>
  <div class="project-list-container">
    <el-card class="box-card" style="position:reletive">
      <div class="Search">
      <el-input class="search" placeholder="Please Enter Keywords" clearable v-model="query" @clear="getAllProject"></el-input>
      <el-button icon="el-icon-search" type="primary" @click="wordSearch(query)"></el-button>
      </div>
      <perfect-scrollbar class="background-container">
        <el-table @cell-click="handle" style="font-size:15px" class="project-table" @selection-change="selsChange" :data="Project" stripe max-height="580" size="mini">
          <el-table-column fixed prop="id" label=" Project ID" width="120" align="center"></el-table-column>
          <el-table-column fixed prop="title" label=" Project Title" align="center"></el-table-column>
          <el-table-column fixed prop="unit" label="Accept Units" width="150" align="center"></el-table-column>
          <el-table-column fixed prop="type" label="Project Type" width="150" align="center"></el-table-column>
          <el-table-column fixed prop="edit" label="Edit" width="120" align="center" :formatter="formatter">
            <template slot-scope="scope">
              <router-link :to="{path: '/project/list/edit', query: { id: scope.row.id },}">
                <el-button class="edit" size="mini" type="primary" align="center">Edit</el-button>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column fixed prop="delete" label="Delete" width="120" align="center" :formatter="formatter">
            <template slot-scope="scope">
              <el-button class="delete" type="danger" size="mini" align="center" @click="deleteProject(scope.row.id)">Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
      </perfect-scrollbar>
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
import project from "@/api/project";

export default {
  data() {
    return {
      page: 1,
      limit: 6,
      total: 0,
      query: "",
      Project: [],
    };
  },
  created() {
    this.getAllProject();
  },
  methods: {
    selsChange(sels) {
      this.sels = sels;
    },
    wordSearch(keyword) {
      project.keywordSearch(keyword).then((response) => {
        // console.log(response.data.project)
        this.Project = response.data.project;
        // console.log(this.Project)
      });
    },

    handleCurrentChange(newPage) {
      this.page = newPage;
      this.getPage(this.page);
    },

    handle(row, column, cell, event) {
      if (column.property === "edit") {
        this.$router.push({
          path: "/project/list/edit",
          query: { id: row.id },
        });
      } else {
        if (column.property !== "delete") {
          console.log(column.property);
          this.$router.push({
            path: "/project/list/detail",
            query: { id: row.id },
          });
        }
      }
    },
    getPage(cpage) {
      project.getByPage(cpage).then((response) => {
        this.Project = response.data.project.records;
      });
    },
    getAllProject(page = 1) {
      this.page = page;
      project
        .getAllProject(this.page)
        .then((response) => {
          this.getPage(this.page);
          this.total = response.data.Project.length;
          this.Project = response.data.Project;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    formatter(row) {
      return row.address;
    },

    deleteProject(id) {
      this.$confirm(
        "This project will be deleted fovever, still continue?",
        "Confirm",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      ).then(() => {
        project
          .removeProject(id)
          .then((response) => {
            this.$message({
              type: "success",
              message: "Delete successfully!",
            });
            this.getAllProject();
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
.project-list-container {
  padding: 20px;
  height: calc(100vh - 70px);
  box-sizing: border-box;

       
  display: grid;
  position: relative;

  .background-container {
    height: calc(85vh - 150px);
    padding: 30px 20px 20px;
  }
  .search {
    border-radius: 4px;
    height: 41px;
    width: 400px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 30px;
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

  .edit {
    border-radius: 4px;
    vertical-align: middle;
    text-align: center;
    padding: 0px;
    line-height: 22px;
    margin: 0px;
    margin-top: 5px;
    height: 31px;
    width: 73px;
    margin-right: 5px;
  }
  .pagination {
    position: absolute;
    margin-top: -40px;
    right: 80px;
  }
}
</style>
