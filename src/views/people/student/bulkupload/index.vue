<template>
  <div class="upload-container">
    <el-card class="box-card">
    <el-upload
          drag
          class="upload-demo"
          ref="upload"
          action="http://localhost:8001/student/batch/import"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-change="handleChange"
          :file-list="fileList"
          :on-success="success"
          :on-error="error"
          :multiple="false"
          :auto-upload="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">Click this area or drag and drop files to <em> upload </em></div>
        <div class="el-upload__tip" slot="tip">* The file name length should be less than 256 characters </div>
        <div class="el-upload__tip" slot="tip"> * Support type: excel </div>
      </el-upload>
      <div class="text4" >The File Template can be download <span @click="template" style="color: #409eff; cursor: pointer; text-decoration: underline;"> here</span> .</div>
      <div class="line" />
      <el-button class="confirm" type="primary" @click="submitUpload">Confirm</el-button>
      <el-button class="cancel" type="danger" @click="cancelPage">Cancel</el-button>   
    </el-card>
  </div>
</template>

<script>
import student from "@/api/student";

export default {
  data() {
    return {
      fileList:[]
    };
    
  },
  methods:{
    cancelPage(){
      this.$router.push({name:"StudentManagement"})
    },
    template(){
      student.getTemplate()
      .then((response) =>{
        window.open("http://localhost:8001/student/batch/template","_self")
      })
    },
    submitUpload() {
          this.$refs.upload.submit()
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    success(res){
      this.$router.push({name:"StudentManagement"})
      this.$message({
            type: "success",
            message: "Add Successfully!",
          });
    },
    error(res){
      this.$message({
            type: "info",
            message: "The content of the uploaded file is wrong, please check and try again !",
          });
    },
    beforeUpload(file) {
        const fileType = file.name.substring(file.name.lastIndexOf('.'))
        if (fileType.toLowerCase() != '.xls' && fileType.toLowerCase() != '.xlsx') {
            this.$message.error('The file has uploaded as ".xls" or ".xlsx"')
            return false
        }
        },
    handleChange(file,fileList){
    if (fileList.length>0) {
        this.fileList=[fileList[fileList.length-1]]
    }
    }
  }
}
</script>

<style lang="scss" >
.upload-container{
  padding: 10px;
  height: calc(100vh - 70px);
  box-sizing: border-box;
       
  display: grid;
  .box-card{
    padding:5% 25%;
  }
  .upload-demo{
    display: block;
    border-style:dashed;
    border-width:3px;
    border-color:rgb(194, 194, 194);
    border-radius: 4px;
    width: 700px;
    height: 400px;
    margin-bottom: 20px;
  }
  .el-upload__text{
    width: 700px;
    height: 400px;
  }

  .text4{
    font-size: 15px;
    text-align: center;
    margin-left: -56%;
    margin-top:7%
  }
  .el-upload-dragger {
      width: 700px;
      height: 350px;
      border-width: 0px;
  }
  .el-upload-dragger .el-icon-upload {
      font-size: 150px;
      color: #C0C4CC;
      margin: 40px 0 16px;
      line-height: 50px;
      margin-top: 100px;
      margin-bottom: 100px;
  }
  .confirm {
    border-radius: 4px;
    vertical-align: middle;
    text-align: center;
    padding: 0px;
    line-height: 22px;
    height: 31px;
    width: 73px;
    margin-left:30%;
    margin-right: 15%;
    margin-top:7%
  }
  .cancel {
    border-radius: 4px;
    vertical-align: middle;
    text-align: center;
    padding: 0px;
    line-height: 22px;
    margin-top: 5px;
    height: 31px;
    width: 73px;
    margin-top:7%
  }
}

</style>
