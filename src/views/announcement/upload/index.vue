<template>
    <div class="announcement-upload-container">
        <div class="head-row">
            <div class="title-wrapper">
                <div class="title-field">Title:</div>
                <el-input v-model="announcement.title" 
                    @input="clearError('title')" 
                    placeholder="Please key in project title" 
                    :class="{ 'has-error': error.title.isShow}" 
                    class="title-input">
                </el-input>
            </div>
            <div class="title-error-wrapper error-notification" v-show="error.title.isShow">{{error.title.message}}</div>
            <div class="btn-wrapper">
                <el-button type="danger" @click="goto('/announcement/list')" class="cancel-add-btn">Cancel</el-button>
                <el-button type="primary" @click="AddAnnouncement" class="confirm-add-btn">Confirm</el-button>
            </div>
        </div>
        <div class="context-editor-wrapper">
            <tinymce v-model="announcement.content" :height="600" @input="clearError('content')"/>
            <div class="content-error-wrapper error-notification" v-show="error.content.isShow">{{error.content.message}}</div>
        </div>

    </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import announcementApi from '@/api/announcement'
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            announcement: {
                content: '',
                title: '',
                id: '',
                authorId: ''
            },
            error: {
                title: {
                    isShow: false,
                    message: 'Title cannot be empty'
                },
                content: {
                    isShow: false,
                    message: 'Content cannot be empty'
                }
            }
        }
    },
    computed: {
        ...mapGetters([
            'currentAdmin'
        ])
    },
    created() {
        let id = this.$route.params.id
        if (id) {
            this.announcement.id = id
            announcementApi.getAnnouncementInfo(this.announcement.id).then((response) => {
                this.announcement = response.data.announcement
            })
        }
    },
    methods: {
        goto(path) {
            this.$router.push(path)
        },
        clearError(label) {
            this.error[label].isShow = false
        },
        AddAnnouncement() {
            if (this.validateBeforeAdd()) {
                if (this.$route.params.id) {
                    announcementApi.updateAnnouncement(this.announcement).then((response) => {
                        this.$message({
                            type: 'success',
                            message: 'Update Successfully'
                        })
                        this.$router.push('/announcement/list') 
                    })
                } else {
                    this.announcement.authorId = this.currentAdmin.id
                    announcementApi.addAnnouncement(this.announcement).then((response) => {
                        this.$message({
                            type: 'success',
                            message: 'Add Successfully'
                        })
                        this.$router.push('/announcement/list')
                    })
                }
            }
        },
        validateBeforeAdd() {
            if (!this.announcement.title) {
                this.error.title.isShow = true
                return false
            }
            
            if (!this.announcement.content) {
                this.error.content.isShow = true
                return false
            }
            
            return true
        }
    },
    components: {
        Tinymce
    }
}
</script>

<style lang="scss" scoped>
.announcement-upload-container {
    padding: 30px;
    .mce-panel {
        border-radius: 3px;
    }
    .head-row {
        position: relative;
    }
    .title-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        .title-field {
            margin-right: 10px; 
        }
    }
    .btn-wrapper {
        position: absolute;
        display: flex;
        top: 0;
        right: 0;
    }
    .title-input {
        width: 400px;
    }
    .error-notification {
        font-size: 12px;
        color: red;
    }
    .title-error-wrapper  {
        margin: 0 0 15px 50px;
    }
    .content-error-wrapper {
        margin-top: 15px;
        margin-left: 15px;
    }
    .has-error {
        ::v-deep .el-input__inner {
            border-color: red !important;
        }
    }
}
</style>