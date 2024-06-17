<template>
    <div class="side-bar">
        <div class="avatar">
            <img :src="currentUserAvatar" alt="" width="36px" height="36px">
        </div>
        <div class="logo">
            <svg t="1716029597979" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="8362" width="32" height="32">
                <path
                    d="M512 32C247.04 32 32 224 32 464A410.24 410.24 0 0 0 172.48 768L160 965.12a25.28 25.28 0 0 0 39.04 22.4l168-112A528.64 528.64 0 0 0 512 896c264.96 0 480-192 480-432S776.96 32 512 32z m244.8 416l-361.6 301.76a12.48 12.48 0 0 1-19.84-12.48l59.2-233.92h-160a12.48 12.48 0 0 1-7.36-23.36l361.6-301.76a12.48 12.48 0 0 1 19.84 12.48l-59.2 233.92h160a12.48 12.48 0 0 1 8 22.08z"
                    fill="#1296db" p-id="8363"></path>
            </svg>
            Lightning
        </div>
        <div class="decoration">
            <button ref="buttonRef" @click="isHover = !isHover" v-click-outside="onClickOutside" :class="{ active: isHover }">
                <svg t="1716369673619" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="2556" width="32" height="32">
                    <path
                        d="M801.4 487.6h-256v-256c0-10.9-8.8-19.7-19.7-19.7H506c-10.8 0-19.7 8.8-19.7 19.7v256h-256c-10.8 0-19.7 8.8-19.7 19.7V527c0 10.8 8.9 19.7 19.7 19.7h256v256c0 10.8 8.8 19.7 19.7 19.7h19.7c10.9 0 19.7-8.8 19.7-19.7v-256h256c10.9 0 19.7-8.8 19.7-19.7v-19.7c0-10.9-8.8-19.7-19.7-19.7z"
                        fill="#8a8a8a" p-id="2557"></path>
                </svg>
            </button>
            <el-popover popper-class="add-friend-bubble" ref="popoverRef" :virtual-ref="buttonRef" trigger="click"
                title="添加好友" virtual-triggering placement="top" popper-style="width:300px;border-radius: 10px;">
                <div class="bubble-content">
                    <input type="text" placeholder="输入好友昵称" v-model="username" @input="handleInput" />
                    <button @click="AddFriend">添加</button>
                </div>
                <el-skeleton v-if="isShow" style="width: 240px" animated :loading="isLoading">
                    <template #template>
                        <el-skeleton-item variant="image"
                            style="width: 50px; height: 50px;margin-top: 20px;margin-left: 15px;" />
                        <div style="padding: 14px">
                            <el-skeleton-item variant="p" style="width: 50%" />
                            <div style=" display: flex;align-items: center;justify-items: space-between;">
                            </div>
                        </div>
                    </template>
                    <template #default v-if="finish">
                        <div style="display: flex;">
                            <img :src="friendInfo.avatar" alt=""
                                style="width: 50px; height: 50px;margin-top: 20px;margin-left: 15px;">
                            <div style="padding: 14px">
                                <h2>{{ friendInfo.name }}</h2>
                            </div>
                        </div>
                    </template>
                    <template #default v-else>
                        <h1>error</h1>
                    </template>
                </el-skeleton>
            </el-popover>
        </div>
    </div>
</template>

<script setup>
import { useStore } from '@/store/ChatStore'
import { ref, unref, computed } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'
import debounce from 'lodash/debounce'

const chatStore = useStore()
const currentUserAvatar = chatStore.currentUser.avatar
const buttonRef = ref()
const popoverRef = ref()
const username = ref()
const isHover = ref(false)
const currentUser = chatStore.currentUser
const isShow = ref(false)
const isLoading = ref(true)
const friendInfo = ref()
const finish = ref(false)
const onClickOutside = () => {
    isHover.value = false
    unref(popoverRef).popperRef?.delayHide?.()
}
const searchFriend = () => {
    isLoading.value = true
    const friend = chatStore.users.find(user => username.value === user.name)
    if (friend) {
        friendInfo.value = {
            name: friend.name,
            avatar: friend.avatar,
        }
        finish.value = true
    } else {
        finish.value = false
    }
    isLoading.value = false
}

const debouncedSearchFriend = debounce(searchFriend, 1000)

const handleInput = () => {
    if (username.value === '') {
        isShow.value = false
        isLoading.value = false
        finish.value = false
        friendInfo.value = null
    } else {
        isShow.value = true
        isLoading.value = true
        finish.value = false
        debouncedSearchFriend()
    }
}
const AddFriend = () => {
    if (finish.value) {
        const friend = chatStore.users.find(user => username.value === user.name)
        const currentUserId = chatStore.users.find(user => currentUser.id === user.id)
        const friendID = friend.id
        if (!currentUserId.friends.includes(friend.id)) {
            currentUserId.friends.push(friend.id)
            const newConversation = {
                id: 'conversationId' + Date.now(),
                participants: [friend.id, currentUser.id],
                messages: [
                    { id: 'messageId1', sender: friend.id, content: '我们已经是好友了，快来发送消息吧！', timestamp: Date.now() ,
                    isRead:{
                        friendID : false,
                        currentUserId : false,
                    }},
                ],
            }
            chatStore.conversations.push(newConversation)
        } else {
            alert('已经是好友了')
        }
    }
}
</script>
<style scoped lang="less">
.side-bar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 72px;
    border-radius: 20px 0 0 20px;
    padding: 10px;
    box-sizing: border-box;
    border-right: 2px #ececec solid;

    .avatar {
        height: 36px;
        width: 36px;
        border-radius: 50%;
        background-color: rgb(0, 0, 0);
        overflow: hidden;
    }

    .logo {
        transform: rotate(270deg);
        display: flex;
        font-weight: bold;
        font-size: 20px;
    }

    .decoration {
        display: flex;
        flex-direction: column;

        button {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            margin-bottom: 5px;
            border: none;
            padding: 0;
            background-color: rgb(235, 235, 235);

            &.active {
                background-color: #d4d4d4;
            }

            &:hover {
                cursor: pointer;
                background-color: #d4d4d4;
                /* 添加悬停效果颜色 */
            }
        }
    }
}

.add-friend-bubble {
    width: 200px;
    height: 200px;

    .bubble-content {
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        justify-content: space-around;

    }

    input {
        box-sizing: border-box;
        padding: 10px;
        height: 35px;
        outline: none;
        border: none;
        background-color: rgb(240, 240, 240);
        font-size: 14px;
        border-radius: 15px;
    }

    button {
        border: none;
        background-color: #34a4ff;
        width: 50px;
        border-radius: 50px;
        height: 30px;
        font-size: 14px;
        color: rgb(245, 245, 245);
        font-weight: bold;
        margin-top: 40px;

        &:hover {
            cursor: pointer;
            background-color: #1e9aff;
            /* 添加悬停效果颜色 */
        }
    }
}
</style>