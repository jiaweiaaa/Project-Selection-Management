<template>
<div class="home">
    <div class="left">
        <div><img class="banner" src="../assets/banner.jpg" alt=""></div>
        <ul class="midgp">
            <router-link :to="{ path: '/people/group'}" append>
                <li class="pd-1">
                    <div class="mid-image img-group"></div>
                    <div class="line-p"></div>
                    <p class="text-p">GROUP<br>LIST</p>
                </li>
            </router-link>
            <router-link :to="{ path: '/project/list'}" append>
                <li class="pd-1">
                    <div class="mid-image img-project"></div>
                    <div class="line-p"></div>
                    <p class="text-p">PROJECT<br>LIST</p>
                </li>
            </router-link>
        </ul>
        <div class="stat">
            <p class="Sta-tit">Statistical charts</p>
            <div class="group-container">
                <div class="group-chart-title chart-title">Group Statistics</div>
                <div class="group-chart-wrapper"> 
                    <v-chart class="group-chart" :option="groupOption" />
                </div>
            </div>
            <div class="project-container">
                <div class="project-chart-title chart-title">Project Statistics</div>
                <div class="has-project-statistic" v-if="nameList.length > 0">
                    <div class="project-chart-wrapper" :style="{'height': barChartHeight + 'px'}">
                        <v-chart class="chart" ref="projectChart" :option="projectOption" />
                    </div>
                    <div class="show-more more-icon-wrapper" v-show="allocatedList.length > 3 && !isShowMore" >
                        <i class="el-icon-arrow-down more-icon" @click="changeShowMore"></i>
                    </div>
                    <div class="hide-more more-icon-wrapper" v-show="allocatedList.length > 3 && isShowMore" >
                        <i class="el-icon-arrow-up more-icon" @click="changeShowMore"></i>
                    </div>
                </div>
                <no-data v-else></no-data>
            </div>
        </div>
    </div>
    <div class="right">
        <div class="tit-G">
            <i class="el-icon-user-solid"></i>
            <p class="Group_tit">Groups that are not be allocated </p>
        </div>
        <div class="table_re">
            <remain_group_table></remain_group_table>
        </div>
        <input type="button" value="Allocate groups" class="button-G" @click="toAllocate">
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import remain_group_table from '@/components/remain_group_table.vue'
import Echarts from 'vue-echarts'
import groupsApi from '@/api/group'
import projectApi from '@/api/project'
import NoData from '@/components/NoData'

export default {
    name: 'Home',
    components: {
        remain_group_table,
        NoData
    },
    data() {
        return {
            projectOption: {
                grid: { // set grid
                    left: '30', //the distance from grid to the top 
                    // can be int value or percentage
                    top: '30',
                    right: '30',
                    bottom: '30',
                    containLabel: true // contain label or not
                },
                xAxis: { // set xAxis
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                },
                yAxis: {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: 'black',
                        fontSize: 14
                    },
                    data: ["project-1", "project-2", "project-3"] // different project name
                },
                series: [{
                        name: 'allocated',
                        type: 'bar', //bar, line ...
                        barWidth: 10,
                        data: [1, 2, 3],
                        label: {
                            show: true,
                            position: 'right', // label distance to the right
                            offset: [0, -20],
                            formatter: '{c}', // {c} means value
                            color: 'black',
                            fontSize: 14
                        },
                        itemStyle: {
                            borderRadius: 10,
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 1,
                                y2: 0,
                                colorStops: [{
                                        offset: 0,
                                        color: '#22B6ED'
                                    },
                                    {
                                        offset: 1,
                                        color: '#3FE279'
                                    }
                                ]
                            }
                        },
                        zlevel: 1
                    },
                    {
                        name: 'bg',
                        type: 'bar',
                        barGap: '-100%', // to stack to bar chart
                        barWidth: 10,
                        data: [5,5,5],
                        color: '#dadada',
                        label: {
                            show: true,
                            position: 'right',
                            offset: [0, -20],
                            formatter: '{c}',
                            color: 'black',
                            fontSize: 14
                        },
                        itemStyle: {
                            borderRadius: 10,
                        }
                    }
                ]
            },
            groupOption: {
                tooltip: {
                    trigger: 'item'
                },
                series: [{
                    name: 'Group statistics',
                    type: 'pie',
                    radius: '50%',
                    data: [],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            },
            barChartHeight: 0,
            allocatedList: [],
            capacityList: [],
            nameList: [],
            isShowMore: false
        }
    },
    created() {
        this.getProjectStatsitic()
        this.getGroupStatistic()
    },
    methods: {
        changeShowMore() {
            this.isShowMore = !this.isShowMore

            if (this.isShowMore) {
                this.barChartHeight = this.allocatedList.length * 80

                this.$set(this.projectOption.yAxis, 'data', this.nameList)
                this.$set(this.projectOption.series[0], 'data', this.allocatedList)
                this.$set(this.projectOption.series[1], 'data', this.capacityList)
                this.$refs.projectChart && this.$refs.projectChart.setOption(this.projectOption, true);

                this.$refs.projectChart && this.$refs.projectChart.resize({
                    height: this.barChartHeight,
                    animation: {
                        duration: .5
                    }
                })
            } else {
                this.barChartHeight = 3 * 80

                this.$set(this.projectOption.yAxis, 'data', this.nameList.slice(-3))
                this.$set(this.projectOption.series[0], 'data', this.allocatedList.slice(-3))
                this.$set(this.projectOption.series[1], 'data', this.capacityList.slice(-3))
                this.$refs.projectChart && this.$refs.projectChart.setOption(this.projectOption, true);

                this.$refs.projectChart && this.$refs.projectChart.resize({
                    height: this.barChartHeight,
                    animation: {
                        duration: .5
                    }
                })
            }
        },
        getGroupStatistic() {
            groupsApi.getAllGroup().then(response => {
                let unAllocatedCount = 0
                let allocatedCount = 0
                for (let group of response.data.Group) {
                    if (group.finalId) {
                        allocatedCount++
                    } else {
                        unAllocatedCount++
                    }
                }
                let groupStatistic = [{
                        value: allocatedCount,
                        name: 'Allocated'
                    },
                    {
                        value: unAllocatedCount,
                        name: 'Not allocated'
                    },
                ]
                this.groupOption.series[0].data = groupStatistic
            })
        },
        toAllocate() {
            this.$router.push('/allocation/allocate')
        },
        getProjectStatsitic() {
            projectApi.getProjectGroupStatistic().then(response => {
                for (let project of response.data.list) {
                    if (project.groupnum) {
                        this.capacityList.unshift(parseInt(project.groupnum))
                    } else {
                        this.capacityList.unshift(5)
                    }

                    if (project.groupList.length) {
                        this.allocatedList.unshift(project.groupList.length)
                    } else {
                        this.allocatedList.unshift(0)
                    }

                    this.nameList.unshift('project-' + project.id)
                }

                if (this.allocatedList.length >= 3) {
                    this.barChartHeight = 3 * 80
                } else {
                    this.barChartHeight = this.allocatedList.length * 80
                }
                this.$set(this.projectOption.yAxis, 'data', this.nameList.slice(-3))
                this.$set(this.projectOption.series[0], 'data', this.allocatedList.slice(-3))
                this.$set(this.projectOption.series[1], 'data', this.capacityList.slice(-3))
                this.$refs.projectChart && this.$refs.projectChart.setOption(this.projectOption, true);

                console.log(this.nameList)
                this.$refs.projectChart && this.$refs.projectChart.resize({
                    height: this.barChartHeight
                });
            })
        }
    }
}
</script>

