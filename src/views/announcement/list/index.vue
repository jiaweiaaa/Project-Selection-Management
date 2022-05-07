<template>
    <div class="announcement-list-container">
        <perfect-scrollbar class="background-container" v-if="announcementList && announcementList.length > 0">
            <div class="announcement-wrapper" v-for="announcement in announcementList" :key="announcement.id">
                <div class="announcement-left">
                    <avatar :avatarUrl="announcement.author.avatar" width="40"></avatar>
                </div>
                <div class="announcement-right">
                    <div class="title" @click="goEdit(announcement.id)">{{announcement.title}}</div>
                    <div class="time">{{announcement.time | formatTime}}</div>
                    <div class="author" v-if="announcement.author">{{announcement.author.name}}</div>
                    <div class="content" @click="goEdit(announcement.id)" v-html="replaceImage(announcement.content)"></div>
                    <i class="el-icon-delete delete-announcement" @click="deleteAnnouncement(announcement.id)"></i>
            </div>
        </div>
        </perfect-scrollbar>
        <no-data v-else></no-data>
    </div>
</template>

<script>
import announcementApi from '@/api/announcement'
import avatar from '@/components/avatar'
import common from '@/utils/common'
import CONSTANTS from '@/utils/constants'
import NoData from '@/components/NoData'
export default {
    data() {
        return {
            announcementList: []
        }
    },
    components: {
        avatar,
        NoData
    },
    created() {
        this.getAnnouncementList()
    },
    methods: {
        getAnnouncementList() {
            announcementApi.getAnnouncementList().then((response) => {
                this.announcementList = response.data.list
            })
        },
        deleteAnnouncement(id) {
            this.$confirm('Are you sure delete this announcement?', 'Confirm', {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel'
            }).then(() => {
                announcementApi.deleteAnnouncement(id).then((response) => {
                    this.$message({
                        type: 'success',
                        message: 'Delete Successfully'
                    })
                    this.getAnnouncementList()
                })

            })
        },
        replaceImage (content) {
            content = content.replace(/<img.*?>/g, ' [image] ')
            return content;
        },
        goEdit(id) {
            this.$router.push('/announcement/edit/' + id)
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
.announcement-list-container {
    padding: 40px;
    height: calc(100vh - 70px);
    box-sizing: border-box;
    .background-container {
        padding: 30px 20px 20px;
        box-sizing: border-box;
    }
    .announcement-wrapper {
        background-color: #ffffff;
        height: calc(33% - 51px);
        box-shadow: 1px 3px 6px rgba(0, 0, 0, .15);
        padding: 20px;
        position: relative;
        display: flex;
        overflow: hidden;
        &:not(:last-child) {
            margin-bottom: 20px;
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 600px;
            cursor: pointer;
        }
        .time {
            position: absolute;
            color: #BFCBD9;
            top: 20px;
            right: 20px;
        }
        .author {
            font-size: 14px;
            color: #9F9F9F;
            margin-bottom: 10px;
        }
        .content {
            font-size: 16px;
            word-break: break-all;
            white-space: break-spaces;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
            overflow: hidden;
            line-height: 1.5;
            cursor: pointer;
            margin-top: -18px;
        }
        .delete-announcement {
            position: absolute;
            bottom: 20px;
            right: 20px;
            font-size: 18px;
            color: #A7AAAE;
            cursor: pointer;
        }
    }
    .background-container {
        background-color: #F7F7F7;
        height: 100%;
        box-shadow: 1px 3px 6px rgba(0, 0, 0, .15);
    }
    .announcement-left {
        vertical-align: top;
        .avatar-wrapper {
            margin-right: 20px !important;
            cursor: initial;
        }
    }
    .announcement-right {
    }
}
</style>