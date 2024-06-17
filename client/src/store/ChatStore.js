import { defineStore } from "pinia"
import OP from '@/assets/OP.jpg'
import OIP from '@/assets/OIP.jpg'
import OIPC from '@/assets/OIP-C.jpg'
import OIPD from '@/assets/OIP-D.jpg'
export const useStore = defineStore({
    id: "ChatSore",

    state: () => ({
        isLoggedIn: false,
        isGroup: false,
        users: [
            { id: 'userId1', name: '志杰', avatar: OP, password: 123456, friends: ['userId3'] },
            { id: 'userId2', name: '可莉', avatar: OIP, password: 123456, friends: ['userId3'] },
            { id: 'userId3', name: '垃圾桶', avatar: OIPC, password: 123456, friends: ['userId1', 'userId2'] },
            { id: 'userId4', name: '芝姐', avatar: OIPD, password: 123456, friends: [] },
        ],

        conversations: [
            {
                id: 'conversationId1',
                participants: ['userId2', 'userId3'],
                messages: [
                    {
                        id: 'messageId1', sender: 'userId3', content: 'Hello!', timestamp: 1627738339574, isRead: {
                            'userId2': false,
                            'userId3': false,
                        },
                    },
                    {
                        id: 'messageId2', sender: 'userId2', content: 'Hi, how are you?', timestamp: 1627738359574, isRead: {
                            'userId2': false,
                            'userId3': false,
                        },
                    },
                ],
            },
            {
                id: 'conversationId2',
                participants: ['userId1', 'userId3'],
                messages: [
                    {
                        id: 'messageId1', sender: 'userId3', content: 'Hi!', timestamp: 1627738339574, isRead: {
                            'userId1': false,
                            'userId3': false,
                        },
                    },
                    {
                        id: 'messageId2', sender: 'userId1', content: 'Manba Out!', timestamp: 1627738359580, isRead: {
                            'userId1': false,
                            'userId3': false,
                        },
                    },
                ],
            },
            {
                id: 'conversationId3',
                participants: ['userId3', 'userId1', 'userId2'],
                messages: [
                    {
                        id: 'messageId1', sender: 'userId3', content: 'Hi!', timestamp: 1627738339580, isRead: {
                            'userId2': false,
                            'userId3': false,
                            'userId1': false,
                        },
                    },
                    {
                        id: 'messageId2', sender: 'userId1', content: '别叫', timestamp: 1627738359584, isRead: {
                            'userId2': false,
                            'userId3': false,
                            'userId1': false,
                        },
                    },
                    {
                        id: 'messageId3', sender: 'userId1', content: 'fuck', timestamp: 1627738359586, isRead: {
                            'userId2': false,
                            'userId3': false,
                            'userId1': false,
                        },
                    },
                    {
                        id: 'messageId4', sender: 'userId2', content: 'What Can i say', timestamp: 1627738359588, isRead: {
                            'userId2': false,
                            'userId3': false,
                            'userId1': false,
                        },
                    },
                    {
                        id: 'messageId5', sender: 'userId3', content: 'shut up', timestamp: 1627738359590, isRead: {
                            'userId2': false,
                            'userId3': false,
                            'userId1': false,
                        },
                    },
                    {
                        id: 'messageId6', sender: 'userId2', content: '急了', timestamp: 1627738359599, isRead: {
                            'userId2': false,
                            'userId3': false,
                            'userId1': false,
                        },
                    },
                ],
            },
        ],
        currentUser: { id: '', name: '', avatar: '' },
    }),
    actions: {
        sendMessage(conversationId) {
            const conversation = this.conversations.find(conv => conv.id === conversationId);
            if (conversation) {
                // 从数组中移除该对象
                const index = this.conversations.indexOf(conversation);
                if (index > -1) {
                    this.conversations.splice(index, 1);
                }
                // 将对话对象添加到数组的最前面
                this.conversations.unshift(conversation);
            }
        },
        setIsGroup(isGroup) {
            this.$patch(state => {
                state.isGroup = isGroup;
            });
        },
    },
})