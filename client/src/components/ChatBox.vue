<template>
    <div class="chatbox" v-if="isConversationFound">
        <h1>{{ chatStore.$state.isGroup ? '群聊' : otherUserName }}</h1>
        <div class="chatcontent" ref="chatContent">
            <ChatBubble :conversationId="route.params.conversationId"></ChatBubble>
        </div>
        <ChatInput></ChatInput>
    </div>
    <div v-else style="width: 100%;display: flex;align-items: center;justify-content: center">
        <img :src="chat" alt="">
    </div>
</template>

<script setup>
import { computed, ref, watch, onBeforeUnmount, onMounted } from 'vue'
import ChatBubble from '@/components/ChatBubble.vue'
import ChatInput from '@/components/ChatInput.vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/ChatStore'
import chat from '@/assets/chat.png'
const chatContent = ref(null)
const chatStore = useStore()
const route = useRoute()
const conversationId = computed(() => route.params.conversationId)
const isConversationFound = computed(() => conversation.value !== null)

// 获取当前对话
const conversation = ref(null)
const updateConversation = () => {
    conversation.value = chatStore.conversations.find(conv => conv.id === conversationId.value) || null
}

// 获取当前对话的另一位用户ID
const otherUserId = computed(() => {
    if (!conversation.value) return null
    return conversation.value.participants.find(id => id !== chatStore.currentUser.id)
})

// 获取另一位用户的名字
const otherUserName = computed(() => {
    if (!otherUserId.value) return '未知用户'
    const otherUser = chatStore.users.find(user => user.id === otherUserId.value)
    return otherUser ? otherUser.name : '未知用户'
})

// 监听 conversationId 的变化
watch(conversationId, (newConversationId) => {
    updateConversation()
}, { immediate: true })

// 滚动到底部
const scrollToBottom = () => {
    if (chatContent.value) {
        chatContent.value.scrollTop = chatContent.value.scrollHeight
    }
}

// 监听新消息准备好的事件
window.addEventListener('new-message-ready', scrollToBottom)

// 确保在组件卸载时移除事件监听器
onBeforeUnmount(() => {
    window.removeEventListener('new-message-ready', scrollToBottom)
})

onMounted(() => {
    updateConversation()
})
</script>
<style lang="less" scoped>
.chatbox {
    padding: 20px 20px 0 20px;
    height: 100%;
    box-sizing: border-box;

    h1 {
        display: inline-block;
        margin: 0;
        position: relative;
        height: 64px;
    }

    h1:after {
        display: inline-block;
        content: '';
        width: 650px;
        height: 2px;
        position: absolute;
        background-color: #ececec;
        left: 0;
        top: 70px;
    }

    .chatcontent {
        height: 490px;
        width: 100%;
        overflow-y: scroll;
        margin-top: 10px;

        &::-webkit-scrollbar {
            width: 5px;
            height: 1px;
        }

        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            background: #adadad;
        }

        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            background: #ececec;
        }
    }
}
</style>