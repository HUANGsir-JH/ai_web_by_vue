<template>
    <div class="side_bar" :class="{ 'collapsed': !isOpen }">
        <div class="side_header">
            <h3 v-if="isOpen" style="color: black;">Sider</h3>
            <el-switch v-model="isOpen" :active-action-icon="View" :inactive-action-icon="Hide"
                @change="close_open_bar" />
        </div>
        <div class="side_content">
            <router-link to="/chat_space" class="router_link"><el-icon>
                    <ChatDotRound />
                </el-icon><span class="text" v="isOpen">ChatSpace</span></router-link>
            <router-link to="/chat_history" class="router_link"><el-icon>
                    <MessageBox />
                </el-icon><span class="text" v="isOpen">History</span></router-link>
            <RouterLink to="/settings" class="router_link"><el-icon>
                    <Setting />
                </el-icon><span class="text" v="isOpen">Settings</span></RouterLink>
            <router-link to="/instruction" class="router_link"><el-icon>
                    <Document />
                </el-icon><span class="text" v="isOpen">Instruction</span></router-link>
        </div>
    </div>

</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { Hide, View } from '@element-plus/icons-vue';
import { useIsBarOpenStore } from '@/stores/isBarOpen';

const isOpen = ref(true);

const isBarOpenStore = useIsBarOpenStore();
const close_open_bar = (newVal: boolean) => {
    isBarOpenStore.toggleBar(newVal);
    isOpen.value = newVal;
}

</script>

<style scoped>
.side_bar{
    width: 200px;
    height: 100vh;
    background-color: #f0e5d5;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    text-align: center;
    transition: all 0.5s ease-in-out;
}
.side_bar.collapsed{
    width: 80px;
}
.side_header{
    background-color:antiquewhite;
    color: white;
    padding: 10px;
    display: flex;
    justify-content:space-around;
    align-items: center;
}
.side_content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px;
    font-size: 20px;
    text-align: center;
    color: black;
}
.router_link{
    color: black;
    padding: auto;
    border: 1px solid #4CAF50;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    justify-content:space-around;
    align-items: center;
}
.router_link:hover{
    background-color: #4CAF50;
    color: white;
}
.side_bar .router_link .text{
    opacity: 1;
    visibility: visible;
    transition: all 0.5s ease-in-out;
}
/* 隐藏文本 */
.side_bar.collapsed .router_link .text {
    opacity: 0;
    visibility: hidden;
    transition: all 0.5s ease-in-out;
}
</style>