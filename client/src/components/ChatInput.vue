<template>
    <div class="chatinput">
        <input type="text" placeholder="Your Message" v-model="message"
            @keydown.enter.prevent="getMessage(conversationId, message)">
        <button @click="getMessage(conversationId, message)">
            <svg t="1716023777161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="4439" width="24" height="24">
                <path
                    d="M683.41351 851.872734c-6.478552 0-12.361539-3.89675-14.863523-9.92914L552.133557 561.38578l-405.592528 5.786797c-7.494695 0.150426-14.107299-5.002944-15.875572-12.310374-1.769296-7.30743 1.755993-14.864546 8.491395-18.205641l731.377406-362.851075c5.745864-2.850931 12.634762-2.018983 17.534352 2.117221 4.901637 4.13518 6.881734 10.785647 5.03876 16.928554l-194.271612 647.548162c-1.955538 6.520507-7.79964 11.104919-14.59951 11.450796C683.962002 851.865571 683.685709 851.872734 683.41351 851.872734zM562.819944 529.036002c6.499018 0 12.369725 3.9121 14.865569 9.928117l103.290481 248.925373L851.60821 219.133859 217.016127 533.968337l345.57255-4.930289C562.665425 529.036002 562.742173 529.036002 562.819944 529.036002z"
                    fill="#231815" p-id="4440"></path>
            </svg>

        </button>
    </div>
</template>
<script setup>
import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/ChatStore'
import { computed, watchEffect } from 'vue';


const chatStore = useStore()
const route = useRoute()
const message = ref('')
let conversationId = route.params.conversationId
const socket = inject('socket')
const emits = defineEmits(['NewMessage-sent'])

socket.on('connect', () => {
    socket.emit('joinConversation', conversationId)
})


const leaveConversation = () => {
    socket.emit('leaveConversation', conversationId)
}

const joinConversation = () => {
    socket.emit('joinConversation', conversationId)
}
const getMessage = (conversationId) => {
    if (message.value.trim() !== '') {
        chatStore.sendMessage(conversationId)
        socket.emit('sendMessage', conversationId, {
            sender: chatStore.currentUser.id,
            content: message.value,
        });
        message.value = '';
    }
};
socket.on('connect', () => {
    joinConversation()
})


watchEffect(() => {
    leaveConversation()
    conversationId = route.params.conversationId
    joinConversation()
})

</script>
<style lang="less" scoped>
.chatinput {
    width: 100%;
    height: 60px;
    border-top: 2px #ececec solid;
    display: flex;
    align-items: center;

    input {
        width: 690px;
        height: 35px;
        border-radius: 15px 0 0 15px;
        border: solid 2px #e7e7e7;
        border-right: none;
        outline: none;
        padding: 0 10px;
        font-size: 18px;
    }

    button {
        width: 40px;
        height: 39px;
        border: solid 2px #e7e7e7;
        border-radius: 0 15px 15px 0;
        background-color: white;
        transition: all 0.2s;

        &:hover {
            background-color: #ececec;
        }
    }
}
</style>