<template>
    <div class="layout-wrapper">
        <SideBar></SideBar>
        <div class="right-panel" :class="{isCollapsed: isCollapsed}">
            <div class="header-wrapper">
                <NavBar />
            </div>
            <div class="content-wrapper">
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from './components/SideBar'
import NavBar from './components/NavBar'
import { mapGetters } from 'vuex'
export default {
    components: {
        SideBar,
        NavBar
    },
    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        isCollapsed () {
            return !this.sidebar.opened
        }
    }
    
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.right-panel {
    margin-left: $sideBarWidth;
}
.right-panel.isCollapsed {
    margin-left: $hideSideBarWidth;
}

.fade-enter-active {
  transition: all .8s ease;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

</style>
