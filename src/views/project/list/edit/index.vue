<template>
  <div class="project-edit-container">
    <el-card class="box-card">
      <div class="token"><b>Project Details View</b></div>
      <el-card class="detail-card">
        <perfect-scrollbar class="background-container">
          <el-form class="form" :label-position="labelPosition" :model="project" ref="project" size="mini" :inline="true">
          <div class="detail-display">
             <div class="title">
              <b><el-form-item  class="p-title" label="Title : "  prop="title" >
                  <el-input class="title" v-model="project.title" style="width:850px" /> </el-form-item></b>
            </div>
            <div class="first-row">
              <b><el-form-item class="p-id" label="Project ID : "  prop="id">
                  <el-input :disabled="true" class="id" v-model="project.id" style=" border-width:0px; width:50px; " /> </el-form-item></b>
              <b><el-form-item  class="p-client" label="Project Client/Supervisor : "  prop="client" >
                  <el-input class="client" v-model="project.client" style="width:200px"  /> </el-form-item></b>
              <b><el-form-item  class="p-email" label="Project Email: "  prop="email" >
                  <el-input class="email" v-model="project.email" style="width:250px" /> </el-form-item></b>
            </div>
           
            <div class="second-row">
              <b><el-form-item class="type" label="Project Type : "  prop="type"  >
                <el-select class="type2" v-model="project.type" style="width:200px" >
                  <el-option selected="selected" label="SoftWare Development" value="SoftWare Development"></el-option>
                  <el-option label="Information System" value="Information System"></el-option>
                  <el-option label="Data Science" value="Data Science"></el-option>
                  <el-option label="Security" value="Security"></el-option>
                </el-select> 
              </el-form-item></b>
              <b><el-form-item class="unit" label="Accept Units : "  prop="unit"  >
                <el-select class="unit2" v-model="project.unit"  style="width:200px" >
                  <el-option selected="selected"  label="COMP5703" value="COMP5703"></el-option>
                  <el-option label="COMP5709" value="COMP5709"></el-option>
                  <el-option label="DATA5703" value="DATA5703"></el-option>
                  <el-option label="DATA5709" value="DATA5709"></el-option>
                </el-select> 
              </el-form-item></b>
              <b><el-form-item class="num" label="Number of groups : "  prop="num"  >
                <el-select class="num2" v-model="project.groupnum"  style="width:120px" >
                  <el-option selected="selected"  label="1" value="1"></el-option>
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
              </el-form-item></b>
            </div>
            <div class="third-row">
              <b><el-form-item class="skill1" label="Required Skill :  "  prop="skills">
                <el-input  type="textarea"  class="skill2" v-model="project.skills" :rows="1" style=" width:700px;" /> </el-form-item></b>
            </div>
            <div class="forth-row">
              <b><el-form-item  class="text" label="Details :  "  prop="details"   >
                  <tinymce :height="400"  :width="1062" type="textarea" v-model="project.details"/> 
              </el-form-item></b> 
            </div> 
          
                    
            <div class="seven-row">
              <b><el-form-item  class="ano1" label="Annotation : " prop="annotation"  >
                <el-input class="ano2" type="textarea"   v-model="project.annotation" :rows="1" style=" width:1060px;"/> 
            </el-form-item></b>
            </div>
            <div class="button">
              <el-button class="Edit" type="primary" @click="updateProjectInfo">Confirm</el-button>
              <el-button class="Cancel" type="danger" @click="cancel">Cancel</el-button>
            </div>
            </div>
          </el-form>
        </perfect-scrollbar>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import project from "@/api/project";
import Tinymce from "@/components/Tinymce";

export default {
  data() {
    return {
      labelPosition: "left",
      project: {
        id: "",
        title: "",
        client: "",
        type: "",
        unit: "",
        groupnum: "",
        skills: "",
        emial:'',
        details: "",
        annotation: "",
      },
    };
  },
  components: {
    Tinymce,
  },
  created() {
    if (this.$route.query.id) {
      const id = this.$route.query.id;
      this.showProject(id);
    }
  },
  methods: {
    
    updateProjectInfo() {
      if (this.$route.query.id) {
        project.updateProject(this.project).then((response) => {
          this.$message({
            type: "success",
            message: "Update Successfully!",
          });
          this.$router.push({ path: "/project/list" });
        });
      }
    },
    cancel() {
      this.$router.push({ path: "/project/list" });
    },
    showProject(id) {
      project.getProjectById(id).then((response) => {
        this.project = response.data.project;
      });
    },
  },
};
</script>

<style lang="scss">
.project-edit-container {
  padding: 15px;
  height: calc(100vh - 70px);
  box-sizing: border-box;
  display: grid;
  .background-container {
    height: calc(85vh - 150px);
    padding: 20px 200px 15px 100px;
  }
  
    .editor-custom-btn-container {
        display: none;
    }
  .token {
    font-size: 20px;
         
    color: #d8d8d8;
    margin-left: 10px;
    margin-top: -40px;
    margin-bottom: 15px;
  }
  .el-input.is-disabled .el-input__inner {
      background-color: #F5F7FA;
      border-color: #E4E7ED;
      color: black;
      cursor: not-allowed;
      border-bottom-width: 0px;
  }
  .el-input__inner {
      font-size: 17px;
      background-color: #f7f7f7;
      color: black;
      border-radius: 0px;
      border-bottom-width: 1px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-top-width: 0px;
    }
    .el-textarea__inner {
      font-size: 15px;
      background-color: #f7f7f7;
      color: black;
      border-radius: 0px;
      border-bottom-width: 1px;
      border-left-width: 0px;
      border-right-width: 0px;
      border-top-width: 0px;
  }
  .box-card {
    padding: 40px;
  }
  .detail-card {
    padding-left: 50px;
    background-color: #f7f7f7;
  }
  .detail-display {
    font-size: 15px;

    .first-row {
      margin-bottom: 20px;
      border-width: 5px;
    }
    .title {
      border-top-width: 0px;
      border-right-width: 0px;
      border-left-width: 0px;
      border-bottom-width: 1px;
      margin-bottom: 10px;
    }
    .p-email{
      margin-left: 10px;
    }
    .skill2{
      margin-left: 0%;
    }
  }
  .Edit {
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
    margin-left: 800px;
  }
}
</style>