<style lang="scss" scoped>
* {
    padding: 0;
    margin: 0;
    border: none;
    list-style: none;
}

template {
    background: #f7f7fa;
}

.home {
    font-size: 14px;
    background: #f7f7fa;
    margin: 2px auto;
    display: flex;
    justify-content: center;
    padding-bottom: 30px;
}


.left {
    margin-top: 25px;
}

.left .banner {
    width: 904px;
    margin-bottom: 16px;
}

.left .midgp {
    display: flex;
    margin-bottom: 30px;
}

.left .midgp li {
    border-radius: 12px;
    background: #ffffff;
    margin-left: 25px
}

.left .midgp li .mid-image {
    width: 182px;
    height: 182px;
    background-repeat: no-repeat;
    background-position: center;
    margin: 21px 37px 0 10px;
    background-size: contain;
}

.img-group {
    background-image: url("../assets/img_group.jpg");
}

.img-project {
    background-image: url("../assets/img_project.png");
}

.chart-title {
    font-size: 20px;
    font-weight: bold;
    margin: 24px;
}

.has-project-statistic {
    position: relative;
}

.project-chart-wrapper {
    width: 600px;
    margin: 0 auto;
}

.group-chart-wrapper {
    height: 300px;
}

.left .midgp li .line-p {
    height: 100px;
    width: 2px;
    margin-top: 41px;
    background: #dedeee;
}

.left .midgp li .text-p {
    padding: 39px 33px 0 43px;
    line-height: 50px;
    font-size: 26px;
    text-align: center;
    color: #4A47A3;
    font-weight: bold;
}

.left .midgp li .img_project {
    width: 158px;
    margin: 10px 35px 0 18px;
}

.left .midgp .pd-1 {
    display: flex;
}

.left .stat {
    width: 864px;
    margin-left: 24px;
    border-radius: 12px;
    background: #ffffff;
    padding-bottom: 30px;
}

.left .stat .Sta-tit {
    height: 32px;
    width: 842px;
    padding: 17px 0 0 22px;
    color: #697b9e;
    line-height: 24px;
    font-size: 20px;
    border-bottom: #f7f7fa 2px solid;
    text-align: left;
}

.right {
    margin-top: 31px;
    border-radius: 12px;
    background: #ffffff;
}

.right .tit-G {
    display: flex;
    padding: 20px 10px;
    border-bottom: #f7f7fa 2px solid;
    align-items: center;
}

.right .tit-G .el-icon-user-solid {
    margin: 0 18px 0 0;
}

.right .tit-G .Group_tit {
    font-size: 16px;
    color: #697B9E
}

.project-container {
    position: relative;
}
.more-icon-wrapper {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    .more-icon {
        cursor: pointer;
    }
}

.show-more {
    animation-duration: .8s;
    animation-name: slidedown;
    animation-iteration-count: infinite;
}
.hide-more {
    animation-duration: .8s;
    animation-name: slideup;
    animation-iteration-count: infinite;
}

.right .button-G {
    display: block;
    height: 28px;
    width: 131px;
    background: #FFFFFF;
    color: #9D9CCE;
    border: #9D9CCE 1px solid;
    font-size: 14px;
    margin: 14px auto;
    border-radius: 12px;
}

.right .button-G:hover {
    background: #9D9CCE;
    color: #FFFFFF;
}

@keyframes slidedown {
    from {
        bottom: 20px;
    }
    to {
        bottom: 25px;
    }
}

@keyframes slideup {
    from {
        bottom: 20px;
    }
    to {
        bottom: 15px;
    }
}
</style>
