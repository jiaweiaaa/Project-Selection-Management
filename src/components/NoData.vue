<template>
    <div class="no-data">
        No data
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.no-data {
    font-size: 14px;
    color: #cacaca;
    margin: 30px auto;
    width: 65px;
    text-align: center;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 100%;
        width: 30px;
        height: 1px;
        background-color: #cacaca;
    }

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        right: 100%;
        width: 30px;
        height: 1px;
        background-color: #cacaca;
    }
}
</style>