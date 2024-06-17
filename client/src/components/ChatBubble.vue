<template>
    <div v-if="conversation">
        <div class="chatbubble" v-for="message in conversation.messages" :key="message.id"
            :class="{ 'current-user': message.sender === currentUser.id, 'other-user': message.sender !== currentUser.id }">
            <div class="avatar">
                <img :src="getUserAvatar(message.sender)" alt="" width="36px" height="36px">
            </div>
            <div class="message">
                <p>{{ message.content }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { useStore } from '@/store/ChatStore'
import { inject } from 'vue'

const chatStore = useStore()
const currentUser = chatStore.currentUser
const socket = inject('socket')
const props = defineProps({
    conversationId: String
})

const conversation = ref(null)

// 更新当前对话的函数
const updateConversation = () => {
    const conv = chatStore.conversations.find(conv => conv.id === props.conversationId) || null
    conversation.value = conv ? { ...conv } : null
}

// 获取用户头像的函数
const getUserAvatar = (userId) => {
    if (userId === currentUser.id) {
        return currentUser.avatar
    } else {
        const user = chatStore.users.find(user => user.id === userId)
        return user.avatar
    }
}

// 离开当前对话的函数
const leaveConversation = () => {
    socket.emit('leaveConversation', props.conversationId)
}

// 监控对话ID的变化并更新对话
watch(() => props.conversationId, (newConversationId) => {
    leaveConversation()
    updateConversation()
}, { immediate: true })

// 组件挂载时的处理逻辑
onMounted(() => {
    socket.on('newMessage', (newMessage) => {
        // 只处理当前对话的消息
        if (newMessage.conversationId === props.conversationId) {
            const conv = chatStore.conversations.find(conv => conv.id === newMessage.conversationId)
            if (conv) {
                conv.messages.push(newMessage)
                // 更新当前对话
                if (conv.id === conversation.value.id) {
                    conversation.value = { ...conv }
                }
            }
        }else{
            chatStore.conversations.find(conv => conv.id === newMessage.conversationId).messages.push(newMessage)
            }
    })

    // 组件卸载时移除消息监听
    onBeforeUnmount(() => {
        socket.off('newMessage')
    })
})

// 组件更新时的处理逻辑
nextTick(() => {
    window.dispatchEvent(new CustomEvent('new-message-ready'))
})
</script>

<style lang="less" scoped>
.chatbubble {
    padding: 20px;
    display: flex;
    align-items: center;

    &.current-user {
        flex-direction: row-reverse;

        .message {
            background-color: #90caf9;
            margin-right: 10px;
            margin-left: 0;
        }

        .avatar {
            margin-left: 10px;
            margin-right: 0;
        }
    }

    &.other-user {
        flex-direction: row;

        .message {
            background-color: rgb(131, 235, 131);
            margin-left: 10px;
            margin-right: 0;
        }

        .avatar {
            margin-right: 10px;
            margin-left: 0;
        }
    }

    .avatar {
        height: 36px;
        width: 36px;
        border-radius: 50%;
        background-color: rgb(0, 0, 0);
        overflow: hidden;
    }

    .message {
        max-width: 200px;
        margin-left: 10px;
        padding: 10px 10px;
        border-radius: 10px;
        background-color: rgb(131, 235, 131);
        display: inline-block;
        word-wrap: break-word;

        p {
            margin: 0;
        }
    }
}
</style>
