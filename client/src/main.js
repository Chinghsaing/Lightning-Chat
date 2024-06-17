import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { io } from 'socket.io-client';
const socket = io("http://127.0.0.1:3000");
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App).provide('socket', socket).use(router).use(createPinia()).use(ElementPlus).mount('#app')
