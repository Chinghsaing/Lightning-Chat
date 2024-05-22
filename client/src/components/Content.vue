<template>
    <div class="content">
        <div class="content-left">
            <ChatList></ChatList>

        </div>
        <div class="content-right">
            <ChatBox></ChatBox>
        </div>
    </div>
</template>
<script setup>
import ChatList from '@/components/ChatList.vue'
import ChatBox from '@/components/ChatBox.vue'
</script>
<style lang="less" scoped>
.content {
    padding: 2px 0;
    display: flex;
    width: 100%;

    .content-left {
        display: flex;
        flex-direction: column;
        padding: 5px 0 ;
        border-right: 2px #ececec solid;
    }
    .content-right { 
        width: 100%;
    }

}
</style>