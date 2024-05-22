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
import { watch, onMounted, onBeforeUnmount, onUpdated, nextTick, ref } from 'vue'
import { useStore } from '@/store/ChatStore'
import { inject } from 'vue'

const chatStore = useStore()
const currentUser = chatStore.currentUser
const socket = inject('socket')

const props = defineProps({
    conversationId: String
})

const conversation = ref(null)

const updateConversation = () => {
    conversation.value = chatStore.conversations.find(conv => conv.id === props.conversationId) || null
}

const getUserAvatar = (userId) => {
    if (userId === currentUser.id) {
        return currentUser.avatar
    } else {
        const user = chatStore.users.find(user => user.id === userId)
        return user.avatar
    }
}

const leaveConversation = () => {
    socket.emit('leaveConversation', props.conversationId)
}

watch(() => props.conversationId, (newConversationId) => {
    leaveConversation()
    updateConversation()
}, { immediate: true })

onMounted(() => {
    socket.on('newMessage', (newMessage) => {
        const conv = chatStore.conversations.find(conv => conv.id === props.conversationId)
        if (conv) {
            conv.messages.push(newMessage)
            if (conv.id === conversation.value.id) {
                conversation.value = { ...conv }
            }
        }
    });

    onBeforeUnmount(() => {
        socket.off('newMessage')
    });
});

onUpdated(() => {
    nextTick(() => {
        window.dispatchEvent(new CustomEvent('new-message-ready'));
    });
});
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