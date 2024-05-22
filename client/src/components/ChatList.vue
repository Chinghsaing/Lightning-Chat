<template>
    <div class="conversation-list">
        <div class="friend" v-for="(conversation, index) in chatStore.$state.conversations.filter(conversation =>
            conversation.participants.includes(chatStore.$state.currentUser.id))" :key="conversation.id"
            @click="openChat(conversation.id, conversation)">
            <div class="avatar">
                <img v-if="conversation.participants.length > 2" :src="group" alt="" width="36px" height="36px">
                <img v-else
                    :src="getUserAvatar(conversation)"
                    alt="" width="36px" height="36px">
            </div>
            <div class="friend-msg">
                <h3>
                    {{ conversation.participants.length > 2 ? '群聊' : getUsername(conversation) }}
                </h3>
                <p>{{ getLastMessage(conversation) }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/store/ChatStore'
import group from '@/assets/group.png'
const chatStore = useStore()
const router = useRouter()

const openChat = (conversationId, conversation) => {
    if (conversation.participants.length > 2) {
        chatStore.setIsGroup(true)
    } else {
        chatStore.setIsGroup(false)
    }
    router.push({
        name: 'chatbox',
        params: {
            conversationId,
        }
    })
}
const getUserAvatar = (conversation) => {
    const otherUser = conversation.participants.filter(userId=>userId !== chatStore.$state.currentUser.id)
    const otherUserAvatar = getUserById(otherUser[0]).avatar
    return otherUserAvatar
}
const getUsername = (conversation) => {
    const otherUser = conversation.participants.filter(userId=>userId !== chatStore.$state.currentUser.id)
    const otherUsername = getUserById(otherUser[0]).name
    return otherUsername
}
const getUserById = (userId) => {
    return chatStore.$state.users.find(user => user.id === userId)
}

const getLastMessage = (conversation) => {
    if (conversation.messages.length > 0) {
        const lastMessage = conversation.messages[conversation.messages.length - 1]
        return lastMessage.content
    }
    return "暂无消息"
}
</script>
<style lang="less" scoped>
.friend {
    padding: 10px;
    display: flex;
    height: 64px;
    width: 250px;
    border-bottom: 2px #ececec solid;
    align-items: center;
    transition: transform .5s, box-shadow .5s;
    border-radius: 20px;

    &:hover {
        transition: transform .5s, box-shadow .5s;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, .1), -4px -4px 8px rgba(0, 0, 0, .1);
    }

    .avatar {
        height: 36px;
        width: 36px;
        border-radius: 50%;
        background-color: rgb(255, 255, 255);
        overflow: hidden;
    }

    .friend-msg {
        padding: 10px;
        width: 164px;
        overflow: hidden;
    }

    h3 {
        margin: 0;
        color: #3c3c3c;
    }

    p {
        margin: 0;
        color: #666666;
    }
}

.select {
    background-color: #dddddd;
}
</style>