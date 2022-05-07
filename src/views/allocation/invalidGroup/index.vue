<template>
<div class="container">
    <div class="allo_container">
        <div class="left">
            <div class="search">
                <el-input placeholder="Search" prefix-icon="el-icon-search" v-model="keyword" :on-search-change="findGroup">
                </el-input>
                <div class="radioBox">
                    
                </div>
            </div>
            <div class="table">
                <perfect-scrollbar class="background-container">
                    <div class="box-card" v-for="(group,index) in groupList" :key="index" @click=" setCenter(index) " :class="{selectedColor:selectIndex === index}" draggable="true">
                        <div class="top">
                            <p class="tit">Group {{group.grid}}</p>
                            <div class="preApprove" v-if="group.prepoporsal"><el-button type="primary" plain size="mini" @click.stop="openImage(group.prepoporsal)"> pre-approve</el-button></div>
                        </div>
                        <div class="time">
                            Submit time: {{group.submitTime | formatTime}}
                        </div>
                        <div class="info">
                            <div class="menber" v-for="student in group.studentList" :key="student.id">
                                <el-tooltip :content="student.name +' '+student.unikey" placement="top">
                                    <div class="menber">{{student.name}} {{student.unikey}} </div>
                                </el-tooltip>
                            </div>
                        </div>
                        <div class="pre">
                            <el-button size="mini" class="pdB10" style="margin-left:10px" @click.stop="getProjectID(group.pre1); ">pre1: CS{{group.pre1}}</el-button>
                            <el-button size="mini" class="pdB10" @click.stop="getProjectID(group.pre2); ">pre2: CS{{group.pre2}}</el-button>
                            <el-button size="mini" class="pdB10" @click.stop="getProjectID(group.pre3); ">pre3: CS{{group.pre3}}</el-button>
                        </div>
                        <div class="allo" v-if="group.status==2">
                            <p>Please merge first</p>
                            <el-input class="resultBox pdB10" size="medium" placeholder="merge with" v-model="group.result" type="number">
                            </el-input>
                            <el-button size="small" @click.stop="mergeGroup(group.grid,group.result)">Merge</el-button>
    
                        </div>
                        <div class="addGroup" v-if="group.status==3 && (group.finalId==null || group.finalId=='0')">
                            <el-button size="mini" @click.stop="mergeNew(group.grid)">Merge Group</el-button>
                        </div>
                        <div class="allo" v-if="group.status==3">
                            <div class="resTitle pdB10">allocated to:</div>
                            CS
                            <el-input class="resultBox" style="padding-bottom:5px;" size="medium" placeholder="result" v-model="group.result" type="number">
                            </el-input>
                            <el-button @click.stop="submit(group.id,group.result)" size="small" style="margin-bottom:10px;">Submit</el-button>
                            <div class='finalResult' v-if="group.finalId!==null && group.finalId!=='0' " >Final project: CS{{group.finalId}}</div>
                        </div>
                        <div class='labels' v-if="group.finalId!==null && group.finalId!=='0' " ><img class='allocatedLabel' src="../../../assets/allocated.png" alt=""></div>
                    </div>

                </perfect-scrollbar>
            </div>

        </div>
        <div class="right">
            <div class="projectInfo">
                <div class="r_top">
                    <p class="r_tit">Project CS{{project_ID}}</P>
                    <el-tooltip :content="project[0].title" placement="top">
                        <p class="r_name">{{project[0].title}}</p>
                    </el-tooltip>
                </div>
                <div class="detailInfo">
                    <perfect-scrollbar class="background-container_p">
                        <p>unit: {{project[0].unit}}</p>
                        <p>detail:</p>
                        <p style="width: 416px; word-wrap:break-word; " v-html="project[0].details"></p>
                    </perfect-scrollbar>
                    <div class="progressData">
                        <div class="allocatedNum">Allocated group: {{project[0].number}}</div>
                        <div class="fullNum">Total group: {{project[0].groupnum}}</div>
                    </div>
                    <el-progress v-if="!isNaN(status)" :percentage="status"></el-progress>
                </div>
            </div>
            <div class="projectList">
                <div class="listTop">Projects that are not full</div>
                <perfect-scrollbar class="background-container_L">
                    <el-table :data="projectList" :cell-style="rowClass" :header-cell-style="headerClass">
                        <el-table-column prop="id" label="ID" width="50">
                        </el-table-column>
                        <el-table-column prop="unit" label="Unit" width="100">
                        </el-table-column>
                        <el-table-column prop="title" label="name">
                        </el-table-column>
                        <el-table-column fixed="right" label="Action" width="80">
                            <template slot-scope="scope">
                                <el-button @click="getProjectID(scope.row.id);" round size="mini">Details</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </perfect-scrollbar>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import allocation from '@/api/allocation'
