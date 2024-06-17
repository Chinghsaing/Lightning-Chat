<template>
    <TransitionGroup name="list" tag="div" class="conversation-list">
        <div class="friend" v-for="(conversation, index) in chatStore.$state.conversations.filter(conversation =>
            conversation.participants.includes(chatStore.$state.currentUser.id))" :key="conversation.id"
            @click="openChat(conversation.id, conversation),isRead(conversation)" :class="{ select: isSelected(conversation.id) }">
            <div class="avatar">
                <img v-if="conversation.participants.length > 2" :src="group" alt="" width="36px" height="36px">
                <img v-else :src="getUserAvatar(conversation)" alt="" width="36px" height="36px">
            </div>
            <div class="friend-msg">
                <h3>
                    {{ conversation.participants.length > 2 ? '群聊' : getUsername(conversation) }}
                </h3>
                <div class="last-message-container">
                    <p>{{ getLastMessage(conversation) }}</p>
                </div>
            </div>
            <el-badge badge-style="border: none" :value="unreadMessagesCount(conversation)" :max="99" :is-dot="false" :hidden="false" type="danger"
                :offset="[0, 15]" :show-zero="false" @click="unreadMessagesCount(conversation)">
            </el-badge>
        </div>
    </TransitionGroup>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/store/ChatStore'
import group from '@/assets/group.png'
import { ref } from 'vue';
const chatStore = useStore()
const router = useRouter()
const selectedConversationId = ref(null)
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
    selectedConversationId.value = conversationId
}
const isSelected = (conversationId) => {
    return selectedConversationId.value === conversationId
}
const getUserAvatar = (conversation) => {
    const otherUser = conversation.participants.filter(userId => userId !== chatStore.$state.currentUser.id)
    const otherUserAvatar = getUserById(otherUser[0]).avatar
    return otherUserAvatar
}
const getUsername = (conversation) => {
    const otherUser = conversation.participants.filter(userId => userId !== chatStore.$state.currentUser.id)
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
const unreadMessagesCount = (conversation) => {
    // 初始化计数器
    let count = 0;
    // 遍历消息
    conversation.messages.forEach((message) => {
        // 检查消息是否未被userId3阅读
        if (message.sender !== chatStore.$state.currentUser.id && !message.isRead[chatStore.$state.currentUser.id]) {
            count++;
        }
    });
    return count;
};
const isRead = (conversation) =>{
    conversation.messages.forEach((message) => {
        message.isRead[chatStore.$state.currentUser.id] = true;
    });
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

    &.select {
        background-color: #e2e2e2;
        /* 更改为你想要的选中背景色 */
    }

    .friend-msg {
        padding: 10px;
        width: 164px;
        overflow: hidden;
    }

    .last-message-container {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        /* 限制为两行 */
        -webkit-box-orient: vertical;
        /* 垂直布局 */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
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
    background-color: rgb(36, 36, 36);
}

.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>