<template>
    <div class="input_area" :class="{'collapsed':!isBarOpenStore.isBarOpen}">
        <el-input v-model="msg" type="text" size="large" placeholder="Please input your message:"  />
        <el-button class="el-button" @click="sendMsg" v-if="canInput"><el-icon size="large">
                <Promotion />
            </el-icon></el-button>
        <el-button class="el-button" v-else @click="loading"><div class="loader"></div></el-button>
    </div>
</template>

<script setup lang="ts">
import { ElInput, ElButton, ElMessage } from 'element-plus';
import { onMounted, onUnmounted, ref } from 'vue';
import { useIsBarOpenStore } from '@/stores/isBarOpen';
import { useMsgStore } from '@/stores/MsgStore';
import { useAPI_infoStore } from '@/stores/API_info';
import axios from 'axios';

let canInput = ref(true);
let msg = ref('')
const isBarOpenStore = useIsBarOpenStore();
const MsgStore = useMsgStore();

const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        sendMsg()
    }
}

const api_infoStore = useAPI_infoStore();
const messageToSend = ref('');

const sendMsg = () => {
    if (msg.value === '') {
        return;
    }
    sendMsgToAi();
    msg.value = '';
}

async function sendMsgToAi() {
    try {
        canInput.value = false;
        MsgStore.addMessage('User', msg.value);
        messageToSend.value = MsgStore.getBeforeMessage();
        // 配置请求头
        const headers = {
            'Authorization': `Bearer ${api_infoStore.api_key}`,
            'Content-Type': 'application/json'
        };

        // 配置请求体
        const data = {
            model: api_infoStore.model_name,
            messages: [
                {
                    role: 'system',
                    content:'You are a helpful assistant.'
                },
                {
                    role: 'user',
                    content: messageToSend.value
                }
            ]
        }

        // 发送请求
        const reponse = await axios.post(api_infoStore.api_port, data, { headers });
        const responseData = reponse.data;
        const finishedMessage = responseData.choices[0]?.finish_reason;
        switch (finishedMessage) {
            case 'stop':
                ElMessage({
                    message: "AI has finished thinking, please wait a monment",
                    type: 'success',
                    plain: true,
                })
                break;
            case 'length':
                ElMessage({
                    message: "AI has reached the maximum length of the response",
                    type: 'warning',
                    plain: true,
                })
                break;
            case 'tool_calls':
                ElMessage({
                    message: "The model need to call external tools",
                    type: 'warning',
                    plain: true,
                })
                break;
            default:
                ElMessage({
                    message: "Unknown error",
                    type: 'error',
                    plain: true,
                })
                break;
        }

        MsgStore.addMessage('AI', responseData.choices[0]?.message?.content);
    } catch (error: any) {
        MsgStore.addMessage('Wrong', 'An error occurred while sending a message to AI. Please check the API information and network and try again.');
        if (error.response) {
            ElMessage({
                message: 'API returns error: ' + error.response.data,
                type: 'error',
                plain: true,
            })
        }
        else if (error.request) {
            ElMessage({
                message: 'No request received: ' + error.request,
                type: 'error',
                plain: true,
            })
        }
        else {
            ElMessage({
                message: 'Error: ' + error.message,
                type: 'error',
                plain: true,
            })
        }
    } finally {
        canInput.value = true;
        messageToSend.value = '';
        msg.value = '';
    }

}

const loading = () => {
    ElMessage({
        message: 'AI is thinking...',
        type: 'info'
    });
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

</script>

<style scoped>
.input_area{
    display: flex;
    padding: 10px;
    flex-direction: row;
    position: fixed;
    bottom: 20px;
    right: 10px;
    left: 200px;
    height: 60px;
    width: calc(100% - 210px);
    background-color: #fff;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
    gap: 10px;
    transition: all 0.5s ease-in-out;
}
.input_area.collapsed{
    left: 80px;
    width: calc(100% - 90px);
}
.el-button{
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    height: auto;
    transition: all 0.3s ease-in-out;
}

/* HTML: <div class="loader"></div> */
.loader {
    width: 90px;
    height: 14px;
    --c: #fff 92%, #0000;
    background:
        radial-gradient(circle closest-side, var(--c)) calc(100%/-4) 0,
        radial-gradient(circle closest-side, var(--c)) calc(100%/4) 0;
    background-size: calc(100%/2) 100%;
    animation: l14 1.5s infinite;
}

@keyframes l14 {
    0% {
        background-position: calc(100%/-4) 0, calc(100%/4) 0
    }

    50% {
        background-position: calc(100%/-4) -14px, calc(100%/4) 14px
    }

    100% {
        background-position: calc(100%/4) -14px, calc(3*100%/4) 14px
    }
}
</style>