<template>
    <transition name="fade">
        <div class="add-friend-bubble">
            <div class="bubble-content">
                <h3>添加好友</h3>
                <input type="text" placeholder="输入好友昵称"  />
                <button >添加</button>
            </div>
        </div>
    </transition>
</template>

<script setup>

</script>

<style scoped>
.add-friend-bubble {
    position: absolute;
    z-index: 1000;
    bottom:190px;
    left: 320px;
    background-color: white;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    transition: opacity 0.3s;

    &.fade-enter-active,
    &.fade-leave-active {
        transition: opacity 0.3s;
    }

    &.fade-enter,
    &.fade-leave-to {
        opacity: 0;
    }

    .bubble-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    input {
        width: 100%;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    button {
        width: 100%;
        padding: 5px 10px;
        background-color: #1296db;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
}
</style>