import common from '@/utils/common'
import CONSTANTS from '@/utils/constants'
export default {
    name: 'invalidGroup',
    components: {

    },
    data() {
        return {
            unit: '',
            keyword: '',
            status: 0,
            selectIndex: null,
            project_ID: '',
            group_id: '',
            projectList: [],
            groupList: [],
            project: [{
                id: '',
                title: ' ',
                details: ' ',
                unit: ' ',
                groupnum: '',
                number: '',
            }],

        }
    },
    created() {
        this.getInvalidGroup(),
        this.getFreeProject()

    },
    watch: {
        'keyword': function (newVal, oldVal) {
            this.findGroup()
        },
        
        'project_ID': function (newVal, oldVal) {
            this.getProject(newVal)
        },

    },

    methods: {
        getFreeProject() {
            allocation.getFreeProject().then(response => {
                console.log(response)
                this.projectList = response.data.FreeProject
            })
        },
        findGroup() {

            let keyword = this.keyword

            allocation.invalidGroupSearch(keyword).then(response => {
                console.log(response)
                this.groupList = response.data.invalidGroup
                for (var i in this.groupList) {
                    if(this.groupList[i].finalId!==null && this.groupList[i].finalId!=='0'){
                        this.$set(this.groupList[i], 'result', this.groupList[i].finalId)
                    }
                    else{
                        this.$set(this.groupList[i], 'result', '')
                    }

                }
            })
        },
        getProject(id) {
            allocation.getProject(id).then(response => {
                console.log(response)
                this.project = response.data.project
                this.gettStatus(this.project[0].number, this.project[0].groupnum)
            })
        },
        getResult(index, id) {
            this.groupList[index].result = id;

        },
        getProjectID(id) {
            this.project_ID = id

        },
        getGroupId(id) {
            this.group_id = id
        },
        getInvalidGroup() {
            allocation.getInvalidGroup().then(response => {
                console.log(response)
                this.groupList = response.data.invalidGroup

                for (var i in this.groupList) {
                     if(this.groupList[i].finalId!==null && this.groupList[i].finalId!=='0'){
                        this.$set(this.groupList[i], 'result', this.groupList[i].finalId)
                    }
                    else{
                        this.$set(this.groupList[i], 'result', '')
                    }

                }
                console.log(this.groupList)
            })
        },
        setCenter(index) {
            this.selectIndex = index
        },
        addGroup(id, projectId) {
            var groupId = id
            allocation.addGroup(projectId, groupId).then((response) => {
                console.log(response)
                this.$message({
                    type: 'success',
                    message: 'Added successfully!'
                });
                this.getProject(projectId)
                this.getFreeProject()
                 this.getInvalidGroup()
            })

        },
        submit(id, projectId) {
            this.$confirm('Are you sure you want to add this group?', 'Tips', {
                confirmButtonText: 'comfirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            })
            .then(() => {
                this.addGroup(id, projectId)
  
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: 'canceled successfully'
                });
            })
            
            
        },
        mergeGroup(firstGroupid,secGroupid){
            this.$confirm('Are you sure you want to merge these two groups?', 'Tips', {
                confirmButtonText: 'comfirm',
                cancelButtonText: 'cancel',
                type: 'warning'
            }).then(() => {
                this.mergeInvalidGroup(firstGroupid,secGroupid)
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'canceled successfully'
                });
            });
        },
        mergeNew(firstGroupid){
            this.$prompt('Please enter group ID', 'Merge Group', {
            confirmButtonText: 'merge',
            cancelButtonText: 'cancel',
            inputPattern: /^[0-9]*[1-9][0-9]*$/,
            inputErrorMessage: 'Please enter ID'
            }).then(({ value }) => {
           
                this.mergeGroup(firstGroupid,value)
           
            }).catch(() => {
            this.$message({
                type: 'info',
                message: 'Cancel input'
            });       
            });
        },
        mergeInvalidGroup(firstGroupid,secGroupid){
            allocation.mergeInvalidGroup(firstGroupid,secGroupid).then((response) => {
                console.log(response)
                this.$message({
                    type: 'success',
                    message: 'merged successfully!'
                });
                this.getInvalidGroup()
            })
        },
        
        clickfull(e) {
            if (e === this.allocat) {
                this.allocat = 2
            } else {
                this.allocat = e
            }
        },
        gettStatus(currentNum, groupNum) {
            this.status = (currentNum / groupNum) * 100
        },

        rowClass() {
            return "text-align: center;color:#7787A7;";
        },
        headerClass() {
            return "text-align: center;color:#7787A7;";
        },
        openImage(url){
            window.open(url, "_blank");
        },

    },
    filters: {
        formatTime(time) {
            let timeDetail = common.getDetailsFromTimestamp(time)
            let month = CONSTANTS.MONTH_MAPPER[timeDetail.month]

            return month + ' ' + timeDetail.day + ' , ' + timeDetail.year + ' at ' + timeDetail.hours + ':' + timeDetail.minutes
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    font-size: 14px;
    margin: 0 auto;
}

.container .allo_container {

   
    margin: 25px 25px;
    border-radius: 6px;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%), 0 0 5px 0 rgb(0 0 0 / 4%);

}

