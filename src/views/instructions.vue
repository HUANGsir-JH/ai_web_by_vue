<template>
    <div class="instruction-box" :class="{'collapsed':!isBarOpenStore.isBarOpen}">
        <!--切换路由-->
        <div class="router-box">
            <router-link to="/instruction/instruction_en">English</router-link> | 
            <router-link to="/instruction/instruction_zh">中文</router-link>
        </div>
        <!--显示说明-->
        <div class="content-box">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useIsBarOpenStore } from '@/stores/isBarOpen';
const isBarOpenStore = useIsBarOpenStore()

</script>

<style scoped>
.instruction-box {
    display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        top: 15px;
        bottom: 10px;
        right: 10px;
        height: 95vh;
        width: 82%;
        box-shadow: 10px 10px 5px #888888;
        border-radius: 10px;
        background-color: rgb(178, 217, 217);
        transition: all 0.5s ease-in-out;
}
.instruction-box.collapsed {
    left: 90px;
    width: calc(100% - 100px);
}
.router-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color: #e5d2d2;
    border-radius: 10px 0 0 0;
    border-radius: 10px 10px 0 0;
}
.content-box {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgb(178, 217, 217);
    border-radius: 10px;
    overflow-y: auto;
    word-wrap: break-word;
}
</style>