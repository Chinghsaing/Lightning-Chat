<template>
    <div class="home">
        <SideBar></SideBar>
        <Content></Content>
    </div>
</template>

<script setup>
import SideBar from '../components/SideBar.vue'
import Content from '../components/Content.vue'
</script>

<style scoped lang="less">
.home {
    display: flex;
    width: 1150px;
    height: 650px;
    background-color: rgb(245, 245, 245);
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>