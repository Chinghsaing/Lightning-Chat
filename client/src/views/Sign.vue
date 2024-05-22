<template>
    <div class="sign">
        <div class="sign-left">
            <div class="logo">
                <svg t="1716029597979" class="icon" viewBox="0 0 1024 1024" version="1.1"
                    xmlns="http://www.w3.org/2000/svg" p-id="8362" width="32" height="32">
                    <path
                        d="M512 32C247.04 32 32 224 32 464A410.24 410.24 0 0 0 172.48 768L160 965.12a25.28 25.28 0 0 0 39.04 22.4l168-112A528.64 528.64 0 0 0 512 896c264.96 0 480-192 480-432S776.96 32 512 32z m244.8 416l-361.6 301.76a12.48 12.48 0 0 1-19.84-12.48l59.2-233.92h-160a12.48 12.48 0 0 1-7.36-23.36l361.6-301.76a12.48 12.48 0 0 1 19.84 12.48l-59.2 233.92h160a12.48 12.48 0 0 1 8 22.08z"
                        fill="#1296db" p-id="8363"></path>
                </svg>
                Lightning
            </div>
            <div>
                <img src="@/assets/chat.png" alt="">
            </div>
        </div>
        <div class="sign-right">
            <p class="sign-right-title">Welcome Back:)</p>
            <div>
                <div class="sign-right-form">
                    <svg t="1716344323552" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://ww-w.w3.org/2000/svg" p-id="2615" width="28" height="28">
                        <path
                            d="M838.954667 234.666667H170.666667c-3.626667 0-7.168 0.448-10.56 1.322666l323.690666 323.669334a21.333333 21.333333 0 0 0 30.165334 0L838.954667 234.666667z m46.144 14.186666l-260.693334 260.693334 262.933334 262.912c5.44-7.168 8.661333-16.106667 8.661333-25.792V277.333333c0-10.944-4.117333-20.906667-10.88-28.48zM843.861333 789.333333l-249.6-249.621333-50.133333 50.133333a64 64 0 0 1-90.517333 0l-50.112-50.133333L156.373333 786.88c4.48 1.578667 9.28 2.453333 14.314667 2.453333h673.194667zM128.661333 754.218667L373.333333 509.525333 129.578667 265.813333A42.709333 42.709333 0 0 0 128 277.333333v469.333334c0 2.56 0.213333 5.098667 0.661333 7.552zM170.666667 192h682.666666a85.333333 85.333333 0 0 1 85.333334 85.333333v469.333334a85.333333 85.333333 0 0 1-85.333334 85.333333H170.666667a85.333333 85.333333 0 0 1-85.333334-85.333333V277.333333a85.333333 85.333333 0 0 1 85.333334-85.333333z"
                            fill="#8a8a8a" p-id="2616"></path>
                    </svg>
                    <div>
                        <p>用户名</p>
                        <input type="text" v-model="username">
                    </div>
                </div>
                <div class="sign-right-form">
                    <svg t="1716345094676" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="5695" width="28" height="28">
                        <path
                            d="M714.8 424.5v-181c0-76-61.9-137.9-137.9-137.9H445.6c-76 0-137.9 61.9-137.9 137.9v181H168.9v493.8H855V424.5H714.8zM353.7 243.6c0-50.7 41.2-91.9 91.9-91.9h131.3c50.7 0 91.9 41.2 91.9 91.9v181H353.7v-181z m455.4 628.7H214.9V470.5H809v401.8z"
                            p-id="5696" fill="#8a8a8a"></path>
                        <path
                            d="M489 723.2v107.9h46v-108c36.8-10.1 63.8-43.9 63.8-83.8 0-47.9-39-86.9-86.9-86.9-47.9 0-86.9 39-86.9 86.9 0 40 27.2 73.8 64 83.9z m22.9-124.8c22.6 0 40.9 18.4 40.9 40.9s-18.4 40.9-40.9 40.9c-22.6 0-40.9-18.4-40.9-40.9s18.3-40.9 40.9-40.9z"
                            p-id="5697" fill="#8a8a8a"></path>
                    </svg>
                    <div>
                        <p>密码</p>
                        <input type="password" v-model="password">
                    </div>
                </div>
            </div>
            <button @click="login">登录</button>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from '@/store/ChatStore'
import { ref } from 'vue';
const chatStore = useStore()
const users = chatStore.$state.users
const router = useRouter()

const username = ref('')
const password = ref('')

const login = () => {
    const matchedUser = users.find(user => user.name == username.value && user.password == password.value);
    if (matchedUser) {
        localStorage.setItem('user', JSON.stringify(matchedUser));
        localStorage.setItem('token', 11111111)
        chatStore.$state.currentUser = {
            name: matchedUser.name,
            id: matchedUser.id,
            avatar: matchedUser.avatar
        };
        alert('登录成功')
        router.push({
            name: 'home',
        })
    } else {
        alert('用户名或密码错误')
    }
}
</script>
<style lang="less" scoped>
.sign {
    width: 1150px;
    height: 650px;
    background-color: rgb(245, 245, 245);
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    display: flex;

    .sign-left {
        .logo {
            display: flex;
            font-weight: bold;
            font-size: 24px;
            padding: 20px;
        }
    }

    .sign-right {
        width: 555px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .sign-right-title {
            font-size: 32px;
        }

        .sign-right-form {
            display: flex;
            background-color: rgb(240, 240, 240);
            padding: 10px;
            align-items: center;

            div {
                display: flex;
                flex-direction: column;
                margin-left: 15px;

                p {
                    font-size: 14px;
                    color: #8a8a8a;
                    margin: 0;
                }

                input {
                    outline: none;
                    border: none;
                    background-color: rgb(240, 240, 240);
                    font-size: 18px;
                }
            }
        }

        button {
            border: none;
            background-color: #34a4ff;
            width: 120px;
            border-radius: 50px;
            height: 40px;
            font-size: 16px;
            color: rgb(245, 245, 245);
            font-weight: bold;
            margin-top: 40px;
        }
    }
}
</style>