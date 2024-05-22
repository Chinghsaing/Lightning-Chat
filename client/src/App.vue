<template>
    <router-view>
    </router-view>
</template>
<script setup>
import { onMounted } from 'vue'
import { useStore } from '@/store/ChatStore';
const chatStore = useStore();
onMounted(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        chatStore.$state.currentUser = {
            name: user.name,
            id: user.id,
            avatar: user.avatar
        };
    } else {
        
    }
});
</script>
<style scoped>
  
</style>
