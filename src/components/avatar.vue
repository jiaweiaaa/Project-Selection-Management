<template>
    <div class="avatar-wrapper">
        <div class="avatar" v-if="avatarUrl" :style="{backgroundImage: 'url(' + avatarUrl + ')', width: width + 'px', height: height + 'px'}"></div>
        <div class="avatar default-avatar" :style="{width: width + 'px', height: height + 'px'}" v-else></div>
    </div >
</template>

<script>
export default {
    props: [
        'avatarUrl',
        'width'
    ],
    computed: {
        height () {
            return this.width;
        }
    }

}
</script>

<style lang="scss" scoped>
.avatar-wrapper {
    display: inline-block;
    margin-right: 40px;
    margin-bottom: 20px;
    cursor: pointer;
    text-align: center;
    .avatar {
        margin-bottom: 10px;
        width: 60px;
        height: 60px;
        background-size: cover;
        border-radius: 100%;
    }
    .default-avatar {
        background-image: url('../assets/default-avatar.png');
    }
}
    
</style>