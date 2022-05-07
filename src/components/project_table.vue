<template>
    <ul class="box">
        <el-scrollbar>
        <li v-for="i in tableData" :key="i.project_ID" class="infinite-list-item">
            <el-card class="box-card">
                <div>
                    <p class="tit">{{i.project_ID}}</p>
                </div>
            </el-card>
        </li>
        </el-scrollbar>
    </ul>
    
</template>

<script>
  export default {
    data () {
      return {
        tableData: [{
          group_id: '1',
          project_ID: 'create a web platform',
          student1: 'jiawei Li',
          student2: 'Wen Lang',
          student3: 'xuan',
          student4: 'zaza',
          student5: 'bing',
          client_name:'Dr wu',
          client_email: '123456@uni.sydney.edu.au', 
        }, {
          group_id: '1',
          project_name: 'create a web platform',
          student1: 'jiawei Li',
          student2: 'Wen Lang',
          student3: 'xuan',
          student4: 'zaza',
          student5: 'bing',
          client_name:'Dr wu',
          client_email: '123456@uni.sydney.edu.au', 
        }, {
          group_id: '1',
          project_name: 'create a web platform',
          student1: 'jiawei Li',
          student2: 'Wen Lang',
          student3: 'xuan',
          student4: 'zaza',
          student5: 'bing',
          client_name:'Dr wu',
          client_email: '123456@uni.sydney.edu.au', 
        }, {
          group_id: '1',
          project_name: 'create a web platform',
          student1: 'jiawei Li',
          student2: 'Wen Lang',
          student3: 'xuan',
          student4: 'zaza',
          student5: 'bing',
          client_name:'Dr wu',
          client_email: '123456@uni.sydney.edu.au', 
        }, {
          group_id: '1',
          project_name: 'create a web platform',
          student1: 'jiawei Li',
          student2: 'Wen Lang',
          student3: 'xuan',
          student4: 'zaza',
          student5: 'bing',
          client_name:'Dr wu',
          client_email: '123456@uni.sydney.edu.au', 
        }, {
          group_id: '1',
          project_name: 'create a web platform',
          student1: 'jiawei Li',
          student2: 'Wen Lang',
          student3: 'xuan',
          student4: 'zaza',
          student5: 'bing',
          client_name:'Dr wu',
          client_email: '123456@uni.sydney.edu.au', 
        }]
      }
    },
    methods: {
      
    }
  }
</script>

<style>
.box{
    width:447px;
    height:563px;
    margin:0;
}

  .box-card {
    width: 447px;
    height: 161px;
    margin:0;
  }

.box .el-scrollbar{
      height: 100%;
      float:left;
      margin:0;
    }

.el-scrollbar__wrap {
	overflow: hidden;
      
}
</style>