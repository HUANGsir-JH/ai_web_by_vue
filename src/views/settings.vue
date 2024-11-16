<template>
    <div class="set_container" :class="{ 'collapsed': !isBarOpenStore.isBarOpen }">
        <span style="font-size: 30px; margin-top: 60px;">API Settings</span>
        <div class="input_container">
            <el-input v-model="ApiPort" placeholder="Please input the API port" type="text" size="large"
                clearable></el-input>
            <el-input v-model="ApiKey" placeholder="Please input your API key" type="password" size="large"
                clearable></el-input>
            <el-input v-model="model_name" placeholder="Please input your model name" type="text" size="large"
                clearable></el-input>
        </div>
        <div class="button_container">
            <el-button type="primary" @click="save">Save</el-button>
            <el-button type="warning" @click="clear">Clear All</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useAPI_infoStore } from '@/stores/API_info';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useIsBarOpenStore } from '@/stores/isBarOpen';

const isBarOpenStore = useIsBarOpenStore();

const api_infoStore = useAPI_infoStore();
const ApiPort = ref('');
const ApiKey = ref('');
const model_name = ref('');

const save = () => {
    if (ApiPort.value === '' || ApiKey.value === ''||model_name.value==='') {
        ElMessage.error('Please fill in all the blanks');
        return;
    }
    api_infoStore.setPort(ApiPort.value);
    api_infoStore.setKey(ApiKey.value);
    api_infoStore.setModelName(model_name.value);
    saveApiToLocalStorage();
    ElMessage.success('Save successfully');
}


const clear = () => {
    ElMessageBox.confirm("Are you sure to clear all the settings?","Warning",{
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        type: "warning"
    }).then(() => {
        api_infoStore.setPort('');
        api_infoStore.setKey('');
        api_infoStore.setModelName('');
        ApiPort.value = '';
        ApiKey.value = '';
        model_name.value = '';
        saveApiToLocalStorage();
        ElMessage.success('Clear successfully');
    }).catch(() => {
        ElMessage.info('Cancel');
    });
}

const saveApiToLocalStorage = () => {
    localStorage.setItem('api_info', JSON.stringify({
        port: api_infoStore.api_port,
        key: api_infoStore.api_key,
        model_name: api_infoStore.model_name
    }));
}
const loadApiFromLocalStorage = () => {
    const api_info = localStorage.getItem('api_info');
    if (api_info) {
        const parsedApiInfo = JSON.parse(api_info);
        ApiPort.value = parsedApiInfo.port;
        ApiKey.value = parsedApiInfo.key;
        model_name.value = parsedApiInfo.model_name;
        save();
    }
}
onMounted(() => {
    loadApiFromLocalStorage();
})
</script>

<style scoped>  
.set_container {
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    flex-direction: column;
    height: 50%;
    width: calc(100% - 500px);
    position: fixed;
    left: 60%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: antiquewhite;
    border-radius: 10px;
    box-shadow: 10px 10px 5px #888888;
    transition: all 0.5s ease-in-out;
}
.set_container.collapsed {
    left: 50%;
}
.input_container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 70%;
    width: 80%;
    padding: 20px 20px;
}
.button_container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
    width: 60%;
    margin-bottom: 40px;
}

@media (max-width: 768px) {
    .set_container {
        width: calc(100% - 250px);
        left: 65%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
    .set_container.collapsed {
        left: 55%;
        width: calc(100% - 200px);
    }
    .input_container {
        width: 60%;
        padding: 10px;
    }
    .button_container {
        flex-direction: column;
        justify-content: center;
        padding: 5px;
    }
    .button_container el-button {
        margin-bottom: 5px;
    }
}
</style>