.container .allo_container .left {
    width: 50%;

    padding: 25px 0 10px 0;
    display: inline-block;

    .search {
        width: 70%;
        height: 74px;
        margin: 0 auto;
    }
}

.container .allo_container .left .search .el-input {
    width: 240px;
    font-size: 18px;
    color: #CBC7C6;
    background: #f7f7fa;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%), 0 0 5px 0 rgb(0 0 0 / 4%);

}

.container .allo_container .left .search .radioBox {
    width: 200px;
    height: 73px;
    padding: 2px 0 0 25px;

    .fili {
        width: 210px;
    }
}

.container .allo_container .left .table {
    width: 70%;
 
    position: relative;
    box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%), 0 0 5px 0 rgb(0 0 0 / 4%);
    border-radius: 6px;
    margin: 0 auto;
}

.container .allo_container .right {
    width: 50%;
    height: 83vh;
    margin-top: 10px;
    display: inline-block;

    .projectInfo {
       width: 70%;
        height: calc(70% - 20px);
        background: #F7F7F7;
        box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%), 0 0 5px 0 rgb(0 0 0 / 4%);
        border-radius: 6px;
        margin-bottom: 20px;

        .r_top {
            
            display: flex;
            align-items: center;

            font-size: 22px;
            font-weight: bold;
            padding-left: 24px;

            .r_tit {
                width: 30%;
                display: inline-block;
                line-height: 22px;
                overflow: hidden;
            }

            .r_name {
                width: 70%;
                display: inline-block;
                line-height: 20px;
                font-size: 16px;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

        }

        .detailInfo {
            width: 100%;
            height: calc(100% - 45px);
            padding-left: 24px;
            padding-top: 10px;
            box-sizing: border-box;

        }

        .allocatedNum {
            width: 70%;
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            padding-bottom: 10px;
        }

        .fullNum {
            width: 30%;
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            padding-bottom: 10px;
        }

    }

    .projectList {
         width: 70%;
         height: 30%;
        background: #F7F7F7;
        box-shadow: 0 3px 6px 0 rgb(0 0 0 / 12%), 0 0 5px 0 rgb(0 0 0 / 4%);
        border-radius: 6px;

        .listTop {
            height: 25px;
            font-size: 16px;
            font-weight: bold;
            padding: 5px 0 0 10px;
        }

        .background-container_L {
            width: calc(100% - 10px);
            height: calc(100% - 31px);
            padding-left: 5px;

        }
    }
}

.background-container_p {
    width: calc(100% - 10px);
    height: 74%;

}

.background-container {
    width: 100%;
    height: 75vh;
}

.box-card {
   width: 98%;
    height: 200px;
    background: #F7F7F7;
    margin: 2px 7px 7px 5px;
    border-radius: 6px;
    position: relative;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);

}

.selectedColor {
    background: #E6E5E5;
}

.el-scrollbar__wrap {
    overflow: hidden;

}

.tit {
    position: absolute;
    left: 5%;
    font-size: 16px;
    font-weight: bold;
}

.t_name {
    position: absolute;
    left: 35%;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
}
.preApprove{
    position: absolute;
    top:3%;
    left: 47%;
}
.addGroup{
    position: absolute;
    top:3%;
    left: 67%;
}
.time{
    position: absolute;
    top: 21%;
    left: 5%;
    font-size: 14px;
    font-weight: bold;
}

.info {
    position: absolute;
     top: 33%;
    left: 5%;
    width: 45%;
    height: 130px;
    font-size: 14px;
    overflow: hidden;

    .menber {
        height: 24px;
        width: 150px;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

.pre {
    position: absolute;
    top: 33%;
    left: 50%;
    width: 120px;
}

.allo {
    position: absolute;
    top: 30%;
    left: 75%;
    width: 22%;


    .resultBox {
        width: 80px;
        height: 40px;
    }

}
.labels{
    position: absolute;
     top: -10px;
    right: -10px;
    .allocatedLabel{
        
        width: 7cc5px;
        
    }
}

.pdB10 {
    margin-bottom: 10px;
}
</style>
