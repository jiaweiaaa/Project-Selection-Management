<template>
  <div class="project-detail-container">
    <el-card class="box-card">
      <div class="token"><b>Project Details View</b></div>
      <el-card class="detail-card">
        <perfect-scrollbar class="background-container">
          <div class="detail-display">
            <div class="title">
              <span class="p-title"> <b> Title :</b> </span>
              <input :disabled="true" class="title2" v-model="project.title" style=" border-width: 0px; width:700px; background-color: #F7F7F7;"/>
            </div>
            <div class="first-row">
              <span class="p-id"> <b>Project ID : </b></span>
              <input :disabled="true" class="id" v-model="project.id" style=" border-width: 0px; width:50px; background-color: #F7F7F7;"/>
              <span class="p-client"> <b>Project Client/Supervisor : </b></span>
              <input :disabled="true" class="client" v-model="project.client" style=" border-width: 0px; width:150px; background-color: #F7F7F7;"/>
              <span class="p-email"> <b> Email :</b> </span>
              <input :disabled="true" class="title" v-model="project.email" style=" border-width: 0px; width:200px; background-color: #F7F7F7;"/>             
            </div>

            <div class="second-row">
              <span class="type"><b>Project Type :</b> </span>
              <input :disabled="true" v-model="project.type" style="  border-width: 0px;  width:173px; background-color: #F7F7F7;"/>
              <span class="unit"><b>Accept Units : </b> </span>
              <input :disabled="true" v-model="project.unit" style=" border-width: 0px;  width:200px; background-color: #F7F7F7;"/>
              <span class="num"><b>Number of groups :</b></span>
              <input :disabled="true" v-model="project.groupnum" style=" border-width: 0px; width:80px; background-color: #F7F7F7;"/>
            </div>

            <div class="third-row">
              <span class="skill"><b>Required Skills :</b></span>
            </div>

            <div class="forth-row">
              <!-- <input :disabled="true" v-model="project.skills" style="  border-width: 0px;  width: 1165px; background-color: #F7F7F7;"/> -->
              {{project.skills}}
            </div>

            <div class="fifth-row">
              <span><b>Details :</b></span>
            </div>

            <div class="six-row">
              <!-- <textarea :disabled="true" v-html="project.details" style="  border-width: 0px; height: 350px; width:900px; background-color: #F7F7F7;"></textarea> -->
              <p style="border-width: 0px; height: 350px; width:900px; background-color: #F7F7F7; " v-html="project.details"></p>
              <!-- {{project.details}} -->
            </div>

            <div class="seven-row">
              <b>Annotation :</b>
            </div>

            <div class="eight-row">
              <!-- <input :disabled="true" style="    border-width: 0px; width: 1165px; background-color: #F7F7F7;"/> -->
              {{project.annotation}}
            </div>

            <div class="button">
              <el-button class="Edit" type="primary" @click="editPage">Edit</el-button>
              <el-button class="Delete" type="danger" @click="deleteProject">Delete</el-button>
            </div>
          </div>
        </perfect-scrollbar>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import project from "@/api/project";

export default {
  data() {
    return {
      project: {
        id: "",
        title: "",
        client: "",
        type: "",
        unit: "",
        email:'',
        groupnum: "",
        skills: "",
        details: "",
        annotation: "",
      },
    };
  },
  created() {
    if (this.$route.query.id) {
      const id = this.$route.query.id;
      this.updateProject(id);
    }
  },
  methods: {
    editPage() {
      let id = this.$route.query.id;
      console.log(this.$route.query.id);
      this.$router.push({
        name: "ProjectEdit",
        query: {
          id: id,
        },
      });
    },
    updateProject(id) {
      project.getProjectById(id).then((response) => {
        this.project = response.data.project;
      });
    },
    deleteProject() {
      let id = this.$route.query.id;
      console.log(this.$route.query.id);
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
            this.$router.push({ name: "ProjectList" });
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
.project-detail-container {
  padding: 15px;
  height: calc(100vh - 70px);
  box-sizing: border-box;
  display: grid;
  .background-container {
    height: calc(85vh - 150px);
    padding: 20px 200px 15px 100px;
  }
  .token {
    font-size: 20px;
         
    color: #d8d8d8;
    margin-left: 10px;
    margin-top: -40px;
    margin-bottom: 15px;
  }
  .box-card {
    padding: 40px;
  }
  .detail-card {
    background-color: #f7f7f7;
  }
  .detail-display {
    font-size: 17px;
    padding:20px;

    .second-row {
      margin-bottom: 20px;
    }
    .third-row {
      margin-bottom: 10px;
    }
    .forth-row {
      margin-bottom: 20px;
    }
    .fifth-row {
      margin-bottom: 20px;
    }
    .six-row {
      margin-bottom: 20px;
    }
    .eight-row {
      margin-bottom: 35px;
    }
    .id {
      margin-left: 30px;
    }
    .p-client {
      margin-right: 10px;
      margin-left: 20px;
    }
    .p-title {
      margin-right: 30px;
    }
    .title{
      margin-right: 10x;
      margin-bottom: 10px;
    }
    .type {
      margin-right: 10px;
    }
    .unit {
      margin-right: 10px;
      margin-left: 15px;
    }
    .num {
      margin-right: 10px;
    }
  }
  .button{
    padding:40px;
    float:right;
    .Edit {
      border-radius: 4px;
      vertical-align: middle;
      text-align: center;
      padding: 0px;
      line-height: 22px;
      height: 31px;
      width: 73px;
      margin-right:40px
    }
    .Delete {
      border-radius: 4px;
      vertical-align: middle;
      text-align: center;
      padding: 0px;
      line-height: 22px;
      height: 31px;
      width: 73px;
    }
  }
}
</style>
