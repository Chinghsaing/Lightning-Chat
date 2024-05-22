import { createRouter, createWebHashHistory } from 'vue-router'
import sign from '@/views/Sign.vue'
import home from '@/views/Home.vue'
import chatlist from '@/components/ChatList.vue'
import chatbox from '@/components/ChatBox.vue'
const routes = [
    {
        path: '/',
        redirect: 'sign'
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        children: [
            { path: 'chatlist', component: chatlist },
            { path: 'chat/:conversationId', component: chatbox, name: 'chatbox' },
        ],
        beforeEnter(to, from, next) {
            let token = localStorage.getItem('token')
            if (token) {
                next();
            } else {
                alert('请先登录')
                next({ name: 'sign' })
            }
        }
    },
    {
        path: '/sign',
        name: 'sign',
        component: sign
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router